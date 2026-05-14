'use client';

import Link from 'next/link';
import { Shield } from 'lucide-react';

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-5 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-xl font-bold">
            ROKKO<span className="text-[#00bcd4]">.</span>
          </Link>
          
          <Link 
            href="/admin" 
            className="flex items-center gap-2 text-sm text-gray-600 hover:text-[#00bcd4] transition-colors"
          >
            <Shield size={16} />
            Panel Admin
          </Link>
        </div>
      </div>
    </header>
  );
}