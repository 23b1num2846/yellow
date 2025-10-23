'use client';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { BusinessSchema } from '@yellow/contract';

// Server-ээс буусан өгөгдлийн нийт бүтэц
const BusinessListSchema = z.array(BusinessSchema);

type Business = z.infer<typeof BusinessSchema>;

export default function HomePage() {
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadBusinesses() {
      try {
        const res = await fetch('http://localhost:5050/businesses');
        const json = await res.json();

        const parsed = BusinessListSchema.parse(json);
        setBusinesses(parsed);
      } catch (err: any) {
        console.error(err);
        if (err.name === 'ZodError') {
          setError('Серверээс буусан өгөгдлийн бүтэц буруу байна.');
        } else {
          setError('Өгөгдөл татах үед алдаа гарлаа.');
        }
      }
    }
    loadBusinesses();
  }, []);

  return (
    <main style={{ padding: 20 }}>
      <h1> Рестораны жагсаалт</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {businesses.map((b) => (
          <li key={b.id} style={{ margin: '8px 0' }}>
            <strong>{b.name}</strong> — {b.description}
            <br />
             {b.address} |  {b.phone}
          </li>
        ))}
      </ul>
    </main>
  );
}
