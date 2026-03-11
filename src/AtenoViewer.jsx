import React, { useRef, useState, useEffect } from 'react';
import '@google/model-viewer';

export function AtenoViewer({ 
  modelUrl, 
  usdzUrl,
  backgroundColor = '#ffffff',
  className = ''
}) {
  const viewerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const viewer = viewerRef.current;
    if (!viewer) return;

    const handleProgress = (event) => {
      setProgress(Math.round(event.detail.totalProgress * 100));
    };

    viewer.addEventListener('progress', handleProgress);
    return () => viewer.removeEventListener('progress', handleProgress);
  }, []);

  const handleZoomIn = () => {
    if (viewerRef.current) viewerRef.current.zoom(-1);
  };

  const handleZoomOut = () => {
    if (viewerRef.current) viewerRef.current.zoom(1);
  };

  return (
    <div 
      className={className}
      style={{ 
        position: 'relative', 
        width: '100%', 
        height: '100%', 
        backgroundColor 
      }}
    >
      <model-viewer
        ref={viewerRef}
        src={modelUrl}
        ios-src={usdzUrl}
        alt="Ateno 3D Spatial Design"
        camera-controls
        auto-rotate
        ar
        shadow-intensity="1"
        exposure="1.0"
        style={{ width: '100%', height: '100%', outline: 'none' }}
      >
        {/* Custom Shadcn-style Loader */}
        {progress < 100 && (
          <div
            slot="progress-bar"
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              background: backgroundColor,
              padding: '14px 20px',
              borderRadius: '12px',
              border: '1px solid #E2E8F0',
              boxShadow: '0 4px 12px rgba(2, 6, 23, 0.08)',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              fontFamily: 'system-ui, -apple-system, sans-serif',
              fontSize: '14px',
              fontWeight: 500,
              color: '#0F172A',
            }}
          >
            {/* Simple CSS Spinner */}
            <svg 
              width="18" height="18" viewBox="0 0 24 24" fill="none" 
              stroke="currentColor" strokeWidth="2" strokeLinecap="round" 
              className="atn-spinner"
            >
              <path d="M21 12a9 9 0 1 1-6.219-8.56" />
            </svg>
            Drawing your model {progress}%
          </div>
        )}
      </model-viewer>

      {/* Floating Controls Overlay */}
      <div style={{
        position: 'absolute',
        bottom: '24px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '8px',
        background: backgroundColor,
        padding: '8px',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(2, 6, 23, 0.08)',
        border: '1px solid #E2E8F0',
      }}>
        <button onClick={handleZoomIn} style={btnStyle}>+</button>
        <button onClick={handleZoomOut} style={btnStyle}>−</button>
      </div>

      {/* Required CSS animation for the spinner */}
      <style>{`
        @keyframes atn-spin { 100% { transform: rotate(360deg); } }
        .atn-spinner { animation: atn-spin 1s linear infinite; color: #a78bfa; }
      `}</style>
    </div>
  );
}

const btnStyle = {
  width: '40px',
  height: '40px',
  borderRadius: '8px',
  border: '1px solid #E2E8F0',
  background: '#fff',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '20px',
  color: '#0F172A',
  boxShadow: '0 2px 8px rgba(2, 6, 23, 0.06)',
};