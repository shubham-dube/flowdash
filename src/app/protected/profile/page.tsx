import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from '../../../lib/auth';

const ProfilePage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin'); 
  }

  return (
    <div>
      <h1>Welcome to Your Profile Page!</h1>
    </div>
  );
};

export default ProfilePage;
