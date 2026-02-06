import { NextResponse } from "next/server";
import { getAllTradersDynamic } from "@/lib/redis";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dynamicData = await getAllTradersDynamic();
    return NextResponse.json(dynamicData);
  } catch {
    // If Redis not configured yet, return empty
    return NextResponse.json({});
  }
}

