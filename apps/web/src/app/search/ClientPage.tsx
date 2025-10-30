'use client';

import dynamic from 'next/dynamic';
import { z } from 'zod';
import { BusinessSchema } from '@yellow/contract';
import { useEffect, useState } from 'react';

const Map = dynamic(() => import('../components/Map'), { ssr: false });

const ListSchema = z.array(BusinessSchema);

export default function ClientPage({ data }: { data: z.infer<typeof ListSchema> }) {
  const [query, setQuery] = useState('');
  const filtered = query
    ? data.filter((b) =>
        [b.name, b.address, b.description, b.location].some((s) =>
          s.toLowerCase().includes(query.toLowerCase())
        )
      )
    : data;

  const points = filtered
    .map((b) => b.location.split(',').map(Number))
    .filter(([lat, lng]) => Number.isFinite(lat) && Number.isFinite(lng))
    .map(([lat, lng], i) => ({ lat, lng, name: filtered[i].name }));

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      <section>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Хайх..."
          className="w-full rounded-xl border p-3 mb-4"
        />
        <ul className="space-y-3">
          {filtered.map((b) => (
            <li key={b.id} className="bg-white p-4 rounded-xl shadow">
              <a href={`/yellow-books/${b.id}`} className="text-yellow-700 font-semibold hover:underline">
                {b.name}
              </a>
              <div className="text-gray-600">{b.address}</div>
              <div className="text-gray-500 text-sm">📞 {b.phone}</div>
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="font-semibold mb-3">Газрын зураг</h2>
        <Map points={points} />
      </section>
    </div>
  );
}
