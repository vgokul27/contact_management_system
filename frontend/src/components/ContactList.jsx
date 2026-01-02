import { useState } from 'react';

const ContactList = ({ contacts, onDeleteContact }) => {
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');

  const sortedContacts = [...contacts].sort((a, b) => {
    const aValue = a[sortBy]?.toLowerCase() || '';
    const bValue = b[sortBy]?.toLowerCase() || '';
    
    if (sortOrder === 'asc') {
      return aValue.localeCompare(bValue);
    } else {
      return bValue.localeCompare(aValue);
    }
  });

  const handleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('asc');
    }
  };

  if (contacts.length === 0) {
    return (
      <div className="bg-gray-800 rounded-lg shadow-2xl p-8 text-center border border-gray-700">
        <p className="text-gray-400 text-lg">No contacts yet. Add your first contact above!</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl overflow-hidden border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold text-white">Contact List</h2>
        <p className="text-gray-300 mt-1">Total Contacts: {contacts.length}</p>
      </div>

      {/* Mobile View - Cards */}
      <div className="md:hidden">
        {sortedContacts.map((contact) => (
          <div key={contact._id} className="p-4 border-b border-gray-700 last:border-b-0">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-semibold text-white">{contact.name}</h3>
              <button
                onClick={() => onDeleteContact(contact._id)}
                className="text-red-500 hover:text-red-600 cursor-pointer font-medium text-sm"
              >
                Delete
              </button>
            </div>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Email:</span> {contact.email}
            </p>
            <p className="text-sm text-gray-300 mb-1">
              <span className="font-medium">Phone:</span> {contact.phone}
            </p>
            {contact.message && (
              <p className="text-sm text-gray-300 mt-2">
                <span className="font-medium">Message:</span> {contact.message}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Desktop View - Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-900">
            <tr>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                onClick={() => handleSort('name')}
              >
                <div className="flex items-center">
                  Name
                  {sortBy === 'name' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                onClick={() => handleSort('email')}
              >
                <div className="flex items-center">
                  Email
                  {sortBy === 'email' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th 
                className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-700"
                onClick={() => handleSort('phone')}
              >
                <div className="flex items-center">
                  Phone
                  {sortBy === 'phone' && (
                    <span className="ml-1">{sortOrder === 'asc' ? '↑' : '↓'}</span>
                  )}
                </div>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {sortedContacts.map((contact) => (
              <tr key={contact._id} className="hover:bg-gray-700">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-white">{contact.name}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{contact.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-300">{contact.phone}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-300 max-w-xs truncate">
                    {contact.message || '-'}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  <button
                    onClick={() => onDeleteContact(contact._id)}
                    className="text-red-400 hover:text-red-500 cursor-pointer font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactList;
