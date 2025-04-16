import React, { useEffect, useState } from 'react';
import api from '../../services/api';

interface Client {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

const ClientManagement: React.FC = () => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [clientsPerPage] = useState<number>(10);
  const [deleteConfirmation, setDeleteConfirmation] = useState<number | null>(null);

  useEffect(() => {
    setLoading(true);
    api.get('/clients')
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error('Error fetching clients:', error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const deleteClient = (id: number) => {
    api.delete(`/clients/${id}`)
      .then(() => {
        setClients((prevClients) => prevClients.filter((client) => client.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting client:', error);
      })
      .finally(() => {
        setDeleteConfirmation(null);
      });
  };

  const filteredClients = clients.filter((client) => 
    client.name.toLowerCase().includes(search.toLowerCase()) || 
    client.email.toLowerCase().includes(search.toLowerCase())
  );

  // Pagination logic
  const indexOfLastClient = currentPage * clientsPerPage;
  const indexOfFirstClient = indexOfLastClient - clientsPerPage;
  const currentClients = filteredClients.slice(indexOfFirstClient, indexOfLastClient);

  const totalPages = Math.ceil(filteredClients.length / clientsPerPage);

  return (
    <div className="p-4 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Client Management</h2>

      {/* Search bar */}
      <input 
        type="text" 
        placeholder="Search by name or email" 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 p-2 border rounded w-full"
      />

      {loading ? (
        <div className="flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <table className="table-auto w-full border">
            <thead>
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentClients.map((client) => (
                <tr key={client.id}>
                  <td className="px-4 py-2 border">{client.id}</td>
                  <td className="px-4 py-2 border">{client.name}</td>
                  <td className="px-4 py-2 border">{client.email}</td>
                  <td className="px-4 py-2 border">
                    <button
                      onClick={() => setDeleteConfirmation(client.id)}
                      className="px-2 py-1 bg-red-500 text-white rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            <button 
              onClick={() => setCurrentPage(currentPage - 1)} 
              disabled={currentPage === 1} 
              className="px-4 py-2 bg-gray-300 rounded-l"
            >
              Prev
            </button>
            <span className="px-4 py-2">{currentPage} / {totalPages}</span>
            <button 
              onClick={() => setCurrentPage(currentPage + 1)} 
              disabled={currentPage === totalPages} 
              className="px-4 py-2 bg-gray-300 rounded-r"
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* Delete confirmation */}
      {deleteConfirmation !== null && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50">
          <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-semibold mb-4">Are you sure you want to delete this client?</h3>
            <div className="flex space-x-4">
              <button 
                onClick={() => deleteClient(deleteConfirmation)} 
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, Delete
              </button>
              <button 
                onClick={() => setDeleteConfirmation(null)} 
                className="px-4 py-2 bg-gray-300 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClientManagement;
