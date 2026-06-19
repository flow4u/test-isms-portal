import React from 'react';

export default function YouTube({ id }) {
  return (
    <div style={{ position: 'relative', width: '100%', paddingBottom: '56.25%', height: 0, marginBottom: '1.5rem' }}>
      <iframe
        src={`https://youtube.com{id}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', borderRadius: '8px' }}
      ></iframe>
    </div>
  );
}
