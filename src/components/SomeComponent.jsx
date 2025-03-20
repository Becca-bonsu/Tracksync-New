import roles from '../config/roles';

function SomeComponent({ userRole }) {
  const canManageUsers = roles[userRole]?.permissions.includes('manage_users');

  return (
    <div>
      {canManageUsers && <button>Manage Users</button>}
      {/* Other UI elements */}
    </div>
  );
}

export default SomeComponent; 