import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { 
  UserIcon, 
  EnvelopeIcon, 
  BuildingOfficeIcon,
  BriefcaseIcon,
  IdentificationIcon,
  PhoneIcon,
  HomeIcon,
  CalendarIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

const employeeSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Full name is required')
    .min(2, 'Name is too short')
    .max(50, 'Name is too long'),
  department: Yup.string()
    .required('Department is required'),
  phoneNumber: Yup.string()
    .matches(/^\+?[\d\s-]+$/, 'Invalid phone number'),
  address: Yup.string()
     .min(10, 'Please provide a complete address'),
  employeeId: Yup.string()
    .required('Employee ID is required'),
  dateJoined: Yup.date()
    .max(new Date(), 'Date cannot be in the future'),
  workEmail: Yup.string()
    .email('Invalid email format')
    .required('Work email is required')
    .matches(
      /^[a-zA-Z0-9._%+-]+@organization\.com$/,
      'Must be an organizational email (@organization.com)'
    ),
});

function EmployeeForm({ onSubmit, onCancel, isLoading }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [submitError, setSubmitError] = useState(null);

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

  const roles = [
    'Administrator',
    'Manager',
    'Supervisor',
    'Team Lead',
    'Senior Staff',
    'Junior Staff',
    'Intern',
    'Consultant'
  ];

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setSubmitError(null);
    try {
      await onSubmit(values);
      resetForm();
      // You might want to show a success message or redirect here
    } catch (error) {
      setSubmitError(error.message || 'Failed to register employee. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-md bg-white">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-gray-900">Add New Employee</h3>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-gray-500"
          >
            <span className="sr-only">Close</span>
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <Formik
          initialValues={{
            fullName: '',
            department: '',
            role: '',
            phoneNumber: '',
            address: '',
            employeeId: '',
            dateJoined: '',
            workEmail: ''
          }}
          validationSchema={employeeSchema}
          onSubmit={handleSubmit}
        >
          {({ errors, touched }) => (
            <Form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="fullName"
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="John Doe"
                    />
                  </div>
                  {errors.fullName && touched.fullName && (
                    <div className="text-red-500 text-xs mt-1">{errors.fullName}</div>
                  )}
                </div>

                {/* Employee ID */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Employee ID
                  </label>
                  <div className="relative">
                    <IdentificationIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="employeeId"
                      type="text"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="EMP001"
                    />
                  </div>
                  {errors.employeeId && touched.employeeId && (
                    <div className="text-red-500 text-xs mt-1">{errors.employeeId}</div>
                  )}
                </div>

                {/* Department */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <div className="relative">
                    <BuildingOfficeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      as="select"
                      name="department"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </Field>
                  </div>
                  {errors.department && touched.department && (
                    <div className="text-red-500 text-xs mt-1">{errors.department}</div>
                  )}
                </div>

                {/* Role */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role
                  </label>
                  <div className="relative">
                    <BriefcaseIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      as="select"
                      name="role"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Select Role</option>
                      {roles.map((role) => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </Field>
                  </div>
                  {errors.role && touched.role && (
                    <div className="text-red-500 text-xs mt-1">{errors.role}</div>
                  )}
                </div>

                {/* Date Joined */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date Joined
                  </label>
                  <div className="relative">
                    <CalendarIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="dateJoined"
                      type="date"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    />
                  </div>
                  {errors.dateJoined && touched.dateJoined && (
                    <div className="text-red-500 text-xs mt-1">{errors.dateJoined}</div>
                  )}
                </div>

                {/* Phone Number */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <div className="relative">
                    <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="phoneNumber"
                      type="tel"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  {errors.phoneNumber && touched.phoneNumber && (
                    <div className="text-red-500 text-xs mt-1">{errors.phoneNumber}</div>
                  )}
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email
                  </label>
                  <div className="relative">
                    <EnvelopeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="workEmail"
                      type="email"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="john.doe@organization.com"
                    />
                  </div>
                  {errors.workEmail && touched.workEmail && (
                    <div className="text-red-500 text-xs mt-1">{errors.workEmail}</div>
                  )}
                </div>

                {/* Address - Full Width */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Residential Address
                  </label>
                  <div className="relative">
                    <HomeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <Field
                      name="address"
                      as="textarea"
                      rows="2"
                      className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter complete address"
                    />
                  </div>
                  {errors.address && touched.address && (
                    <div className="text-red-500 text-xs mt-1">{errors.address}</div>
                  )}
                </div>
              </div>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                >
                  {isLoading ? 'Saving...' : 'Save Employee'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default EmployeeForm; 