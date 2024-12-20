'use-client'

import { FaEnvelope, FaLock } from "react-icons/fa";
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, sendSignInLinkToEmail } from 'firebase/auth';
import { auth } from "@/app/utils/firebaseConfig";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export const LoginAuth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);

    const handleEmailLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await loginWithEmail(email, password);
        if (response.success) {
            setError(null);
            console.log(response.user)
            router.push('/');
        } else {
            setError(response.message);
        }
    };

    const handleGoogleAuthentication = async () => {
        console.log('started');
        const response = await loginWithGoogle();
        if (response.success) {
            setError(null);
            console.log(response.user)
            router.push('/');
        } else {
            setError(response.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleEmailLogin}>
                {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
                <div className="mb-3 relative">
                    <label htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-300">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 pl-10 pr-3 py-2 border bg-transparent rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                text-gray-700 dark:text-gray-100 border-gray-400 placeholder:text-gray-500 
                                dark:placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <div className="mb-4 relative">
                    <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                    >
                        Password
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-300">
                            <FaLock />
                        </span>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 pl-10 pr-3 py-2 text-gray-700 border border-gray-400 
                                bg-transparent  rounded-md shadow-sm focus:outline-none focus:ring-2 
                                focus:ring-blue-500 focus:border-transparent dark:text-gray-100 
                                placeholder:text-gray-500 dark:placeholder:text-gray-400"
                        />
                    </div>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                >
                    Sign In
                </button>
            </form>
            <div className="my-4 flex items-center justify-center">
                <span className="border-t w-1/3 border-gray-300 dark:border-gray-600"></span>
                <span className="text-sm text-gray-600 dark:text-gray-300 mx-3">
                    OR
                </span>
                <span className="border-t w-1/3 border-gray-300 dark:border-gray-600"></span>
            </div>
            <button
                className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
            onClick={handleGoogleAuthentication}>
                <Image
                    src="/google-icon.svg"
                    alt="Google Icon"
                    width={20} 
                    height={20}
                    className="mr-2" 
                />
                Sign in with Google
            </button>
        </div>
    )
}


const loginWithEmail = async (email: string, password: string) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return { success: true, user: userCredential.user, message: "" };
    } catch (error: any) {
        console.log(error);
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/invalid-credential') {
            errorMessage = 'Invalid Credentials. Please try again.';
        }
        return { success: false, message: errorMessage, user: {} };
    }
};

const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        console.log('User logged in with Google:', user);
        return { success: true, user: user, message: "User Successfully logged In" };
    } catch (error: any) {
        console.error('Error during Google login:', error.message);
        let errorMessage = 'Something went wrong.';
        if (error.code === 'auth/invalid-credential') {
            errorMessage = `${error.code}. Please try again.`;
        }
        return { success: false, message: errorMessage, user: {} };
    }
};

export const SignupAuth = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [isLinkSent, setLinkBool] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleEmailSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await sendLoginLinktoEmail(email);
        if (response===true) {
            setError(null);
            setLinkBool(true);
        } else {
            setError("Error in sending link");
        }
    };

    const handleGoogleAuthentication = async () => {
        console.log('started');
        const response = await loginWithGoogle();
        if (response.success) {
            setError(null);
            console.log(response.user)
            router.push('/');
        } else {
            setError(response.message);
        }
    };

    return (
        <div>
            <form onSubmit={handleEmailSignup}>
                {error && <div className="mb-3 text-sm text-red-600">{error}</div>}
                <div className="mb-3 relative">
                    <label htmlFor="email"
                        className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                        Email Address
                    </label>
                    <div className="relative">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500 dark:text-gray-300">
                            <FaEnvelope />
                        </span>
                        <input
                            type="email"
                            id="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 pl-10 pr-3 py-2 border bg-transparent rounded-md shadow-sm 
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                                text-gray-700 dark:text-gray-100 border-gray-400 placeholder:text-gray-500 
                                dark:placeholder:text-gray-400"
                        />
                    </div>
                </div>
                
               {isLinkSent? <h2 className="text-gray-800 dark:text-gray-300 text-center">Link Sent. Check your inbox.</h2>: <button
                    type="submit"
                    className="w-full bg-blue-600 text-white py-2 rounded-md shadow-md hover:bg-blue-700 transition-colors"
                >
                    Send link
                </button>} 
            </form>
            <div className="my-4 flex items-center justify-center">
                <span className="border-t w-1/3 border-gray-300 dark:border-gray-600"></span>
                <span className="text-sm text-gray-600 dark:text-gray-300 mx-3">
                    OR
                </span>
                <span className="border-t w-1/3 border-gray-300 dark:border-gray-600"></span>
            </div>
            <button
                className="w-full flex items-center justify-center bg-gray-100 text-gray-700 py-2 rounded-md shadow-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition-colors"
                onClick={handleGoogleAuthentication}>
                <Image
                    src="/google-icon.svg"
                    alt="Google Icon"
                    width={20} 
                    height={20}
                    className="mr-2" 
                />
                Sign up with Google
            </button>
        </div>
    )
}

const sendLoginLinktoEmail = async (email: string) => {
    try {
        const actionCodeSettings = {
            url: 'http://localhost:3000/signin',
            handleCodeInApp: true,
          };
        await sendSignInLinkToEmail(auth, email, actionCodeSettings); 
        return true;
    } catch (error) {
        console.log(error);
        return false;;
    }
}
