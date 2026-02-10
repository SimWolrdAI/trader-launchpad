"use client";

import { animals } from "@/data/animals";
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
      const staticMap: Record<number, DynamicData> = {};
      animals.forEach((a) => {
        staticMap[a.id] = {
          deployed: a.deployed,
          contractAddress: a.contractAddress,
        };
      });
      setDynamicMap(staticMap);
    }
  }, []);

  useEffect(() => {
    if (authenticated) fetchData();
  }, [authenticated, fetchData]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthenticated(true);
    fetchData();
  };

  const toggleDeployed = async (id: number) => {
    const current = dynamicMap[id];
    const newDeployed = !current?.deployed;
    const ca = editingCA[id] || current?.contractAddress || "";

    setSaving(id);
    try {
      const res = await fetch(`/api/traders/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, deployed: newDeployed, contractAddress: ca }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
        return;
      }
      setDynamicMap((prev) => ({ ...prev, [id]: { deployed: newDeployed, contractAddress: ca } }));
      setMessage(`${animals.find((a) => a.id === id)?.name} updated!`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const saveCA = async (id: number) => {
    const current = dynamicMap[id];
    const ca = editingCA[id] ?? current?.contractAddress ?? "";

    setSaving(id);
    try {
      const res = await fetch(`/api/traders/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, deployed: current?.deployed ?? false, contractAddress: ca }),
      });
      if (!res.ok) {
        const data = await res.json();
        setMessage(`Error: ${data.error}`);
        return;
      }
      setDynamicMap((prev) => ({ ...prev, [id]: { ...prev[id], contractAddress: ca } }));
      setMessage(`CA saved for ${animals.find((a) => a.id === id)?.name}!`);
    } catch (err) {
      setMessage(`Error: ${String(err)}`);
    } finally {
      setSaving(null);
      setTimeout(() => setMessage(""), 3000);
    }
  };

  // Login
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-bg-main flex items-center justify-center p-4">
        <form onSubmit={handleLogin} className="zoo-panel p-8 w-full max-w-md space-y-6">
          <h1
            className="text-2xl text-accent-gold text-center"
            style={{ fontFamily: "var(--font-display)" }}
          >
            🔒 Zookeeper Panel
          </h1>
          <div>
            <label className="text-text-muted text-xs block mb-2 tracking-wider uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-bg-card border border-border-main rounded-xl text-text-primary px-4 py-3 text-sm focus:border-accent-gold outline-none transition-colors"
              placeholder="Enter password..."
              autoFocus
            />
          </div>
          <button type="submit" className="btn-primary w-full" style={{ fontFamily: "var(--font-display)" }}>
            Enter
          </button>
        </form>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-bg-main p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="zoo-panel p-6 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <h1 className="text-2xl text-accent-gold" style={{ fontFamily: "var(--font-display)" }}>
              🦁 Zookeeper Panel
            </h1>
            <div className="flex items-center gap-4">
              <span className="text-text-secondary text-sm">
                Species: {animals.length} · Deployed: {Object.values(dynamicMap).filter((d) => d.deployed).length}
              </span>
              <button
                onClick={() => { setAuthenticated(false); setPassword(""); }}
                className="text-accent-red text-sm hover:text-red-300 border border-accent-red/30 px-3 py-1 rounded-lg transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {message && (
          <div className="zoo-panel border-accent-gold/30 bg-accent-gold/5 text-accent-gold p-3 mb-4 text-center text-sm font-medium rounded-xl">
            {message}
          </div>
        )}

        <div className="space-y-3">
          {animals.map((animal) => {
            const dyn = dynamicMap[animal.id];
            const isDeployed = dyn?.deployed ?? false;
            const ca = editingCA[animal.id] ?? dyn?.contractAddress ?? "";
            const isSaving = saving === animal.id;

            return (
              <div
                key={animal.id}
                className={`zoo-panel p-4 flex flex-col md:flex-row md:items-center gap-4 transition-all ${isDeployed ? "border-l-4 border-l-accent-green" : ""}`}
              >
                <div className="flex items-center gap-3 min-w-0 md:w-64">
                  <div className="w-10 h-10 flex-shrink-0 rounded-xl border border-border-main overflow-hidden relative">
                    <img src={animal.image} alt={animal.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-text-primary font-semibold text-sm truncate">#{animal.id} {animal.name}</p>
                    <p className="text-text-muted text-xs truncate">{animal.symbol}</p>
                  </div>
                </div>

                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={ca}
                    onChange={(e) => setEditingCA((prev) => ({ ...prev, [animal.id]: e.target.value }))}
                    className="flex-1 bg-bg-card border border-border-main rounded-lg text-text-primary px-3 py-2 text-xs font-mono focus:border-accent-gold outline-none transition-colors"
                    placeholder="Contract Address..."
                  />
                  <button
                    onClick={() => saveCA(animal.id)}
                    disabled={isSaving}
                    className="px-3 py-2 bg-bg-card border border-border-main rounded-lg text-accent-gold text-xs font-semibold hover:bg-accent-gold/10 transition-colors disabled:opacity-50"
                  >
                    {isSaving ? "..." : "Save"}
                  </button>
                </div>

                <button
                  onClick={() => toggleDeployed(animal.id)}
                  disabled={isSaving || loading}
                  className={`px-4 py-2 text-xs font-semibold border rounded-lg transition-all whitespace-nowrap tracking-wide ${
                    isDeployed
                      ? "bg-accent-green/15 border-accent-green/40 text-accent-green-light hover:bg-accent-red/15 hover:border-accent-red/40 hover:text-accent-red"
                      : "bg-bg-card border-border-main text-text-muted hover:bg-accent-green/15 hover:border-accent-green/40 hover:text-accent-green-light"
                  }`}
                >
                  {isSaving ? "Saving..." : isDeployed ? "✓ Deployed" : "Not Deployed"}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
