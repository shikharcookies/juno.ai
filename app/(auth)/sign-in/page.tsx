'use client';
import { Button } from '@/components/ui/button';
import { useGoogleLogin } from '@react-oauth/google';
import Image from 'next/image';
import React, { useContext } from 'react';
import axios from 'axios';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { AuthContext } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

function SignIn() {
  const createUser = useMutation(api.users.CreateUser);
  const { user, setUser } = useContext(AuthContext);
  const router = useRouter();
  
  const googleLogin = useGoogleLogin({
    scope: 'profile email openid',
    onSuccess: async (tokenResponse) => {
      const accessToken = tokenResponse.access_token;
      if (typeof window !== 'undefined') {
        localStorage.setItem('user_token', accessToken);
      }
      
      try {
        const response = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        
        const userData = response.data;
        const result = await createUser({
          name: userData.name,
          email: userData.email,
          picture: userData.picture,
        });
        
        setUser(result);
        router.replace('/ai-assistants');
      } catch (error) {
        console.error('Failed to fetch user info:', error);
      }
    },
    onError: (errorResponse) => {
      console.error('Login Failed:', errorResponse);
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-32 right-10 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-200"></div>
        <div className="absolute bottom-10 left-32 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-400"></div>
      </div>
      
      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-white rounded-full opacity-10 animate-float"
            style={{
              width: Math.random() * 4 + 2 + 'px',
              height: Math.random() * 4 + 2 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
              animationDelay: Math.random() * 3 + 's',
              animationDuration: Math.random() * 3 + 2 + 's',
            }}
          />
        ))}
      </div>
      
      {/* Main content */}
      <div className="relative z-10 w-full max-w-md">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-3xl p-8 shadow-2xl transform transition-all duration-300 hover:scale-105 hover:shadow-3xl">
          {/* Glassmorphism effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10 flex flex-col items-center space-y-8">
            {/* Logo container with glow effect */}
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative bg-white/20 backdrop-blur-sm rounded-full p-4 border border-white/30">
                <Image
                  src={'/logo1.svg'}
                  alt='logo'
                  width={120}
                  height={120}
                  className="transform transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            </div>
            
            {/* Text content */}
            <div className="text-center space-y-3">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                Welcome Back
              </h1>
              <p className="text-white/80 text-lg font-medium">
                Sign in to your AI Assistant
              </p>
              <p className="text-white/60 text-sm">
                Unlock the power of intelligent automation
              </p>
            </div>
            
            {/* Sign in button */}
            <div className="w-full space-y-4">
              <Button
                onClick={() => googleLogin()}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transform transition-all duration-200 hover:scale-105 active:scale-95 border-0 group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  <span>Continue with Google</span>
                </div>
              </Button>
              
              <div className="text-center">
                <p className="text-white/50 text-xs">
                  Secure authentication powered by Google
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom decorative elements */}
        <div className="flex justify-center mt-8 space-x-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-white/30 rounded-full animate-pulse"
              style={{ animationDelay: i * 0.2 + 's' }}
            />
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .shadow-3xl {
          box-shadow: 0 35px 70px -15px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </div>
  );
}

export default SignIn;