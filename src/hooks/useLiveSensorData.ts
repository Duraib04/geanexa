// Hook to fetch LIVE ESP32 sensor data from the `sensor_readings_v2` table
// in the main Lovable Cloud project. ESP32 posts rows directly via REST.

import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface SmartBloomReading {
  id: string;
  device_id: string | null;
  temperature: number | null;
  humidity: number | null;
  soil_moisture: number | null; // 0–100 %
  css: number | null;
  flow: number | null;
  rain: string | null;          // "YES" | "NO"
  pump: string | null;          // "ON" | "OFF"
  created_at: string;
}

export interface LiveAggregatedData {
  soilMoisture: number;
  temperature: number;
  humidity: number;
  raining: boolean;
  pumpStatus: boolean;
  lastUpdate: string | null;
}

export interface LastValidReading {
  soilMoisture: number | null;
  temperature: number | null;
  humidity: number | null;
  css: number | null;
  flow: number | null;
  rain: string | null;
  pump: string | null;
  createdAt: string | null;
}

export interface LiveChartPoint {
  time: string;
  moisture: number;
  optimal: number;
}

const TABLE = "sensor_readings_v2" as const;

function getLastValidValues(rows: SmartBloomReading[]): LastValidReading {
  const findLast = <T>(
    list: SmartBloomReading[],
    getter: (r: SmartBloomReading) => T | null | undefined,
    isValid: (v: T) => boolean
  ): { value: T; createdAt: string } | null => {
    for (const r of list) {
      const v = getter(r);
      if (v != null && isValid(v)) {
        return { value: v, createdAt: r.created_at };
      }
    }
    return null;
  };

  const soil = findLast(rows, (r) => r.soil_moisture, (v) => typeof v === "number" && v > 0 && v <= 100);
  const temp = findLast(rows, (r) => r.temperature, (v) => typeof v === "number" && v !== 0);
  const hum = findLast(rows, (r) => r.humidity, (v) => typeof v === "number" && v !== 0);
  const css = findLast(rows, (r) => r.css, (v) => typeof v === "number" && v !== 0);
  const flow = findLast(rows, (r) => r.flow, (v) => typeof v === "number" && v !== 0);
  const rain = findLast(rows, (r) => r.rain, (v) => typeof v === "string" && v.trim() !== "");
  const pump = findLast(rows, (r) => r.pump, (v) => typeof v === "string" && v.trim() !== "");

  const timestamps = [soil?.createdAt, temp?.createdAt, hum?.createdAt, css?.createdAt, flow?.createdAt, rain?.createdAt, pump?.createdAt].filter(Boolean) as string[];
  const latestTimestamp = timestamps.length > 0
    ? timestamps.sort((a, b) => new Date(b).getTime() - new Date(a).getTime())[0]
    : null;

  return {
    soilMoisture: soil?.value ?? null,
    temperature: temp?.value ?? null,
    humidity: hum?.value ?? null,
    css: css?.value ?? null,
    flow: flow?.value ?? null,
    rain: rain?.value ?? null,
    pump: pump?.value ?? null,
    createdAt: latestTimestamp,
  };
}

export function useLiveSensorData() {
  const [latestReading, setLatestReading] = useState<SmartBloomReading | null>(null);
  const [readings, setReadings] = useState<SmartBloomReading[]>([]);
  const [lastValidReading, setLastValidReading] = useState<LastValidReading>({
    soilMoisture: null,
    temperature: null,
    humidity: null,
    css: null,
    flow: null,
    rain: null,
    pump: null,
    createdAt: null,
  });
  const [aggregatedData, setAggregatedData] = useState<LiveAggregatedData>({
    soilMoisture: 0,
    temperature: 0,
    humidity: 0,
    raining: false,
    pumpStatus: false,
    lastUpdate: null,
  });
  const [chartData, setChartData] = useState<LiveChartPoint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [realtimeError, setRealtimeError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);

  const mapToAggregated = useCallback((r: SmartBloomReading): LiveAggregatedData => ({
    soilMoisture: Math.round(Math.max(0, Math.min(100, r.soil_moisture ?? 0))),
    temperature: r.temperature ?? 0,
    humidity: r.humidity ?? 0,
    raining: (r.rain ?? "").toUpperCase() === "YES",
    pumpStatus: (r.pump ?? "").toUpperCase() === "ON",
    lastUpdate: r.created_at,
  }), []);

  const buildChartData = useCallback((data: SmartBloomReading[]): LiveChartPoint[] => {
    return [...data].reverse().map((r) => {
      const date = new Date(r.created_at);
      return {
        time: date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        moisture: Math.round(Math.max(0, Math.min(100, r.soil_moisture ?? 0))),
        optimal: 70,
      };
    });
  }, []);

  const fetchReadings = useCallback(async () => {
    try {
      setError(null);
      const { data, error: fetchError } = await (supabase as any)
        .from(TABLE)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (fetchError) {
        console.log(`${TABLE} fetch error:`, fetchError.message);
        setError(fetchError.message);
        setIsConnected(false);
        setIsLoading(false);
        return;
      }

      if (data && data.length > 0) {
        const rows = data as SmartBloomReading[];
        setReadings(rows);
        setLatestReading(rows[0]);
        setAggregatedData(mapToAggregated(rows[0]));
        setLastValidReading(getLastValidValues(rows));
        setChartData(buildChartData(rows.slice(0, 24)));
        setIsConnected(true);
      } else {
        setIsConnected(false);
      }
    } catch (err) {
      console.error(`Error fetching ${TABLE}:`, err);
      setError(err instanceof Error ? err.message : "Failed to fetch live sensor data");
      setIsConnected(false);
    } finally {
      setIsLoading(false);
    }
  }, [mapToAggregated, buildChartData]);

  // Auto-retry with backoff whenever the dashboard can't reach the database
  useEffect(() => {
    if (!error && isConnected) {
      setRetryCount(0);
      return;
    }
    if (!error && !isConnected) return;
    if (retryCount >= 5) return;
    const delay = Math.min(30_000, 2000 * 2 ** retryCount);
    const timer = setTimeout(() => {
      setRetryCount((c) => c + 1);
      fetchReadings();
    }, delay);
    return () => clearTimeout(timer);
  }, [error, isConnected, retryCount, fetchReadings]);

  const retry = useCallback(() => {
    setRetryCount(0);
    setIsLoading(true);
    setRealtimeError(null);
    fetchReadings();
  }, [fetchReadings]);

  useEffect(() => {
    fetchReadings();

    const channel = supabase
      .channel("sensor_readings_v2_live")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: TABLE },
        (payload) => {
          console.log("📡 Live ESP32 data:", payload.new);
          const newReading = payload.new as SmartBloomReading;
          setLatestReading(newReading);
          setAggregatedData(mapToAggregated(newReading));
          setReadings((prev) => {
            const updated = [newReading, ...prev.slice(0, 49)];
            setChartData(buildChartData(updated.slice(0, 24)));
            setLastValidReading(getLastValidValues(updated));
            return updated;
          });
          setIsConnected(true);
        }
      )
      .subscribe((status) => {
        console.log("Realtime status:", status);
        if (status === "SUBSCRIBED") {
          setIsConnected(true);
          setRealtimeError(null);
        } else if (status === "CHANNEL_ERROR" || status === "TIMED_OUT" || status === "CLOSED") {
          setRealtimeError("Live updates disconnected — falling back to periodic refresh.");
        }
      });

    const pollInterval = setInterval(fetchReadings, 30_000);

    return () => {
      supabase.removeChannel(channel);
      clearInterval(pollInterval);
    };
  }, [fetchReadings, mapToAggregated, buildChartData]);

  const togglePump = useCallback(async (on: boolean) => {
    try {
      const { error: insertError } = await (supabase as any)
        .from(TABLE)
        .insert({
          device_id: latestReading?.device_id ?? "esp32-field-01",
          temperature: latestReading?.temperature ?? 0,
          humidity: latestReading?.humidity ?? 0,
          soil_moisture: latestReading?.soil_moisture ?? 0,
          css: latestReading?.css ?? 0,
          flow: latestReading?.flow ?? 0,
          rain: latestReading?.rain ?? "NO",
          pump: on ? "ON" : "OFF",
        });

      if (insertError) throw insertError;
      setAggregatedData((prev) => ({ ...prev, pumpStatus: on }));
    } catch (err) {
      console.error("Error toggling pump:", err);
    }
  }, [latestReading]);

  return {
    latestReading,
    lastValidReading,
    readings,
    aggregatedData,
    chartData,
    isLoading,
    error,
    isConnected,
    realtimeError,
    retryCount,
    retry,
    refetch: fetchReadings,
    togglePump,
  };
}
