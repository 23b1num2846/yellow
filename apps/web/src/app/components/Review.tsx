'use client';

import { useEffect, useState } from 'react';
import { Review } from '@yellow/contract';
import Image from 'next/image';

export default function Reviews({ businessId }: { businessId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    async function fetchReviews() {
      try {
        const res = await fetch(`${API}/businesses/${businessId}/reviews`);
        if (!res.ok) throw new Error('Failed to fetch reviews');
        const data = await res.json();
        setReviews(data);
      } catch (error:any) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchReviews();
  }, [API, businessId, error]);

  if (loading) return <p className="text-gray-500">Сэтгэгдэл ачаалж байна...</p>;
  if (error) return <p className="text-red-500">Алдаа: {error}</p>;

  if (reviews.length === 0)
    return (
      <div className="text-gray-500 mt-8 bg-gray-50 border rounded-xl p-6 text-center">
        Одоогоор сэтгэгдэл алга байна.
      </div>
    );

  return (
    <section className="mt-10">
      <h2 className="text-2xl font-semibold mb-5 text-gray-800">
        💬 Сэтгэгдэл ({reviews.length})
      </h2>
      <div className="grid gap-6 md:grid-cols-2">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center gap-3 px-5 pt-5">
              <Image
                src="/static/default-user.jpg"
                alt="user avatar"
                className="w-10 h-10 rounded-full border"
              />
              <div>
                <p className="font-medium text-gray-800">Хэрэглэгч</p>
                <p className="text-sm text-gray-500">1 минутын өмнө</p>
              </div>
            </div>

            <div className="px-5 py-4">
              <p className="text-yellow-500 text-lg">
                {'⭐'.repeat(r.score)}{' '}
                <span className="text-gray-500 text-sm">({r.score}/5)</span>
              </p>
              <p className="text-gray-700 mt-2 line-clamp-3">{r.post}</p>
            </div>

            <div className="border-t px-5 py-3 flex justify-between text-gray-400 text-sm">
              <button className="hover:text-yellow-600">👍 Тус боллоо</button>
              <button className="hover:text-yellow-600">💬 Хариу бичих</button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
