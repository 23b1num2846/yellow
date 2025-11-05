import { Suspense } from 'react';
import { z } from 'zod';
import { BusinessSchema } from '@yellow/contract';
import Image from 'next/image';

export const revalidate = 60; // ✅ ISR

const ListSchema = z.array(BusinessSchema);
const API = process.env.NEXT_PUBLIC_API_URL!;

async function BooksList() {
  const res = await fetch(`${API}/businesses`, {
  next: { revalidate: 60 },
  cache: "force-cache",
});
  const json = await res.json();
  const data = ListSchema.parse(json);

  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((b) => (
        <li key={b.id} className="rounded-2xl bg-white p-6 shadow">
          <Image
            src={b.logoUrl || '/static/logo-default.png'}
            width={200}
            height={200}
            alt={b.name}
            className="rounded-md object-cover mb-2"
          />
          <a
            className="text-lg font-semibold text-yellow-700 hover:underline"
            href={`/businesses/${b.id}`}
          >
            {b.name}
          </a>
          <p className="text-gray-600 mt-1">{b.address}</p>
          <p className="text-gray-500">📞 {b.phone}</p>
        </li>
      ))}
    </ul>
  );
}

export default async function Page() {
  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Yellow Books</h1>
      <Suspense fallback={<div className="animate-pulse text-gray-500">Жагсаалт ачааллаж байна…</div>}>
        <BooksList />
      </Suspense>
    </main>
  );
}
