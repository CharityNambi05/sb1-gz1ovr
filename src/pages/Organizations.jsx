import { useEffect, useState } from 'react';
import { api } from '../services/api';

export default function Organizations() {
  const [organizations, setOrganizations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrganizations = async () => {
      try {
        const response = await api.getOrganizations();
        setOrganizations(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch organizations');
        setLoading(false);
      }
    };

    fetchOrganizations();
  }, []);

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-red-600 text-center">{error}</div>;

  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Environmental Organizations</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-900">{org.name}</h3>
              <p className="mt-2 text-gray-600">{org.description}</p>
              <button 
                onClick={() => window.location.href = `/donate/${org.id}`}
                className="mt-4 w-full bg-mazingira-600 text-white px-4 py-2 rounded-md hover:bg-mazingira-700"
              >
                Support This Cause
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}