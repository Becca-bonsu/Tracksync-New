const roles = {
  superAdmin: {
    permissions: [
      'manage_all_users',
      'view_all_data',
      'configure_settings',
      'manage_reports',
    ],
  },
  administrator: {
    permissions: [
      'manage_admins',
      'view_reports',
      'manage_courses',
      'manage_students',
      'manage_lecturers',
      'generate_visitor_Qrcode',
      'create_users',
      'create_admins',
      'manage_visitor_logs',
      'manage_employee_lists',
    ],
  },
  hrAdmin: {
    permissions: [
      'view_employee_attedance',
      'manage_employee_lists',
      'view_section_reports',
      'manage_letters',
      'view_visitor_logs',
    ],
  },
  Lecturer: {
    permissions: [
      'manage_courseCards',
      'take_studentAttendace',
      'manage_classList',
      'scan_Qrcodes',
      'take_tickboxAttendance',
      'view_statsCard',
    ],
  },
  NationalServicePersonnel: {
    permissions: [
      'scan_Qrcodes',
      'view_classlist',
      'take_tickboxAttendance',
      'manage_courseCards',
      'view_statsCard',
    ],
  },
  student: {
    permissions: [
      'view_own_data',
      'submit_requests',
      'generate_Qrcode',
      'view_attendanceHistory',
      'view_courses',
    ],
  },
};

export default roles; 