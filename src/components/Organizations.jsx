import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Organizations() {
  const [organizations, setOrganizations] = useState([]);

  useEffect(() => {
    // Simulated data for now
    setOrganizations([
      {
        id: 1,
        name: 'Forest Conservation Initiative',
        description: 'Protecting and restoring forest ecosystems worldwide.',
      },
      {
        id: 2,
        name: 'Ocean Cleanup Alliance',
        description: 'Removing plastic waste from our oceans and preventing marine pollution.',
      },
    ]);
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Environmental Organizations</h2>
      <div className="grid gap-6">
        {organizations.map((org) => (
          <div key={org.id} className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-semibold mb-2">{org.name}</h3>
            <p className="text-gray-600 mb-4">{org.description}</p>
            <Link
              to={`/donate/${org.id}`}
              className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Donate Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Organizations;