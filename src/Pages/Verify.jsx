import React, { useEffect, useState, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { account } from '../appwrite';
import toast from 'react-hot-toast';

const Verify = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [verificationStatus, setVerificationStatus] = useState(null);
  const toastShownRef = useRef({ success: false, failure: false, invalid: false });

  useEffect(() => {
    const verifyAccount = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const secret = urlParams.get('secret');
      const userId = urlParams.get('userId');

      if (secret && userId) {
        try {
          await account.updateVerification(userId, secret);
          setVerificationStatus('success');
          if (!toastShownRef.current.success) {
            toast.success("Your email has been verified!");
            toastShownRef.current.success = true;
          }
        } catch (error) {
          setVerificationStatus('failure');
          if (!toastShownRef.current.failure) {
            toast.error("Failed to verify email. Please try again.");
            toastShownRef.current.failure = true;
          }
        }
      } else {
        setVerificationStatus('invalid');
        if (!toastShownRef.current.invalid) {
          toast.error("Invalid verification link.");
          toastShownRef.current.invalid = true;
        }
      }
    };

    verifyAccount();
  }, []);

  useEffect(() => {
    if (verificationStatus === 'success') {
      const from = location.state?.from?.pathname || "/app/dashboard";
      navigate(from, { replace: true });
    }
  }, [verificationStatus, navigate, location.state]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      {verificationStatus === null && <p>Verifying...</p>}
      {verificationStatus === 'failure' && <p>Verification failed. Please try again.</p>}
      {verificationStatus === 'invalid' && <p>Invalid verification link.</p>}
    </div>
  );
};

export default Verify;
