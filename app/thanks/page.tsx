"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ThanksPage() {
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);

  useEffect(() => {
    // Get user data from localStorage
    const storedUserData = localStorage.getItem('currentUser');
    const paymentCompleted = localStorage.getItem('paymentCompleted');
    
    if (storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser({
        name: userData.full_name || userData.name || 'New Member',
        email: userData.email || 'user@example.com'
      });
    } else {
      setUser({
        name: 'New Member',
        email: 'user@example.com'
      });
    }
    
    // Check if payment was completed, if not redirect to pay page
    if (!paymentCompleted) {
      console.log('No payment completed, redirecting to pay page');
      setTimeout(() => {
        window.location.href = '/pay';
      }, 2000); // Give 2 seconds to show the page before redirect
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 w-full max-w-2xl text-center"
      >
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-12 border border-white/20 shadow-2xl">
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to Vibe Coding! 🎉
          </h1>
          
          <p className="text-xl text-gray-300 mb-8">
            Your account has been created successfully.
          </p>

          <div className="bg-white/10 rounded-xl p-6 mb-8">
            <h2 className="text-xl font-semibold text-white mb-4">Next Steps:</h2>
            
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <span className="text-2xl">📧</span>
                <div>
                  <h3 className="font-semibold text-white">Check your email</h3>
                  <p className="text-gray-300">
                    We&apos;ve sent a confirmation link to your inbox. Click it.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <span className="text-2xl">📺</span>
                <div>
                  <h3 className="font-semibold text-white">Watch the quick start videos below 📹</h3>
                  <p className="text-gray-300">
                    Get ready for the masterclass with these essential guides.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <Link 
              href="/"
              className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
            >
              Get Started
            </Link>
          </div>

          <p className="text-gray-400 mt-8">
            Questions? Hit us up at me@aichrislee.com
          </p>
        </div>
      </motion.div>
    </div>
  );
}