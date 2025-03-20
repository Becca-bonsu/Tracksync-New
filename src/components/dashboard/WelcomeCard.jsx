function WelcomeCard({ lecturerName, studentName }) {
  const name = studentName || lecturerName;
  const role = studentName ? 'Student' : 'Lecturer';

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold">Welcome Back, {name}</h2>
      <p className="text-gray-500 mt-1">
        {role === 'Student' 
          ? "Here's an overview of your academic progress."
          : "Here's what's happening with your courses today."}
      </p>
    </div>
  );
}

export default WelcomeCard;
