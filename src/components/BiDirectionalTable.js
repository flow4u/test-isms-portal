import React, { useState } from 'react';
import styles from './BiDirectionalTable.module.css';

export default function BiDirectionalTable({ mappingData }) {
  const [selectedRisks, setSelectedRisks] = useState([]);
  const [selectedControls, setSelectedControls] = useState([]);

  // 1. EXTRACT UNIQUE DATA PRIMITIVES
  const uniqueRisks = Array.from(new Map(mappingData.map(item => [item.risk.id, item.risk])).values());
  const uniqueControls = Array.from(new Map(mappingData.map(item => [item.control.id, item.control])).values());

  // 2. CROSS-FILTERING MATRICES
  const allowedRiskIds = selectedControls.length === 0
    ? uniqueRisks.map(r => r.id)
    : mappingData.filter(m => selectedControls.includes(m.control.id)).map(m => m.risk.id);

  const allowedControlIds = selectedRisks.length === 0
    ? uniqueControls.map(c => c.id)
    : mappingData.filter(m => selectedRisks.includes(m.risk.id)).map(m => m.control.id);

  // 3. SELECTION ASSIGNMENT LOGIC
  const toggleRisk = (id) => {
    setSelectedRisks(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleControl = (id) => {
    setSelectedControls(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const resetFilters = () => {
    setSelectedRisks([]);
    setSelectedControls([]);
  };

  return (
    <div className={styles.container}>
      
      {/* Control Deck Header */}
      <div className={styles.controlDeck}>
        <span className={styles.filterStatus}>
          <strong>Active Filters:</strong> {selectedRisks.length} Risks Selected | {selectedControls.length} Controls Selected
        </span>
        {(selectedRisks.length > 0 || selectedControls.length > 0) && (
          <button onClick={resetFilters} className={styles.resetButton}>Clear All Filters ↺</button>
        )}
      </div>

      <div className={styles.layoutGrid}>
        
        {/* --- LEFT TABLE: RISK ATTRIBUTES --- */}
        <div className={styles.tablePanel}>
          <div className={styles.panelHeader}>Risk ID Register</div>
          <table className={styles.matrixTable}>
            <tbody>
              {uniqueRisks.map((risk) => {
                const isFilteredOut = !allowedRiskIds.includes(risk.id);
                const isSelected = selectedRisks.includes(risk.id);
                
                return (
                  <tr 
                    key={risk.id} 
                    className={`${isSelected ? styles.rowSelected : ''} ${isFilteredOut ? styles.rowDisabled : ''}`}
                  >
                    <td className={styles.tooltipCell}>
                      <div className={styles.cellFlexContainer}>
                        
                        {/* THE FILTER TRIGGER: Clicking this text triggers cross-filtering */}
                        <div 
                          className={styles.idFilterActionBlock}
                          onClick={() => !isFilteredOut && toggleRisk(risk.id)}
                        >
                          <span className={styles.statusIndicator}></span>
                          {risk.id}
                        </div>

                        {/* EXTERNAL LINK ICON: Isolated so it does not interfere with filtering */}
                        {risk.url && (
                          <a 
                            href={risk.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.isolatedLinkIcon}
                            title="Open risk documentation profile"
                          >
                            ↗
                          </a>
                        )}

                      </div>
                      <span className={styles.tooltipBox}>{risk.description}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* --- RIGHT TABLE: CONTROL ATTRIBUTES --- */}
        <div className={styles.tablePanel}>
          <div className={styles.panelHeader}>Control ID Reference</div>
          <table className={styles.matrixTable}>
            <tbody>
              {uniqueControls.map((control) => {
                const isFilteredOut = !allowedControlIds.includes(control.id);
                const isSelected = selectedControls.includes(control.id);
                
                return (
                  <tr 
                    key={control.id} 
                    className={`${isSelected ? styles.rowSelected : ''} ${isFilteredOut ? styles.rowDisabled : ''}`}
                  >
                    <td className={styles.tooltipCell}>
                      <div className={styles.cellFlexContainer}>
                        
                        {/* THE FILTER TRIGGER: Clicking this text triggers cross-filtering */}
                        <div 
                          className={styles.idFilterActionBlock}
                          onClick={() => !isFilteredOut && toggleControl(control.id)}
                        >
                          <span className={styles.statusIndicator}></span>
                          {control.id}
                        </div>

                        {/* EXTERNAL LINK ICON: Isolated so it does not interfere with filtering */}
                        {control.url && (
                          <a 
                            href={control.url} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className={styles.isolatedLinkIcon}
                            title="Open control mapping evidence"
                          >
                            ↗
                          </a>
                        )}

                      </div>
                      <span className={styles.tooltipBox}>{control.description}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

      </div>

      {/* Underwater Complete Dataset Payload for RAG LLM Pipelines */}
      <script id="unfiltered-spreadsheet-matrix" type="application/json" style={{ display: 'none' }}>
        {JSON.stringify(mappingData)}
      </script>
    </div>
  );
}