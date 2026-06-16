import React from 'react';
import styles from './FilteredTable.module.css';

export default function FilteredTable({ data, filterCategory, filterStatus, filterImpact, columns, showColumns }) {
  
  // 1. DEFENSIVE GUARDRAIL: If 'columns' is missing, auto-convert old 'showColumns' string arrays
  const activeColumns = columns || (showColumns || []).map(col => ({
    key: col,
    label: col,
    description: ''
  }));

  // If there's no data or columns to show, exit quietly instead of crashing
  if (!data || activeColumns.length === 0) {
    return <div style={{ color: 'var(--ifm-color-danger)', padding: '10px' }}>⚠️ Missing table configuration parameters.</div>;
  }

  // 2. FILTER ENGINE: Extracts values safely whether they are strings or objects
  const processedRows = data.filter(row => {
    const getVal = (field) => (field && typeof field === 'object' ? field.value : field);

    const matchCategory = filterCategory ? getVal(row.category) === filterCategory : true;
    const matchStatus = filterStatus ? getVal(row.status) === filterStatus : true;
    const matchImpact = filterImpact ? getVal(row.impact) === filterImpact : true;
    
    return matchCategory && matchStatus && matchImpact;
  });

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.customTable}>
        <thead>
          <tr>
            {activeColumns.map((col, idx) => (
              <th key={idx} className={col.description ? styles.headerTooltipContainer : ''}>
                <span>{col.label}</span>
                {col.description && <span className={styles.headerTooltipBox}>{col.description}</span>}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {processedRows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {activeColumns.map((col, colIndex) => {
                const rawCell = row[col.key];
                
                // 3. DEFENSIVE CELL PARSING: Extract value and url securely
                let cellValue = '';
                let cellUrl = '';

                if (rawCell && typeof rawCell === 'object') {
                  if ('value' in rawCell) {
                    cellValue = rawCell.value;
                    cellUrl = rawCell.url || ''; 
                  } else {
                    // Emergency catch: If it's a raw object without a value key, stringify it so React doesn't crash
                    cellValue = JSON.stringify(rawCell);
                  }
                } else {
                  cellValue = rawCell !== undefined && rawCell !== null ? String(rawCell) : ''; 
                }

                return (
                  <td key={colIndex} className={row.description && col.key === 'name' ? styles.rowTooltipContainer : ''}>
                    {cellUrl ? (
                      <a href={cellUrl} target="_blank" rel="noopener noreferrer" className={styles.rowLink}>
                        {cellValue}
                      </a>
                    ) : (
                      <span>{cellValue}</span>
                    )}

                    {row.description && col.key === 'name' && (
                      <span className={styles.rowTooltipBox}>{row.description}</span>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Underwater Complete Dataset for LLMs */}
      <script id="raw-compliance-dataset" type="application/json" style={{ display: 'none' }}>
        {JSON.stringify(data)}
      </script>
    </div>
  );
}