import { BusinessSchema } from "@yellow/contract";
import Reviews from "../../components/Review";
import Image from 'next/image';

export const revalidate = 60;
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default async function BusinessDetails({ params }: { params: { id: string } })
 {
  const { id } = await params;

  const res = await fetch(`${apiUrl}/businesses/${id}`, {
    next: { revalidate: 60 },
  });

  

  if (!res.ok) {
    throw new Error("Failed to fetch business data");
  }

  const data = await res.json();
  const business = BusinessSchema.parse(data);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6">
      <section className="bg-white shadow-lg rounded-2xl p-8">
        <div className="flex items-center gap-6">
          <Image
                      src={business.logoUrl || '/static/logo-default.png'}
                      width={200}
                      height={200}
                      alt={business.name}
                      className="rounded-md object-cover mb-2"
                    />
          <div>
            <h1 className="text-3xl font-bold text-yellow-600">{business.name}</h1>
            <p className="text-gray-500 mt-1">{business.timetable}cmon</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">📋 Тайлбар</h2>
            <p className="text-gray-600 leading-relaxed">{business.description}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">📍 Байршил</h2>
            <p className="text-gray-600">{business.address}</p>
            <p className="text-gray-600 mt-1">🌍 {business.location}</p>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">📞 Холбоо барих</h2>
            <p className="text-gray-600">Утас: {business.phone}</p>
            <p className="text-gray-600">Имэйл: {business.email}</p>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-3">🔗 Холбоосууд</h2>
            <a
              href={business.website}
              target="_blank"
              className="block text-yellow-600 hover:underline"
            >
              🌐 {business.website}
            </a>
            <a
              href={business.facebookUrl}
              target="_blank"
              className="block text-yellow-600 hover:underline"
            >
              👍 Facebook
            </a>
            <a
              href={business.instagramUrl}
              target="_blank"
              className="block text-yellow-600 hover:underline"
            >
              📸 Instagram
            </a>
          </div>
        </div>
      </section>
      <Reviews businessId={business.id} />
    </main>
  );
}
