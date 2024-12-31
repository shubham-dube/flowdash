import React from 'react';
import { redirect } from 'next/navigation';
import { getServerSession } from '../../../lib/auth';

const DashboardPage = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect('/signin'); 
  }

  return (
    <main>

    </main>
  );
};

export default DashboardPage;