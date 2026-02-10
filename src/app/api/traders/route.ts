import { NextResponse } from "next/server";
import { animals } from "@/data/animals";

export const dynamic = "force-dynamic";

export async function GET() {
  // Return static data from animals.ts (no Redis needed)
  const staticMap: Record<number, { deployed: boolean; contractAddress?: string }> = {};
  animals.forEach((a) => {
    staticMap[a.id] = {
      deployed: a.deployed,
      contractAddress: a.contractAddress,
    };
  });
  return NextResponse.json(staticMap);
}

