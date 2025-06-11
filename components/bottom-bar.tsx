"use client";

import React from 'react';

export default function BottomBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black/90 backdrop-blur-sm border-t border-white/10 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="text-white font-semibold">
              Vibe Coding Masterclass
            </div>
            <div className="text-gray-400 text-sm">
              Transform your ideas into winning apps
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-white font-bold text-lg">
              $497
            </div>
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-semibold transition-colors">
              Join Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 