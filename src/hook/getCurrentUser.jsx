import { useState, useEffect } from 'react';
import { account } from '../appwrite';

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserAndSession = async () => {
      try {
        const user = await account.get();
        setCurrentUser({
          userId: user?.$id,
          name: user?.name,
          email: user?.email,
          phone: user?.phone,
          status: user?.status,
          prefs: user?.prefs,
          emailVerification: user?.emailVerification
        });

        const session = await account.getSession('current');
        const provider = session?.provider;

        if (provider === 'google') {
          const accessToken = session.providerAccessToken;
          const response = await fetch('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              'Authorization': `Bearer ${accessToken}`
            }
          });

          if (!response.ok) {
            throw new Error('Failed to fetch user profile from Google');
          }

          const googleProfile = await response.json();

          await account.updatePrefs({
            googleName: googleProfile?.name,
            googlePicture: googleProfile?.picture,
            googleEmail: googleProfile?.email
          });
        } else {
          await account.updatePrefs({
            googleName: null,
            googlePicture: null,
            googleEmail: null
          });
        }

      } catch (err) {
        if (err.code !== 401) {  // 401 means not authenticated, which is not an error in this context
          setError(err);
        }
        setCurrentUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndSession();
  }, []);

  return { currentUser, loading, error };
};

export default useCurrentUser;
