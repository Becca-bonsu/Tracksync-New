import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { UserIcon, PhoneIcon, BuildingOfficeIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const visitorSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  contact: Yup.string().required('Contact number is required'),
  purpose: Yup.string().required('Purpose of visit is required'),
  hostName: Yup.string().required('Host name is required'),
  department: Yup.string().required('Department is required'),
});

function VisitorForm({ onSubmit, isLoading }) {
  const departments = [
    'R&I',
    'HR',
    'FACULTY',
    'CONSULTANCY',
    'F&A',
    'CORPORATE',
    'Administration'
  ];

  return (
    <Formik
      initialValues={{
        name: '',
        contact: '',
        purpose: '',
        hostName: '',
        department: ''
      }}
      validationSchema={visitorSchema}
      onSubmit={onSubmit}
    >
      {({ errors, touched }) => (
        <Form className="space-y-4">
          <p className="text-sm text-gray-500 mb-2">Please enter visitor details</p>
          
          <div className="space-y-4">
            <div className="relative">
              <UserIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Field
                name="name"
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Visitor Name"
              />
              {errors.name && touched.name && (
                <div className="text-red-500 text-xs mt-1">{errors.name}</div>
              )}
            </div>

            <div className="relative">
              <PhoneIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Field
                name="contact"
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Contact Number"
              />
              {errors.contact && touched.contact && (
                <div className="text-red-500 text-xs mt-1">{errors.contact}</div>
              )}
            </div>

            <div>
              <Field
                as="textarea"
                name="purpose"
                className="w-full px-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Purpose of Visit"
                rows="3"
              />
              {errors.purpose && touched.purpose && (
                <div className="text-red-500 text-xs mt-1">{errors.purpose}</div>
              )}
            </div>

            <div className="relative">
              <UserGroupIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Field
                name="hostName"
                type="text"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                placeholder="Host Name"
              />
              {errors.hostName && touched.hostName && (
                <div className="text-red-500 text-xs mt-1">{errors.hostName}</div>
              )}
            </div>

            <div className="relative">
              <BuildingOfficeIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <Field
                as="select"
                name="department"
                className="w-full pl-10 pr-4 py-3 rounded-md border border-gray-200 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 bg-white"
              >
                <option value="">Select Department</option>
                {departments.map((dept) => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </Field>
              {errors.department && touched.department && (
                <div className="text-red-500 text-xs mt-1">{errors.department}</div>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-blue-500 text-white rounded-md font-medium hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default VisitorForm;