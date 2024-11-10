import { useState } from 'react';
import { useParams } from 'react-router-dom';

function DonationForm() {
  const { orgId } = useParams();
  const [formData, setFormData] = useState({
    amount: '',
    isRecurring: false,
    frequency: 'monthly',
    isAnonymous: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Donation submitted:', { ...formData, organizationId: orgId });
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Make a Donation</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-2">
            Donation Amount ($)
            <input
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className="w-full mt-1 p-2 border rounded"
              required
            />
          </label>
        </div>

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              className="mr-2"
            />
            Make this a recurring donation
          </label>
        </div>

        {formData.isRecurring && (
          <div>
            <label className="block text-gray-700 mb-2">
              Frequency
              <select
                value={formData.frequency}
                onChange={(e) => setFormData({ ...formData, frequency: e.target.value })}
                className="w-full mt-1 p-2 border rounded"
              >
                <option value="monthly">Monthly</option>
                <option value="quarterly">Quarterly</option>
                <option value="yearly">Yearly</option>
              </select>
            </label>
          </div>
        )}

        <div>
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isAnonymous}
              onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
              className="mr-2"
            />
            Make this an anonymous donation
          </label>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          Donate
        </button>
      </form>
    </div>
  );
}

export default DonationForm;