"use client";

import { traders } from "@/data/traders";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";

interface DynamicData {
  deployed: boolean;
  contractAddress?: string;
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [authenticated, setAuthenticated] = useState(false);
  const [dynamicMap, setDynamicMap] = useState<Record<number, DynamicData>>({});
  const [loading, setLoading] = useState(false);
  const [editingCA, setEditingCA] = useState<Record<number, string>>({});
  const [saving, setSaving] = useState<number | null>(null);
  const [message, setMessage] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const res = await fetch("/api/traders");
      const data = await res.json();
      setDynamicMap(data);
    } catch {
      // Redis not configured - use static data
      const staticMap: Record<number, DynamicData> = {};
      traders.forEach((t) => {
        staticMap[t.id] = {
          deployed: t.deployed,
          contractAddress: t.contractAddress,
        };
      });
      setDynamicMap(staticMap);
    }
  }, []);

  useEffect(() => {
    if (authenticated) {
      fetchData();
    }
  }, [authenticated, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    fetchData();
  };

  const toggleDeployed = async (traderId: number) => {
    const current = dynamicMap[traderId];
    const newDeployed = !current?.deployed;
    const ca = editingCA[traderId] || current?.contractAddress || "";

    setSaving(traderId);
    try {
      const res = await fetch(`/api/traders/${traderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          deployed: newDeployed,
          contractAddress: ca,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
        return;
      }

      setDynamicMap((prev) => ({
        ...prev,
        [traderId]: { deployed: newDeployed, contractAddress: ca },
      }));
      setMessage(`${traders.find((t) => t.id === traderId)?.name} updated!`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const saveCA = async (traderId: number) => {
    const current = dynamicMap[traderId];
    const ca = editingCA[traderId] ?? current?.contractAddress ?? "";

    setSaving(traderId);
    try {
      const res = await fetch(`/api/traders/${traderId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          password,
          deployed: current?.deployed ?? false,
          contractAddress: ca,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
        return;
      }

      setDynamicMap((prev) => ({
        ...prev,
        [traderId]: { ...prev[traderId], contractAddress: ca },
      }));
      setMessage(`CA saved for ${traders.find((t) => t.id === traderId)?.name}!`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Login screen
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <form
          onSubmit={handleLogin}
          className="pixel-border bg-bg-panel p-8 w-full max-w-md space-y-6"
        >
          <h1
            className="text-2xl text-accent-gold font-bold text-center"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            🔒 ADMIN PANEL
          </h1>
          <div>
            <label className="text-text-muted text-xs block mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-card border-2 border-border-main text-white px-4 py-3 text-sm focus:border-accent-gold outline-none"
              placeholder="Enter admin password..."
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="pixel-btn-gold w-full"
            style={{ fontFamily: "var(--font-pixel)" }}
          >
            LOGIN
          </button>
        </form>
      </div>
    );
  }

  // Admin dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a] p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="pixel-border bg-bg-panel p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1
              className="text-2xl text-accent-gold font-bold"
              style={{ fontFamily: "var(--font-pixel)" }}
            >
              ⚡ ADMIN PANEL
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-text-muted text-sm">
                Traders: {traders.length} | Deployed:{" "}
                {
                  Object.values(dynamicMap).filter((d) => d.deployed).length
                }
              </span>
              <button
                onClick={() => {
                  setAuthenticated(false);
                  setPassword("");
                }}
                className="text-red-400 text-sm hover:text-red-300 border border-red-400/30 px-3 py-1"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Status message */}
        {message && (
          <div className="pixel-border-gold bg-accent-gold/10 text-accent-gold p-3 mb-4 text-center text-sm font-bold">
            {message}
          </div>
        )}

        {/* Traders list */}
        <div className="space-y-3">
          {traders.map((trader) => {
            const dyn = dynamicMap[trader.id];
            const isDeployed = dyn?.deployed ?? false;
            const ca = editingCA[trader.id] ?? dyn?.contractAddress ?? "";
            const isSaving = saving === trader.id;

            return (
              <div
                key={trader.id}
                className={`pixel-border bg-bg-panel p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all ${
                  isDeployed ? "border-l-4 border-l-green-500" : ""
                }`}
              >
                {/* Avatar + Info */}
                <div className="flex items-center gap-3 min-w-0 md:w-64">
                  <div className="w-10 h-10 flex-shrink-0 bg-bg-card border-2 border-border-main relative overflow-hidden">
                    {trader.logo ? (
                      <Image
                        src={trader.logo}
                        alt={trader.name}
                        fill
                        className="object-cover"
                        sizes="40px"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-text-muted font-bold">
                        {trader.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-white font-bold text-sm truncate">
                      #{trader.id} {trader.name}
                    </p>
                    <p className="text-text-muted text-xs truncate">
                      {trader.handle}
                    </p>
                  </div>
                </div>

                {/* CA Input */}
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={ca}
                    onChange={(e) =>
                      setEditingCA((prev) => ({
                        ...prev,
                        [trader.id]: e.target.value,
                      }))
                    }
                    className="flex-1 bg-bg-card border-2 border-border-main text-white px-3 py-2 text-xs font-mono focus:border-accent-gold outline-none"
                    placeholder="Contract Address..."
                  />
                  <button
                    onClick={() => saveCA(trader.id)}
                    disabled={isSaving}
                    className="px-3 py-2 bg-bg-card border-2 border-border-main text-accent-gold text-xs font-bold hover:bg-accent-gold/10 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "..." : "SAVE CA"}
                  </button>
                </div>

                {/* Deploy toggle */}
                <button
                  onClick={() => toggleDeployed(trader.id)}
                  disabled={isSaving || loading}
                  className={`px-4 py-2 text-xs font-bold border-2 transition-all whitespace-nowrap ${
                    isDeployed
                      ? "bg-green-500/20 border-green-500 text-green-400 hover:bg-red-500/20 hover:border-red-500 hover:text-red-400"
                      : "bg-bg-card border-border-main text-text-muted hover:bg-green-500/20 hover:border-green-500 hover:text-green-400"
                  }`}
                  style={{ fontFamily: "var(--font-pixel)" }}
                >
                  {isSaving
                    ? "SAVING..."
                    : isDeployed
                    ? "✓ DEPLOYED"
                    : "NOT DEPLOYED"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

