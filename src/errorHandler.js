import { AppwriteException } from 'appwrite';
import toast from 'react-hot-toast';

export const handleAppwriteError = (error) => {
  if (error instanceof AppwriteException) {
    console.error('Appwrite Error:', error);
    
    switch (error.type) {
      case 'general_bad_request':
        toast.error('Account likely already exist');
        break;
    
      default:
        toast.error(error?.message);
    }
  } else {
    console.error('Non-Appwrite Error:', error);
    toast.error('An unexpected error occurred. Please try again.');
  }
};