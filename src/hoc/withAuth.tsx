import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const withAuth = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuth = (props: any) => {
    const { accessToken, checkAndRefreshAccessToken } = useAuth();
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
      const verifyAuth = async () => {
        try {
          await checkAndRefreshAccessToken();
          setLoading(false);
          if (!accessToken) {
            router.replace('/login'); // Redirect to login page if not authenticated
          }
        } catch (error) {
          setLoading(false);
          router.replace('/login');
        }
      };

      verifyAuth();
    }, []); // Empty dependency array to run only once on mount

    if (loading) {
      return <div>Loading...</div>; // Show a loading state while checking authentication
    }

    if (!accessToken) {
      return null; // Return null if not authenticated
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
};

export default withAuth;