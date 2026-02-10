import { Redis } from "@upstash/redis";

export const redis = new Redis({
  url: process.env.KV_REST_API_URL || "",
  token: process.env.KV_REST_API_TOKEN || "",
});

export interface TraderDynamic {
  deployed: boolean;
  contractAddress?: string;
}

// Get dynamic data for a single trader
export async function getTraderDynamic(
  traderId: number
): Promise<TraderDynamic | null> {
  try {
    const data = await redis.get<TraderDynamic>(`trader:${traderId}`);
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
    const keys = await redis.keys("trader:*");
    if (keys.length === 0) return {};

    const pipeline = redis.pipeline();
    for (const key of keys) {
      pipeline.get(key);
    }
    const results = await pipeline.exec<(TraderDynamic | null)[]>();

    const map: Record<number, TraderDynamic> = {};
    keys.forEach((key, i) => {
      const id = parseInt(key.replace("trader:", ""));
      if (results[i]) {
        map[id] = results[i]!;
      }
    });

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
  await redis.set(`trader:${traderId}`, data);
}

