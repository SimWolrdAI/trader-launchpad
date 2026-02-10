"use client";

import { animals, Animal } from "@/data/animals";
import { useEffect, useState } from "react";

interface DynamicData {
  deployed: boolean;
  contractAddress?: string;
}

export interface AnimalWithDynamic extends Animal {
  deployed: boolean;
  contractAddress?: string;
}

export function useAnimals(): {
  animals: AnimalWithDynamic[];
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

  const merged: AnimalWithDynamic[] = animals.map((a) => {
    const dyn = dynamicMap[a.id];
    return {
      ...a,
      deployed: dyn?.deployed ?? a.deployed,
      contractAddress: dyn?.contractAddress || a.contractAddress,
    };
  });

  const deployedCount = merged.filter((a) => a.deployed).length;
  const remainingCount = merged.filter((a) => !a.deployed).length;

  return { animals: merged, loading, deployedCount, remainingCount };
}

