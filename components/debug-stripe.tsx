'use client';

import React from 'react';

export default function DebugStripe() {
  return (
    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
      <h3 className="font-bold text-yellow-800 mb-2">Debug Info:</h3>
      <div className="text-sm text-yellow-700 space-y-1">
        <p>Stripe Key Available: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ? '✅ Yes' : '❌ No'}</p>
        <p>Key starts with: {process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY?.substring(0, 10)}...</p>
        <p>Environment: {process.env.NODE_ENV}</p>
      </div>
    </div>
  );
} 