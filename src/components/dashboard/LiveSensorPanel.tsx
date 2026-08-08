// Real-time ESP32 sensor data panel — reads directly from sensor_readings_v2 in Supabase

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/contexts/LanguageContext";
import { SmartBloomReading, LastValidReading } from "@/hooks/useLiveSensorData";
import {
  Thermometer,
  Droplets,
  CloudRain,
  Power,
  Wifi,
  WifiOff,
  RefreshCw,
  Leaf,
} from "lucide-react";

interface LiveSensorPanelProps {
  latestReading: SmartBloomReading | null;
  lastValidReading: LastValidReading;
  readings: SmartBloomReading[];
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  onRefresh: () => void;
}

export function LiveSensorPanel({
  latestReading,
  lastValidReading,
  readings,
  isConnected,
  isLoading,
  error,
  onRefresh,
}: LiveSensorPanelProps) {
  const { t } = useLanguage();

  const formatTime = (ts: string) => {
    const d = new Date(ts);
    return d.toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  const timeSince = (ts: string) => {
    const diffSec = Math.floor((Date.now() - new Date(ts).getTime()) / 1000);
    if (diffSec < 60) return `${diffSec}s ago`;
    if (diffSec < 3600) return `${Math.floor(diffSec / 60)}m ago`;
    return `${Math.floor(diffSec / 3600)}h ago`;
  };

  // Map raw soil integer to a moisture percentage for display
  const soilPercent = (raw: number | null) => {
    if (raw === null) return null;
    if (raw <= 100) return raw;
    return Math.round(((1023 - raw) / 1023) * 100);
  };

  const displayTemperature =
    (latestReading?.temperature && latestReading.temperature !== 0)
      ? latestReading.temperature
      : lastValidReading.temperature;

  const displayHumidity =
    (latestReading?.humidity && latestReading.humidity !== 0)
      ? latestReading.humidity
      : lastValidReading.humidity;

  const displaySoilMoisture =
    (latestReading?.soil_moisture && latestReading.soil_moisture !== 0)
      ? soilPercent(latestReading.soil_moisture)
      : soilPercent(lastValidReading.soilMoisture);

  const hasAnyValidValue =
    displayTemperature != null ||
    displayHumidity != null ||
    displaySoilMoisture != null ||
    lastValidReading.rain != null ||
    lastValidReading.pump != null;

  return (
    <Card className="border-2 border-primary/30 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Leaf className="h-5 w-5 text-green-500" />
            Live ESP32 Sensor Data
          </CardTitle>
          <div className="flex items-center gap-2">
            <button
              onClick={onRefresh}
              className="p-1.5 rounded-md hover:bg-muted transition-colors"
              title="Refresh"
            >
              <RefreshCw className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`} />
            </button>
            <Badge
              variant={isConnected ? "default" : "destructive"}
              className="flex items-center gap-1"
            >
              {isConnected ? (
                <>
                  <Wifi className="h-3 w-3" /> Connected
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" /> Disconnected
                </>
              )}
            </Badge>
          </div>
        </div>
        {latestReading && (
          <p className="text-xs text-muted-foreground mt-1">
            Last update: {formatTime(latestReading.created_at)} ({timeSince(latestReading.created_at)})
          </p>
        )}
      </CardHeader>

      <CardContent className="space-y-4">
        {error && (
          <div className="bg-destructive/10 text-destructive text-sm rounded-md px-3 py-2">
            {error}
          </div>
        )}

        {/* ---------- Live Values Grid ---------- */}
        {hasAnyValidValue ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {/* Temperature */}
              <div className={`rounded-xl p-4 text-center ${displayTemperature != null ? "bg-orange-50 dark:bg-orange-950/30" : "bg-muted/30"}`}>
                <Thermometer className={`h-6 w-6 mx-auto mb-1 ${displayTemperature != null ? "text-orange-500" : "text-muted-foreground/40"}`} />
                <p className={`text-2xl font-bold ${displayTemperature != null ? "text-orange-600 dark:text-orange-400" : "text-muted-foreground"}`}>
                  {displayTemperature != null ? displayTemperature.toFixed(1) : "--"}
                  <span className="text-sm font-normal ml-0.5">°C</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Temperature</p>
              </div>

              {/* Humidity */}
              <div className={`rounded-xl p-4 text-center ${displayHumidity != null ? "bg-blue-50 dark:bg-blue-950/30" : "bg-muted/30"}`}>
                <Droplets className={`h-6 w-6 mx-auto mb-1 ${displayHumidity != null ? "text-blue-500" : "text-muted-foreground/40"}`} />
                <p className={`text-2xl font-bold ${displayHumidity != null ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}>
                  {displayHumidity != null ? displayHumidity.toFixed(1) : "--"}
                  <span className="text-sm font-normal ml-0.5">%</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Humidity</p>
              </div>

              {/* Soil Moisture */}
              <div className={`rounded-xl p-4 text-center ${displaySoilMoisture != null ? "bg-green-50 dark:bg-green-950/30" : "bg-muted/30"}`}>
                <Leaf className={`h-6 w-6 mx-auto mb-1 ${displaySoilMoisture != null ? "text-green-500" : "text-muted-foreground/40"}`} />
                <p className={`text-2xl font-bold ${displaySoilMoisture != null ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                  {displaySoilMoisture != null ? displaySoilMoisture : "--"}
                  <span className="text-sm font-normal ml-0.5">%</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">Soil Moisture</p>
              </div>

              {/* Rain + Pump */}
              <div className="rounded-xl p-4 text-center flex flex-col justify-center gap-2 bg-gray-50 dark:bg-gray-900/30">
                <div className="flex items-center justify-center gap-1.5">
                  <CloudRain
                    className={`h-5 w-5 ${(latestReading?.rain ?? lastValidReading.rain ?? "").toUpperCase() === "YES" ? "text-blue-500" : "text-muted-foreground/40"}`}
                  />
                  <span className={`text-sm font-semibold ${(latestReading?.rain ?? lastValidReading.rain ?? "").toUpperCase() === "YES" ? "text-blue-600 dark:text-blue-400" : "text-muted-foreground"}`}>
                    {(latestReading?.rain ?? lastValidReading.rain ?? "").toUpperCase() === "YES" ? "Raining" : "No Rain"}
                  </span>
                </div>
                <div className="flex items-center justify-center gap-1.5">
                  <Power
                    className={`h-5 w-5 ${(latestReading?.pump ?? lastValidReading.pump ?? "").toUpperCase() === "ON" ? "text-green-500" : "text-muted-foreground/40"}`}
                  />
                  <span className={`text-sm font-semibold ${(latestReading?.pump ?? lastValidReading.pump ?? "").toUpperCase() === "ON" ? "text-green-600 dark:text-green-400" : "text-muted-foreground"}`}>
                    Pump {(latestReading?.pump ?? lastValidReading.pump ?? "").toUpperCase() === "ON" ? "ON" : "OFF"}
                  </span>
                </div>
              </div>
            </div>

            {/* ---------- Recent Readings Table ---------- */}
            {readings.length > 1 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium mb-2 text-muted-foreground">
                  Recent Readings ({Math.min(readings.length, 10)} of {readings.length})
                </h4>
                <div className="overflow-x-auto rounded-lg border">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="bg-muted/50">
                        <th className="text-left px-3 py-2 font-medium">Time</th>
                        <th className="text-right px-3 py-2 font-medium">Temp °C</th>
                        <th className="text-right px-3 py-2 font-medium">Humidity %</th>
                        <th className="text-right px-3 py-2 font-medium">Soil %</th>
                        <th className="text-center px-3 py-2 font-medium">Rain</th>
                        <th className="text-center px-3 py-2 font-medium">Pump</th>
                      </tr>
                    </thead>
                    <tbody>
                      {readings.slice(0, 10).map((r, i) => (
                        <tr
                          key={r.id}
                          className={`border-t ${i === 0 ? "bg-primary/5 font-semibold" : ""}`}
                        >
                          <td className="px-3 py-1.5">
                            {formatTime(r.created_at)}
                          </td>
                          <td className="text-right px-3 py-1.5">
                            {r.temperature?.toFixed(1) ?? "--"}
                          </td>
                          <td className="text-right px-3 py-1.5">
                            {r.humidity?.toFixed(1) ?? "--"}
                          </td>
                          <td className="text-right px-3 py-1.5">
                            {r.soil_moisture !== null ? soilPercent(r.soil_moisture) : "--"}
                          </td>
                          <td className="text-center px-3 py-1.5">
                            {(r.rain ?? "").toUpperCase() === "YES" ? (
                              <span className="text-blue-500">Yes</span>
                            ) : (
                              <span className="text-muted-foreground">No</span>
                            )}
                          </td>
                          <td className="text-center px-3 py-1.5">
                            {(r.pump ?? "").toUpperCase() === "ON" ? (
                              <span className="text-green-500">ON</span>
                            ) : (
                              <span className="text-muted-foreground">OFF</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </>
        ) : isLoading ? (
          <div className="flex items-center justify-center py-8">
            <RefreshCw className="h-6 w-6 animate-spin text-muted-foreground mr-2" />
            <span className="text-muted-foreground">Loading sensor data...</span>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <WifiOff className="h-8 w-8 mx-auto mb-2 opacity-40" />
            <p>No valid sensor data found.</p>
            <p className="text-xs mt-1">Make sure your ESP32 is publishing rows to Supabase.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
