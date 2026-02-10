import { kv } from "@vercel/kv";

export interface TraderDynamic {
  deployed: boolean;
  contractAddress?: string;
}

// Get dynamic data for a single trader
export async function getTraderDynamic(
  traderId: number
): Promise<TraderDynamic | null> {
  try {
    const data = await kv.get<TraderDynamic>(`trader:${traderId}`);
    return data;
  } catch {
    return null;
  }
}

// Get dynamic data for all traders
export async function getAllTradersDynamic(): Promise<
  Record<number, TraderDynamic>
> {
  try {
    const keys = await kv.keys("trader:*");
    if (keys.length === 0) return {};

    const map: Record<number, TraderDynamic> = {};
    for (const key of keys) {
      const id = parseInt(key.replace("trader:", ""));
      const data = await kv.get<TraderDynamic>(key);
      if (data) {
        map[id] = data;
      }
    }

    return map;
  } catch {
    return {};
  }
}

// Set dynamic data for a trader
export async function setTraderDynamic(
  traderId: number,
  data: TraderDynamic
): Promise<void> {
  await kv.set(`trader:${traderId}`, data);
}

