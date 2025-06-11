const Stripe = require('stripe');
require('dotenv').config({ path: '.env.local' });

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function setupStripeProducts() {
  try {
    console.log('🚀 Setting up Stripe products...');

    // Create the main product
    const product = await stripe.products.create({
      name: 'Vibe Coding Masterclass',
      description: 'Learn to build winning apps in 21 days with proven templates and strategies',
      images: ['https://your-domain.com/course-image.png'], // You can update this later
      metadata: {
        course_type: 'masterclass',
        duration: '21_days'
      }
    });

    console.log('✅ Product created:', product.id);

    // Create pricing options
    const prices = await Promise.all([
      // One-time payment option
      stripe.prices.create({
        product: product.id,
        unit_amount: 49700, // $497.00
        currency: 'usd',
        nickname: 'One-time Payment',
        metadata: {
          payment_type: 'one_time'
        }
      }),

      // 3-month payment plan
      stripe.prices.create({
        product: product.id,
        unit_amount: 19700, // $197.00/month
        currency: 'usd',
        recurring: {
          interval: 'month',
          interval_count: 1
        },
        nickname: '3-Month Plan',
        metadata: {
          payment_type: 'installment',
          total_payments: '3'
        }
      })
    ]);

    console.log('✅ Prices created:');
    prices.forEach((price, index) => {
      const type = index === 0 ? 'One-time' : '3-Month Plan';
      const amount = price.unit_amount / 100;
      console.log(`  - ${type}: $${amount} (${price.id})`);
    });

    console.log('\n🎉 Stripe setup complete!');
    console.log('\n📋 Add these to your .env.local:');
    console.log(`STRIPE_PRODUCT_ID=${product.id}`);
    console.log(`STRIPE_PRICE_ONE_TIME=${prices[0].id}`);
    console.log(`STRIPE_PRICE_MONTHLY=${prices[1].id}`);

    return {
      product,
      prices: {
        oneTime: prices[0],
        monthly: prices[1]
      }
    };

  } catch (error) {
    console.error('❌ Error setting up Stripe:', error.message);
    throw error;
  }
}

// Run the setup
setupStripeProducts()
  .then(() => {
    console.log('\n✨ Setup completed successfully!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 Setup failed:', error);
    process.exit(1);
  }); 