"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';

export default function ThanksPage() {
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [user, setUser] = useState<{
    name: string;
    email: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get user data and verify payment
    const initializePage = async () => {
      try {
        // Get user data from localStorage (always available after payment)
        const storedUserData = localStorage.getItem('currentUser');
        const paymentCompleted = localStorage.getItem('paymentCompleted');
        
        if (storedUserData) {
          const userData = JSON.parse(storedUserData);
          setUser({
            name: userData.full_name || userData.name || 'New Member',
            email: userData.email
          });

          // Try to verify payment from database
          try {
            const response = await fetch('/api/check-payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ email: userData.email })
            });
            
            if (response.ok) {
              const data = await response.json();
              setPaymentVerified(data.hasPaid);
            } else {
              // If API fails, fall back to localStorage
              setPaymentVerified(paymentCompleted === 'true');
            }
          } catch (apiError) {
            console.log('API verification failed, using localStorage fallback');
            setPaymentVerified(paymentCompleted === 'true');
          }
        } else {
          // No user data, redirect to signup
          setTimeout(() => {
            window.location.href = '/signup';
          }, 2000);
        }
      } catch (error) {
        console.error('Page initialization error:', error);
        // Fallback: show page anyway
        setUser({ name: 'New Member', email: 'user@example.com' });
        setPaymentVerified(true);
      } finally {
        setIsLoading(false);
      }
    };

    initializePage();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="text-white mt-4">Verifying your payment...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 flex items-center justify-center p-4">
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
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors"
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