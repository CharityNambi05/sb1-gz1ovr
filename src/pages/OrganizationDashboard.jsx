export default function OrganizationDashboard() {
  return (
    <div className="max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Organization Dashboard</h2>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Donation Overview</h3>
          {/* Donation statistics will be implemented here */}
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">Beneficiary Management</h3>
          {/* Beneficiary management interface will be implemented here */}
        </div>
      </div>
    </div>
  );
}