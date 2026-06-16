import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function ReviewMetadata() {
  const { metadata } = useDoc();
  if (!metadata) return null;

  const { last_reviewed_date, reviewer } = metadata.frontMatter;
  const { lastUpdatedAt, lastUpdatedBy, editUrl } = metadata;

  // Helper utility to safely force all manual dates into standard YYYY-MM-DD
  const formatManualDate = (dateInput) => {
    if (!dateInput) return 'NEEDS REVIEW';
    const dateStr = String(dateInput);
    return dateStr.includes('T') ? dateStr.split('T')[0] : dateStr;
  };

  // Defensive date parser that handles both second and millisecond timestamps accurately
  const formatTechnicalDate = (timestamp) => {
    if (!timestamp) return 'Pending System Commit';
    // If timestamp is under 5 billion, it's in seconds; otherwise it's in milliseconds
    const normalizedTimestamp = timestamp < 5000000000 ? timestamp * 1000 : timestamp;
    return new Date(normalizedTimestamp).toISOString().split('T')[0];
  };

  // Convert the file edit pathway to point directly to the GitHub commit log history track
  const historyUrl = editUrl ? editUrl.replace('/edit/', '/commits/') : null;

  return (
    <div style={{ 
      backgroundColor: 'var(--ifm-color-emphasis-100)', 
      borderLeft: '4px solid var(--ifm-color-success)', 
      padding: '16px', 
      borderRadius: '0 8px 8px 0', 
      marginBottom: '1.5rem', 
      fontSize: '0.9rem' 
    }}>
      {/* Upper Information Deck */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '10px', 
        borderBottom: '1px solid var(--ifm-color-emphasis-300)', 
        paddingBottom: '10px', 
        marginBottom: '10px' 
      }}>
        <div><strong>✅ Review Date:</strong> {formatManualDate(last_reviewed_date)}</div>
        <div><strong>👤 Reviewer:</strong> {reviewer || 'UNASSIGNED'}</div>
      </div>

      {/* Technical Integration Track */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '10px', 
        color: 'var(--ifm-color-emphasis-700)', 
        fontSize: '0.85rem',
        paddingBottom: historyUrl ? '8px' : '0'
      }}>
        <div><strong>⚙️ Update Date:</strong> {formatTechnicalDate(lastUpdatedAt)}</div>
        <div><strong>💻 Committer (Git):</strong> {lastUpdatedBy || 'System Engine'}</div>
      </div>

      {/* Unified Link Module */}
      {historyUrl && (
        <div style={{ 
          borderTop: '1px dashed var(--ifm-color-emphasis-300)', 
          marginTop: '8px', 
          paddingTop: '8px',
          fontSize: '0.85rem'
        }}>
          <a 
            href={historyUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ 
              fontWeight: 'bold', 
              textDecoration: 'none', 
              display: 'inline-flex', 
              alignItems: 'center', 
              gap: '6px',
              color: 'var(--ifm-color-link)'
            }}
          >
            🕒 View Revision History & Auditor Diffs on GitHub
          </a>
        </div>
      )}
    </div>
  );
}