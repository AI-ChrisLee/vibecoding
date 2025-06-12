import { Inter } from 'next/font/google';
import './globals.css';
import { Metadata } from 'next';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://vibecode.com'),
  title: {
    default: 'Clone $10M Apps in 21 Days | Vibe Code Clone Accelerator',
    template: '%s | Vibe Code Clone Accelerator'
  },
  description: 'Learn to clone profitable apps using Cursor AI, Supabase, and Vercel. Ship 3 working clones in 21 days or get 100% refunded.',
  applicationName: 'Vibe Code Clone Accelerator',
  referrer: 'origin-when-cross-origin',
  keywords: ['clone apps', 'vibe coding', 'cursor ai', 'supabase', 'vercel', 'app development', 'coding bootcamp', 'ai development'],
  authors: [{ name: 'AI Chris Lee', url: 'https://x.com/AiChrisLee' }],
  creator: 'AI Chris Lee',
  publisher: 'Vibe Code',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  category: 'education',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#2563eb" />
        <meta name="color-scheme" content="light" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className="antialiased bg-white text-gray-900 selection:bg-blue-100 selection:text-blue-900 scroll-smooth">
        <div className="min-h-screen flex flex-col">
          <main className="flex-1">
            {children}
          </main>
        </div>
        
        {/* Performance and Analytics Scripts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Preload critical resources
              if ('requestIdleCallback' in window) {
                requestIdleCallback(() => {
                  const link = document.createElement('link');
                  link.rel = 'prefetch';
                  link.href = '/signup';
                  document.head.appendChild(link);
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
