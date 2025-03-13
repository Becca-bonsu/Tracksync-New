import Modal from 'react-modal';

Modal.setAppElement('#root');

function SuccessModal({ isOpen, onRequestClose }) {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="fixed inset-0 flex items-center justify-center z-[9999] mt-30"
      overlayClassName="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-[9998]"
      style={{
        content: {
          position: 'relative',
          border: 'none',
          background: 'transparent',
          overflow: 'auto',
          padding: 0,
          outline: 'none'
        },
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.6)',
          backdropFilter: 'blur(4px)'
        }
      }}
    >
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-[400px] transform transition-all">
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
