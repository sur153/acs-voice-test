/**
 * useMicrophone Hook
 *
 * Handles microphone capture, audio processing, and streaming to WebSocket.
 * Converts Float32 audio samples to Int16 PCM for the Voice Live API.
 */

import { useRef, useCallback, useState, useEffect } from 'react';

const SAMPLE_RATE = 24000;
const BUFFER_SIZE = 2048;

interface UseMicrophoneOptions {
  onAudioData: (data: ArrayBuffer) => void;
}

interface UseMicrophoneReturn {
  startMicrophone: () => Promise<void>;
  stopMicrophone: () => void;
  isRecording: boolean;
  error: string | null;
}

/**
 * Convert Float32 audio samples to Int16 PCM.
 * Voice Live API expects Int16 little-endian PCM at 24kHz.
 */
function float32ToInt16(float32Array: Float32Array): Int16Array {
  const int16 = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    // Clamp to [-1, 1] range
    const s = Math.max(-1, Math.min(1, float32Array[i]));
    // Convert to Int16 range
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7fff;
  }
  return int16;
}

export function useMicrophone({ onAudioData }: UseMicrophoneOptions): UseMicrophoneReturn {
  const [isRecording, setIsRecording] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Use refs to avoid stale closure issues
  const isRecordingRef = useRef(false);
  const onAudioDataRef = useRef(onAudioData);
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);

  // Keep onAudioData ref updated
  useEffect(() => {
    onAudioDataRef.current = onAudioData;
  }, [onAudioData]);

  /**
   * Start capturing microphone audio.
   * Requests user permission and sets up audio processing pipeline.
   */
  const startMicrophone = useCallback(async () => {
    if (isRecordingRef.current) {
      console.log('[useMicrophone] Already recording, skipping');
      return;
    }

    try {
      setError(null);
      console.log('[useMicrophone] Requesting microphone access...');

      // Request microphone access with audio processing options
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      mediaStreamRef.current = mediaStream;
      console.log('[useMicrophone] Microphone access granted');

      // Create AudioContext for processing
      const audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
      audioContextRef.current = audioContext;

      // Resume AudioContext if suspended (required after user gesture)
      if (audioContext.state === 'suspended') {
        await audioContext.resume();
      }

      // Create source from microphone stream
      const source = audioContext.createMediaStreamSource(mediaStream);
      sourceRef.current = source;

      // Create ScriptProcessor for real-time audio processing
      const processor = audioContext.createScriptProcessor(BUFFER_SIZE, 1, 1);
      processorRef.current = processor;

      // Process audio samples and send to callback
      processor.onaudioprocess = (event) => {
        const inputData = event.inputBuffer.getChannelData(0);
        const int16Data = float32ToInt16(inputData);
        // Use ref to always get latest callback
        onAudioDataRef.current(int16Data.buffer as ArrayBuffer);
      };

      // Connect the audio graph: microphone -> processor -> destination
      source.connect(processor);
      processor.connect(audioContext.destination);

      // Set ref immediately (before state) to avoid race conditions
      isRecordingRef.current = true;
      setIsRecording(true);
      console.log('[useMicrophone] Recording started successfully');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to access microphone';
      setError(message);
      console.error('[useMicrophone] Error:', err);
    }
  }, []);

  /**
   * Stop microphone capture and clean up resources.
   */
  const stopMicrophone = useCallback(() => {
    if (!isRecordingRef.current) {
      console.log('[useMicrophone] Not recording, skipping stop');
      return;
    }

    console.log('[useMicrophone] Stopping recording...');

    // Disconnect processor
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }

    // Disconnect source
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }

    // Stop all tracks in the media stream
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      mediaStreamRef.current = null;
    }

    // Close AudioContext
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }

    // Set ref immediately (before state) to avoid race conditions
    isRecordingRef.current = false;
    setIsRecording(false);
    console.log('[useMicrophone] Recording stopped');
  }, []);

  return {
    startMicrophone,
    stopMicrophone,
    isRecording,
    error,
  };
}
