/**
 * Header Component
 *
 * Displays logo and application progress bar.
 */

import { useState } from 'react';

export function Header() {
  // TODO: Connect to actual progress tracking
  const [progress] = useState(15);

  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">P</div>
        <div className="logo-text">
          Protective <span>TeleLife</span>
        </div>
      </div>

      <div className="progress-bar">
        <span className="progress-label">Application Progress</span>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
        <span className="progress-text">{progress}%</span>
      </div>
    </header>
  );
}
