import React from 'react';
import { useDoc } from '@docusaurus/plugin-content-docs/client';

export default function ReviewMetadata() {
  const { metadata } = useDoc();
  if (!metadata) return null;

  const { last_reviewed_date, reviewer } = metadata.frontMatter;
  const { lastUpdatedAt, lastUpdatedBy } = metadata;

  const systemUpdateDate = lastUpdatedAt 
    ? new Date(lastUpdatedAt * 1000).toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      })
    : 'Pending Commit';

  return (
    <div style={{
      backgroundColor: 'var(--ifm-color-emphasis-100)',
      borderLeft: '4px solid var(--ifm-color-primary)',
      padding: '16px',
      borderRadius: '0 8px 8px 0',
      marginBottom: '1.5rem',
      fontSize: '0.9rem',
      lineHeight: '1.6'
    }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', borderBottom: '1px solid var(--ifm-color-emphasis-300)', paddingBottom: '8px', marginBottom: '8px' }}>
        <div><strong>✅ Compliance Review:</strong> {last_reviewed_date || 'NEEDS HUMAN REVIEW'}</div>
        <div><strong>👤 Designated Reviewer:</strong> {reviewer || 'UNASSIGNED'}</div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', color: 'var(--ifm-color-emphasis-700)', fontSize: '0.85rem' }}>
        <div><strong>⚙️ Technical Last Update:</strong> {systemUpdateDate}</div>
        <div><strong>💻 Committer (Git):</strong> {lastUpdatedBy || 'System Engine'}</div>
      </div>
    </div>
  );
}