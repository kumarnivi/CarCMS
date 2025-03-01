import React, { useState } from "react";
import api from "../API/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const ResetPassword: React.FC = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isOtpModalOpen, setIsOtpModalOpen] = useState(false);
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const navigate = useNavigate();

  // Step 1: Request OTP (Separate API)
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      toast.success("OTP sent to your email.");
      setIsOtpModalOpen(true); // Open OTP modal after sending OTP
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to send OTP.");
    }
  };

  // Step 2: Store OTP and Open Reset Password Modal
  const handleProceedToReset = () => {
    if (!otp) {
      toast.error("Please enter the OTP before proceeding.");
      return;
    }
    setIsOtpModalOpen(false);
    setIsResetModalOpen(true);
  };

  // Step 3: Reset Password (Single API call)
  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/reset-password", { email, otp, newPassword });
      toast.success("Password reset successful. You can now login.");
      setIsResetModalOpen(false);
      navigate("/");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to reset password.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <form onSubmit={handleRequestOtp}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Request OTP
          </button>
        </form>
      </div>

      {/* OTP Modal */}
      <Modal
        isOpen={isOtpModalOpen}
        onRequestClose={() => setIsOtpModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Enter OTP</h2>
        <input
          type="text"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          onClick={handleProceedToReset}
          className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700"
        >
          Proceed to Reset Password
        </button>
      </Modal>

      {/* Reset Password Modal */}
      <Modal
        isOpen={isResetModalOpen}
        onRequestClose={() => setIsResetModalOpen(false)}
        className="bg-white p-6 rounded-lg shadow-md w-80 mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
      >
        <h2 className="text-2xl font-bold text-center mb-4">Reset Password</h2>
        <form onSubmit={handleResetPassword}>
          <input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            required
            className="w-full p-2 border rounded mb-4"
          />
          <button type="submit" className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
            Reset Password
          </button>
        </form>
      </Modal>
    </div>
  );
};

export default ResetPassword;
