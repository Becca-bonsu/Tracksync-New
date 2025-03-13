import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  DocumentTextIcon, 
  UserIcon, 
  BuildingOfficeIcon,
  CalendarIcon 
} from '@heroicons/react/24/outline';

const letterTypes = {
  'Business Letters': [
    'Inquiry Letters',
    'Proposal/Offer Letters',
    'Complaint and Response Letters',
    'Order Letters',
    'Confirmation Letters',
    'Invitation Letters',
    'Thank You Letters',
    'Recommendation Letters'
  ],
  'Employment Letters': [
    'Job Application Letters',
    'Offer Letters',
    'Resignation Letters',
    'Termination Letters'
  ],
  'Internal Correspondence': [
    'Memorandums (Memos)',
    'Interoffice Letters',
    'Notification Letters'
  ],
  'Specialized Letters': [
    'Legal and Compliance Letters',
    'Financial Letters',
    'Policy and Notice Letters'
  ]
};

const departments = [
  'Administration',
  'Human Resources',
  'Finance',
  'Research and Innovation',
  'Corporate',
  'IT',
  'Consultancy',
  'Faculty'
];

const letterSchema = Yup.object().shape({
  senderName: Yup.string().required('Sender name is required'),
  senderProffession: Yup.string().required('Sender proffession is required'),
  organization: Yup.string().required('Organization is required'),
  letterType: Yup.string().required('Letter type is required'),
  department: Yup.string().required('Department is required'),
  hostName: Yup.string().required('Host name is required'),
  subject: Yup.string().required('Subject is required'),
  dateReceived: Yup.date().required('Date received is required'),
});

function IncomingLetterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    subject: '',
    sender: '',
    receivedDate: new Date().toISOString().split('T')[0],
    priority: 'Medium',
    description: '',
    attachments: null,
    status: 'Pending'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'attachments' && formData[key]) {
          formDataToSend.append('attachments', formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      const response = await fetch('/api/letters/incoming', {
        method: 'POST',
        body: formDataToSend
      });

      if (!response.ok) {
        throw new Error('Failed to submit letter');
      }

      // Navigate back to the dashboard or letters list
      navigate('/admin-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white rounded-xl shadow-2xl p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Record Incoming Letter</h2>
        
        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Sender
            </label>
            <input
              type="text"
              name="sender"
              value={formData.sender}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Received Date
            </label>
            <input
              type="date"
              name="receivedDate"
              value={formData.receivedDate}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Attachments
            </label>
            <input
              type="file"
              name="attachments"
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default IncomingLetterForm;
