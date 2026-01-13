/**
 * useAudio Hook
 *
 * Handles audio playback using AudioWorklet for low-latency streaming audio.
 * Designed to work with 24kHz Int16 PCM audio from the Voice Live API.
 */

import { useRef, useCallback, useEffect } from 'react';

const SAMPLE_RATE = 24000;

interface UseAudioReturn {
  initAudio: () => Promise<void>;
  playAudio: (arrayBuffer: ArrayBuffer) => Promise<void>;
  stopPlayback: () => void;
  isInitialized: boolean;
}

export function useAudio(): UseAudioReturn {
  const audioContextRef = useRef<AudioContext | null>(null);
  const workletNodeRef = useRef<AudioWorkletNode | null>(null);
  const isInitializedRef = useRef(false);

  /**
   * Initialize AudioContext and load the AudioWorklet processor.
   * Must be called after a user gesture (click) due to browser autoplay policies.
   */
  const initAudio = useCallback(async () => {
    if (isInitializedRef.current) {
      // Resume if suspended
      if (audioContextRef.current?.state === 'suspended') {
        await audioContextRef.current.resume();
      }
      return;
    }

    try {
      // Create AudioContext with 24kHz sample rate to match Voice Live API
      const audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
      audioContextRef.current = audioContext;

      // Load the AudioWorklet processor
      // In production, static files are served from /static/
      await audioContext.audioWorklet.addModule('/static/audio-processor.js');

      // Create the worklet node and connect to destination
      const workletNode = new AudioWorkletNode(audioContext, 'audio-processor');
      workletNode.connect(audioContext.destination);
      workletNodeRef.current = workletNode;

      isInitializedRef.current = true;
      console.log('[useAudio] Audio initialized successfully');
    } catch (error) {
      console.error('[useAudio] Failed to initialize audio:', error);
      throw error;
    }
  }, []);

  /**
   * Play audio from an ArrayBuffer containing Int16 PCM data.
   * Converts Int16 to Float32 and sends to the AudioWorklet for playback.
   */
  const playAudio = useCallback(async (arrayBuffer: ArrayBuffer) => {
    if (!audioContextRef.current || !workletNodeRef.current) {
      console.warn('[useAudio] Audio not initialized');
      return;
    }

    // Resume AudioContext if suspended
    if (audioContextRef.current.state === 'suspended') {
      await audioContextRef.current.resume();
    }

    // Convert Int16 PCM to Float32
    const int16 = new Int16Array(arrayBuffer);
    const float32 = new Float32Array(int16.length);

    for (let i = 0; i < int16.length; i++) {
      // Normalize Int16 to Float32 range [-1, 1]
      float32[i] = int16[i] / (int16[i] < 0 ? 0x8000 : 0x7fff);
    }

    // Send to AudioWorklet for buffered playback
    workletNodeRef.current.port.postMessage({ pcm: float32 });
  }, []);

  /**
   * Stop audio playback by clearing the AudioWorklet buffer.
   */
  const stopPlayback = useCallback(() => {
    if (workletNodeRef.current) {
      workletNodeRef.current.port.postMessage({ clear: true });
    }
  }, []);

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (workletNodeRef.current) {
        workletNodeRef.current.disconnect();
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    initAudio,
    playAudio,
    stopPlayback,
    isInitialized: isInitializedRef.current,
  };
}
