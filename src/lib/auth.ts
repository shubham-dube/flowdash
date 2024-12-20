import { getAuth } from 'firebase-admin/auth';
import { cookies } from 'next/headers';
import { firebaseAdmin } from './firebaseAdmin'; 

export const getServerSession = async () => {
    const authToken = (await cookies()).get('authToken')?.value;
  
    if (!authToken) return null;
  
    try {
      const decodedToken = await getAuth(firebaseAdmin).verifyIdToken(authToken);
      return decodedToken;
    } catch (error) {
      console.error('Server Auth Error:', error);
      return null;
    }
  };