/* eslint-disable @next/next/no-img-element */
'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { z } from 'zod';
import { BusinessSchema } from '@yellow/contract';

const BusinessListSchema = z.array(BusinessSchema);
type Business = z.infer<typeof BusinessSchema>;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function BusinessesPage({ params }: { params: Promise<{ id: string }> }) {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    fetch(`${apiUrl}/businesses`)
      .then((res) => res.json())
      .then((json) => setBusinesses(BusinessListSchema.parse(json)))
      .catch(console.error);
  }, []);

  return (
    <main className="p-12 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Байгууллагууд</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {businesses.map((b) => (
          <Link
            key={b.id}
            href={`/businesses/${b.id}`}
            className="bg-white rounded-2xl shadow hover:shadow-lg transition p-6 flex flex-col items-start"
          >
            <img
              src="/static/logo-default.png"
              alt="Company Logo"
              className="h-16 mb-4"
            />
            <h2 className="text-lg font-semibold text-yellow-700">{b.name}</h2>
            <p className="text-gray-600 mt-1">{b.address}</p>
            <p className="text-gray-500 mt-2">📞 {b.phone}</p>
            <a
              href={b.website}
              target="_blank"
              className="text-yellow-600 mt-2 hover:underline"
            >
              🌐 {b.website.replace(/^https?:\/\//, '')}
            </a>
          </Link>
        ))}
      </div>
    </main>
  );
}
