import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function GitHistory() {
  const { metadata } = useDoc();
  
  if (!metadata || !metadata.editUrl) return null;

  // Convert GitHub's raw edit target into the visual commit/difference timeline view
  const historyUrl = metadata.editUrl.replace('/edit/', '/commits/');

  return (
    <div style={{ marginTop: '0.5rem' }}>
      <a 
        href={historyUrl} 
        target="_blank" 
        rel="noopener noreferrer" 
        style={{
          fontSize: '0.9rem',
          textDecoration: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '5px'
        }}
      >
        <span>🕒</span> View Revision History & Auditor Diffs on GitHub
      </a>
    </div>
  );
}