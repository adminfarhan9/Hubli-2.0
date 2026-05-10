import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const { user, signInWithGoogle, signInAnonymous } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col items-center justify-center h-full px-4 w-full">
      <div className="max-w-md w-full bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-100 flex flex-col pt-12 items-center">
        <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center text-white mb-6">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
            <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71L12 2z" fillOpacity="0.3"/>
            <path d="M12 4l-4 10h8L12 4z"/>
          </svg>
        </div>
        <h2 className="text-3xl font-black tracking-tighter text-slate-900 mb-2">Welcome Back</h2>
        <p className="text-sm font-medium text-slate-500 mb-8 text-center">Sign in to access your fresh organic groceries and manage your orders.</p>

        <div className="flex flex-col space-y-4 w-full">
          <button 
            onClick={signInWithGoogle}
            className="w-full flex items-center justify-center space-x-3 bg-white border-2 border-slate-200 text-slate-900 py-3 px-4 rounded-xl font-bold hover:bg-slate-50 hover:border-slate-300 transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button 
            onClick={signInAnonymous}
            className="w-full flex items-center justify-center space-x-3 bg-black border-2 border-black text-white py-3 px-4 rounded-xl font-bold hover:bg-slate-900 transition-colors"
          >
             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path></svg>
            <span>Continue as Guest</span>
          </button>
        </div>
      </div>
    </div>
  );
}
