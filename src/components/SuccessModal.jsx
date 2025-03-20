import Modal from 'react-modal';

Modal.setAppElement('#root');

function SuccessModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-[9998]"
      className="relative bg-white rounded-2xl shadow-2xl p-8 w-[400px] transform transition-all"
    >
      <div className="flex flex-col items-center">
        <div className="mb-6">
          <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-3">Success!</h2>
        <p className="text-lg text-gray-600 mb-8">Login successful.</p>
        <button
          onClick={onRequestClose}
          className="w-full py-4 px-6 bg-blue-500 text-white text-lg font-semibold rounded-xl hover:bg-blue-600 transition-colors duration-200"
        >
          Continue to Dashboard
        </button>
      </div>
    </Modal>
  );
}

export default SuccessModal;
