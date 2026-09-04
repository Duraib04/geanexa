// Soil moisture ADC-to-% calibration, persisted locally so it survives offline use.
import { useCallback, useEffect, useState } from "react";

export interface SoilCalibration {
  dryAdc: number;   // raw ADC value in fully dry soil (0%)
  wetAdc: number;   // raw ADC value in fully wet soil (100%)
  adcMax: number;   // sensor resolution ceiling (e.g. 1023 or 4095)
  enabled: boolean; // apply calibration to incoming raw values
}

export const DEFAULT_CALIBRATION: SoilCalibration = {
  dryAdc: 1023,
  wetAdc: 300,
  adcMax: 1023,
  enabled: true,
};

const STORAGE_KEY = "geanexa_soil_calibration";

const listeners = new Set<(c: SoilCalibration) => void>();

export function readCalibration(): SoilCalibration {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CALIBRATION;
    return { ...DEFAULT_CALIBRATION, ...JSON.parse(raw) } as SoilCalibration;
  } catch {
    return DEFAULT_CALIBRATION;
  }
}

/** Convert a raw sensor value to a 0-100 moisture percentage. */
export function applyCalibration(
  raw: number | null | undefined,
  cal: SoilCalibration = readCalibration()
): number | null {
  if (raw == null || Number.isNaN(raw)) return null;
  // Values already expressed as a percentage pass straight through.
  if (raw <= 100 && cal.dryAdc > 100) return Math.round(raw);
  if (!cal.enabled) return Math.round(Math.max(0, Math.min(100, raw)));

  const { dryAdc, wetAdc } = cal;
  if (dryAdc === wetAdc) return null;
  const pct = ((dryAdc - raw) / (dryAdc - wetAdc)) * 100;
  return Math.round(Math.max(0, Math.min(100, pct)));
}

export function useSoilCalibration() {
  const [calibration, setCalibrationState] = useState<SoilCalibration>(readCalibration);

  useEffect(() => {
    const listener = (c: SoilCalibration) => setCalibrationState(c);
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const saveCalibration = useCallback((next: Partial<SoilCalibration>) => {
    const merged = { ...readCalibration(), ...next };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
    listeners.forEach((l) => l(merged));
    return merged;
  }, []);

  const resetCalibration = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_CALIBRATION));
    listeners.forEach((l) => l(DEFAULT_CALIBRATION));
    return DEFAULT_CALIBRATION;
  }, []);

  return { calibration, saveCalibration, resetCalibration };
}
