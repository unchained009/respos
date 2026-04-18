import { useEffect, useState } from 'react';
import SectionCard from '../../components/common/SectionCard.jsx';
import TableForm from '../../components/admin/TableForm.jsx';
import { api } from '../../services/api.js';

const TablesPage = () => {
  const [tables, setTables] = useState([]);
  const [editingTable, setEditingTable] = useState(null);
  const [selectedQr, setSelectedQr] = useState(null);

  const loadTables = async () => {
    const tableList = await api.getTables();
    setTables(tableList);
  };

  useEffect(() => {
    loadTables();
  }, []);

  const handleSubmit = async (payload) => {
    if (editingTable) {
      await api.updateTable(editingTable._id, payload);
      setEditingTable(null);
    } else {
      await api.createTable(payload);
    }

    await loadTables();
  };

  const openQr = async (tableId) => {
    const qr = await api.getTableQr(tableId);
    setSelectedQr(qr);
  };

  return (
    <div className="page-stack">
      <header className="page-header">
        <div>
          <p className="eyebrow">Floor setup</p>
          <h2>Table Management</h2>
        </div>
      </header>

      <div className="two-column-grid">
        <SectionCard title={editingTable ? 'Edit Table' : 'Add Table'} subtitle="Each table gets a unique QR-ready URL.">
          <TableForm editingTable={editingTable} onSubmit={handleSubmit} onCancel={() => setEditingTable(null)} />
        </SectionCard>

        <SectionCard title="QR Preview" subtitle="Generate and print QR codes for your tables.">
          {selectedQr ? (
            <div className="qr-preview">
              <img src={selectedQr.qrCodeUrl} alt={selectedQr.tableName} />
              <h4>
                {selectedQr.tableName} / #{selectedQr.tableNumber}
              </h4>
              <p>{selectedQr.tableUrl}</p>
            </div>
          ) : (
            <p className="empty-state">Choose a table below to preview its QR code.</p>
          )}
        </SectionCard>
      </div>

      <SectionCard title="Tables" subtitle="Edit seating, activation, and QR links.">
        <div className="table-card-grid">
          {tables.map((table) => (
            <article key={table._id} className="table-card">
              <div>
                <h4>{table.name}</h4>
                <p>Table #{table.tableNumber}</p>
                <span>{table.seats} seats</span>
              </div>
              <div className="action-row">
                <button type="button" className="ghost-button" onClick={() => setEditingTable(table)}>
                  Edit
                </button>
                <button type="button" className="ghost-button" onClick={() => openQr(table._id)}>
                  QR Code
                </button>
                <button
                  type="button"
                  className="ghost-button danger"
                  onClick={async () => {
                    await api.deleteTable(table._id);
                    await loadTables();
                  }}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      </SectionCard>
    </div>
  );
};

export default TablesPage;
