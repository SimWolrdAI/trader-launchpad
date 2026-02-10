import { NextResponse } from "next/server";
import { getAllTradersDynamic } from "@/lib/redis";
import { animals } from "@/data/animals";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dynamicData = await getAllTradersDynamic();
    // If KV has data, use it; otherwise fallback to static data
    if (Object.keys(dynamicData).length > 0) {
      return NextResponse.json(dynamicData);
    }
    // Fallback to static data
    const staticMap: Record<number, { deployed: boolean; contractAddress?: string }> = {};
    animals.forEach((a) => {
      staticMap[a.id] = {
        deployed: a.deployed,
        contractAddress: a.contractAddress,
      };
    });
    return NextResponse.json(staticMap);
  } catch {
    // If KV not configured, return static data
    const staticMap: Record<number, { deployed: boolean; contractAddress?: string }> = {};
    animals.forEach((a) => {
      staticMap[a.id] = {
        deployed: a.deployed,
        contractAddress: a.contractAddress,
      };
    });
    return NextResponse.json(staticMap);
  }
}

