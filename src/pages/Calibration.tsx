import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { ArrowLeft, Gauge, RotateCcw, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useSoilCalibration, applyCalibration } from "@/hooks/useSoilCalibration";
import { useLiveSensorData } from "@/hooks/useLiveSensorData";

const Calibration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { calibration, saveCalibration, resetCalibration } = useSoilCalibration();
  const { latestReading } = useLiveSensorData();

  const [dryAdc, setDryAdc] = useState(String(calibration.dryAdc));
  const [wetAdc, setWetAdc] = useState(String(calibration.wetAdc));
  const [adcMax, setAdcMax] = useState(String(calibration.adcMax));
  const [enabled, setEnabled] = useState(calibration.enabled);
  const [testRaw, setTestRaw] = useState(
    latestReading?.soil_moisture != null ? Math.round(latestReading.soil_moisture) : 600
  );

  const draft = {
    dryAdc: Number(dryAdc) || 0,
    wetAdc: Number(wetAdc) || 0,
    adcMax: Number(adcMax) || 1023,
    enabled,
  };

  const preview = applyCalibration(testRaw, draft);
  const invalid = draft.dryAdc === draft.wetAdc;

  const handleSave = () => {
    if (invalid) {
      toast({
        title: "Invalid calibration",
        description: "Dry and wet ADC values must be different.",
        variant: "destructive",
      });
      return;
    }
    saveCalibration(draft);
    toast({ title: "Calibration saved", description: "Soil moisture readings now use your values." });
  };

  const handleReset = () => {
    const d = resetCalibration();
    setDryAdc(String(d.dryAdc));
    setWetAdc(String(d.wetAdc));
    setAdcMax(String(d.adcMax));
    setEnabled(d.enabled);
    toast({ title: "Calibration reset", description: "Default mapping restored." });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border/50">
        <div className="w-full flex h-16 items-center px-4 lg:px-8">
          <Button variant="ghost" size="icon" onClick={() => navigate("/settings")}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-semibold ml-2">Soil Moisture Calibration</h1>
        </div>
      </header>

      <main className="w-full px-4 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Gauge className="h-5 w-5" />
              ADC to percentage mapping
            </CardTitle>
            <CardDescription>
              Put the probe in fully dry soil and note the raw value, then in water-saturated soil and note that value.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <Label>Apply calibration</Label>
                <p className="text-sm text-muted-foreground">Turn off to use raw values as-is</p>
              </div>
              <Switch checked={enabled} onCheckedChange={setEnabled} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dry">Dry ADC (0%)</Label>
                <Input id="dry" type="number" value={dryAdc} onChange={(e) => setDryAdc(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="wet">Wet ADC (100%)</Label>
                <Input id="wet" type="number" value={wetAdc} onChange={(e) => setWetAdc(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="max">ADC max</Label>
                <Input id="max" type="number" value={adcMax} onChange={(e) => setAdcMax(e.target.value)} />
              </div>
            </div>

            {invalid && (
              <p className="text-sm text-destructive">Dry and wet values must differ.</p>
            )}

            <div className="flex gap-3">
              <Button onClick={handleSave} className="flex-1">
                <Save className="h-4 w-4 mr-2" /> Save calibration
              </Button>
              <Button variant="outline" onClick={handleReset}>
                <RotateCcw className="h-4 w-4 mr-2" /> Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Live preview</CardTitle>
            <CardDescription>
              Latest raw reading from your device:{" "}
              {latestReading?.soil_moisture != null ? Math.round(latestReading.soil_moisture) : "--"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Test raw value</Label>
              <span className="text-sm font-medium">{testRaw}</span>
            </div>
            <Slider
              value={[testRaw]}
              onValueChange={(v) => setTestRaw(v[0])}
              min={0}
              max={draft.adcMax || 1023}
              step={1}
            />
            <div className="rounded-xl bg-primary/10 p-6 text-center">
              <p className="text-4xl font-bold text-primary">{preview != null ? `${preview}%` : "--"}</p>
              <p className="text-sm text-muted-foreground mt-1">Mapped soil moisture</p>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default Calibration;
