'use client';

import React from 'react';
import MyHeader from '../ui/home/MyHeader';
import {SignupAuth} from "@/app/utils/auth";
import Link from 'next/link';

const SignupPage = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-orange-200 dark:bg-gradient-to-br dark:from-blue-900 dark:to-orange-600">
            
            <MyHeader />

            <div className="w-full max-w-sm shadow-lg rounded-xl p-6 border border-gray-200 bg-gradient-to-l from-blue-200 to-orange-200 dark:bg-gradient-to-bl dark:from-blue-900 dark:to-orange-600">
            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 text-center">
                Get started
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-300 text-center mb-4">
                Please Signup to continue
            </p>

            <SignupAuth/>

            <p className="text-sm text-gray-500 dark:text-gray-300 text-center mt-4">
                Already have an account?{' '}
                <Link href="/signin" className="text-blue-600 hover:underline"> 
                Sign In
                </Link>
            </p>
        </div>
        </div>
    );
};

export default SignupPage;
