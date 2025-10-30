import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  const { secret, tag } = await req.json().catch(() => ({}));
  if (secret !== process.env.REVALIDATE_SECRET)
    return NextResponse.json({ ok: false, message: "Unauthorized" }, { status: 401 });

  if (!tag)
    return NextResponse.json({ ok: false, message: "Missing tag" }, { status: 400 });

  revalidateTag(tag);
  return NextResponse.json({ ok: true, revalidated: tag });
}
