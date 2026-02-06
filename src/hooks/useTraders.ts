"use client";

import { traders, Trader } from "@/data/traders";
import { useEffect, useState } from "react";

interface DynamicData {
  deployed: boolean;
  contractAddress?: string;
}

export interface TraderWithDynamic extends Trader {
  deployed: boolean;
  contractAddress?: string;
}

export function useTraders(): {
  traders: TraderWithDynamic[];
  loading: boolean;
  deployedCount: number;
  remainingCount: number;
} {
  const [dynamicMap, setDynamicMap] = useState<Record<number, DynamicData>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/traders")
      .then((res) => res.json())
      .then((data) => setDynamicMap(data))
      .catch(() => {
        // Redis not configured, use static data
      })
      .finally(() => setLoading(false));
  }, []);

  const merged: TraderWithDynamic[] = traders.map((t) => {
    const dyn = dynamicMap[t.id];
    return {
      ...t,
      deployed: dyn?.deployed ?? t.deployed,
      contractAddress: dyn?.contractAddress || t.contractAddress,
    };
  });

  const deployedCount = merged.filter((t) => t.deployed).length;
  const remainingCount = merged.filter((t) => !t.deployed).length;

  return { traders: merged, loading, deployedCount, remainingCount };
}

