import { useState } from 'react';
import QR from "../../assets/qr.jpg"
const Modal = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);
  const [isSignupModalOpen, setSignupModalOpen] = useState(false);
  const [isDonateModalOpen, setDonateModalOpen] = useState(false);

  const closeModal = (modal) => {
    if (modal === 'login') {
      setLoginModalOpen(false);
    } else if (modal === 'signup') {
      setSignupModalOpen(false);
    } else if (modal === 'donate') {
      setDonateModalOpen(false);
    }
  };

  return (
    <div>
      {/* Login Modal */}
      {isLoginModalOpen && (
        <div id="login-modal">
          <div className="modal-content">
            <button className="close-button" onClick={() => closeModal('login')}>
              &times;
            </button>
            <h2>Login</h2>
            <form id="login-form">
              <input type="email" id="login-email" placeholder="Email" required />
              <input type="password" id="login-password" placeholder="Password" required />
              <button type="submit">Login</button>
              <p id="login-error" className="error-message"></p>
            </form>
            <button className="signup-button" onClick={() => setSignupModalOpen(true)}>
              Sign Up
            </button>
            <p><a href="#">Forgot Password?</a></p>
          </div>
        </div>
      )}

      {/* Sign Up Modal */}
      {isSignupModalOpen && (
        <div id="signup-modal">
          <div className="signup-content">
            <button className="close-button" onClick={() => closeModal('signup')}>
              &times;
            </button>
            <h2>Sign Up</h2>
            <form id="signup-form">
              <input type="text" id="signup-firstname" placeholder="First Name" required />
              <input type="text" id="signup-lastname" placeholder="Last Name" required />
              <input type="email" id="signup-email" placeholder="Email" required />
              <input type="password" id="signup-password" placeholder="Password" required />
              <button type="submit">Sign Up</button>
              <p id="signup-error" className="error-message"></p>
            </form>
          </div>
        </div>
      )}

      {/* Donate Modal */}
      {isDonateModalOpen && (
        <div id="donate-modal">
          <div className="donate-content">
            <button className="close-button" onClick={() => closeModal('donate')}>
              &times;
            </button>
            <h2>Donate Now</h2>
            <img src={QR} alt="QR Code for Donation" className="qr-code" />
            <h3>Bank Details:</h3>
            <p><strong>Account Name:</strong> NGO Helpers</p>
            <p><strong>Account Number:</strong> 123456789</p>
            <p><strong>Bank Name:</strong> Your Bank Name</p>
            <p><strong>IFSC Code:</strong> ABCD0123456</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
