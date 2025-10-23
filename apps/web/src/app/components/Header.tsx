'use client';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="flex items-center justify-between px-12 py-4 bg-white shadow-md">
      <div className="flex items-center gap-2 text-yellow-600 font-bold text-2xl">
        <span>📒</span>
        <Link href="/">Yellow book</Link>
      </div>

      <nav className="flex items-center gap-8 text-gray-700 font-medium">
        <Link href="/about" className="hover:text-yellow-600">Бидний тухай</Link>
        <Link href="/feedback" className="hover:text-yellow-600">Санал хүсэлт</Link>
        <button className="bg-yellow-500 text-white px-5 py-2 rounded-full hover:bg-yellow-600">
          Нэвтрэх
        </button>
      </nav>
    </header>
  );
}
