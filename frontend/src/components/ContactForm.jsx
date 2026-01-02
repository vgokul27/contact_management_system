import { useState } from 'react';

const ContactForm = ({ onAddContact }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    // Phone validation
    const phoneRegex = /^\d{10}$/;
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      await onAddContact(formData);
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
      
      // Show success message
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    }
  };

  const isFormValid = formData.name.trim() && 
                      formData.email.trim() && 
                      formData.phone.trim() &&
                      Object.keys(errors).length === 0;

  return (
    <div className="bg-gray-800 rounded-lg shadow-2xl p-6 mb-8 border border-gray-700">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Contact</h2>
      
      {showSuccess && (
        <div className="mb-4 p-4 bg-green-900/50 border border-green-500 text-green-200 rounded">
          Contact added successfully!
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1 text-left">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
              errors.name ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-400">{errors.name}</p>
          )}
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1 text-left">
            Email <span className="text-red-400">*</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
              errors.email ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter email address"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-400">{errors.email}</p>
          )}
        </div>

        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1 text-left">
            Phone <span className="text-red-400">*</span>
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-2 bg-gray-700 text-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400 ${
              errors.phone ? 'border-red-500' : 'border-gray-600'
            }`}
            placeholder="Enter 10-digit phone number"
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-400">{errors.phone}</p>
          )}
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1 text-left">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="4"
            className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder-gray-400"
            placeholder="Enter your message (optional)"
          />
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={`w-full py-3 px-4 rounded-lg font-semibold text-white transition-colors ${
            isFormValid
              ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
              : 'bg-blue-600 cursor-not-allowed'
          }`}
        >
          Add Contact
        </button>
      </form>
    </div>
  );
};

export default ContactForm;
