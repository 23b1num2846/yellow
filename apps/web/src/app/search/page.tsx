import { z } from 'zod';
import { BusinessSchema } from '@yellow/contract';
import ClientPage from './ClientPage';

export const dynamic = 'force-dynamic';
export const fetchCache = 'force-no-store';

const API = process.env.NEXT_PUBLIC_API_URL!;
const ListSchema = z.array(BusinessSchema);

export default async function Page() {
  const res = await fetch(`${API}/businesses`, { cache: 'no-store' });
  const json = await res.json();
  const data = ListSchema.parse(json);

  return (
    <main className="max-w-6xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">Хайлтын хуудас</h1>
      <ClientPage data={data} />
    </main>
  );
}
