function WelcomeCard({ lecturerName }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-semibold">Welcome Back, {lecturerName}</h2>
      <p className="text-gray-500 mt-1">Here's what's happening with your courses today.</p>
    </div>
  );
}

export default WelcomeCard;
