'use client';

import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import {
  Elements,
  CardElement,
  useStripe,
  useElements
} from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 
  'pk_test_51RYlkKRAsDNTTxJIhJRaYhIR1Cr6KJKHc6cHGKpGV8FhTdKEKhJA8zPdKrROQtLCGK5A1Q9aTz5x8FhPOV6fqo7u00z1rL1QQM'  // fallback key
);

interface PaymentFormProps {
  user: { name: string; email: string };
  selectedPlan: string;
  onSuccess: () => void;
}

function CheckoutForm({ user, selectedPlan, onSuccess }: PaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [stripeLoaded, setStripeLoaded] = useState(false);

  // Debug: Check if Stripe is loading
  React.useEffect(() => {
    if (stripe) {
      setStripeLoaded(true);
      console.log('Stripe loaded successfully');
    } else {
      console.log('Stripe not loaded yet...');
    }
  }, [stripe]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // Get payment amount
      const amount = selectedPlan === 'one-time' ? 49700 : 19700; // $497 or $197 in cents

      // Create payment intent
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          email: user.email,
          name: user.name,
          planType: selectedPlan
        })
      });

      const { clientSecret, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      // Confirm payment
      const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: {
            name: user.name,
            email: user.email,
          },
        },
      });

      if (stripeError) {
        setError(stripeError.message || 'Payment failed');
      } else if (paymentIntent.status === 'succeeded') {
        // Record payment in our database
        await fetch('/api/check-payment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: user.email,
            sessionId: paymentIntent.id,
            amount,
            status: 'succeeded'
          })
        });

        localStorage.setItem('paymentCompleted', 'true');
        onSuccess();
      }
    } catch (err: any) {
      setError(err.message || 'Payment failed');
    } finally {
      setLoading(false);
    }
  };

  if (!stripeLoaded) {
    return (
      <div className="space-y-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <div className="animate-pulse">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
        </div>
        <div className="text-center text-gray-500">Loading payment form...</div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Card Information
        </label>
        <div className="p-4 border-2 rounded-lg bg-white focus-within:border-purple-500 transition-colors">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#1f2937',
                  fontFamily: 'system-ui, sans-serif',
                  '::placeholder': {
                    color: '#9ca3af',
                  },
                  iconColor: '#6b7280',
                },
                invalid: {
                  color: '#ef4444',
                  iconColor: '#ef4444',
                },
              },
              hidePostalCode: false,
            }}
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Test card: 4242 4242 4242 4242
        </div>
      </div>

      {error && (
        <div className="text-red-600 text-sm bg-red-50 border border-red-200 p-3 rounded-lg">
          ❌ {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || loading}
        className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl text-lg shadow transition"
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processing Payment...
          </span>
        ) : (
          `Pay ${selectedPlan === 'one-time' ? '$497' : '$197'} - Start Vibe Coding`
        )}
      </button>
    </form>
  );
}

export default function StripePaymentForm({ user, selectedPlan, onSuccess }: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise}>
      <CheckoutForm user={user} selectedPlan={selectedPlan} onSuccess={onSuccess} />
    </Elements>
  );
} 