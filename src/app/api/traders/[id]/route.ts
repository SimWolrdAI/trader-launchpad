import { NextRequest, NextResponse } from "next/server";
import { setTraderDynamic, getTraderDynamic } from "@/lib/redis";

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "traderlaunchpad2026";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    const data = await getTraderDynamic(parseInt(id));
    return NextResponse.json(data || { deployed: false });
  } catch {
    return NextResponse.json({ deployed: false });
  }
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

  try {
    await setTraderDynamic(parseInt(id), {
      deployed: body.deployed ?? false,
      contractAddress: body.contractAddress || undefined,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update: " + String(error) },
      { status: 500 }
    );
  }
}

