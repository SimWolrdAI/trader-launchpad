import { NextRequest, NextResponse } from "next/server";
import { animals } from "@/data/animals";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "traderlaunchpad2026";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const animal = animals.find((a) => a.id === parseInt(id));
  return NextResponse.json({
    deployed: animal?.deployed ?? false,
    contractAddress: animal?.contractAddress,
  });
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Check password
  const body = await request.json();
  if (body.password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Note: Changes won't persist without Redis/database
  // This is a read-only mode for free hosting
  return NextResponse.json({
    success: false,
    error: "Storage not configured. To enable admin panel, set up Upstash Redis (free tier available).",
  });
}

