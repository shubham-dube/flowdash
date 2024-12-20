import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from '../../../lib/auth';

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin'); 
  }

  return (
    <div>
      <h1>Welcome to Your Dashboard!</h1>
      <p>This is a protected page accessible only to authenticated users.</p>
    </div>
  );
};

export default DashboardPage;
