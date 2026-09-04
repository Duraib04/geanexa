import { useState, useEffect } from "react";
import { ScanButton } from "@/components/dashboard/ScanButton";
import { ScannerModal } from "@/components/dashboard/ScannerModal";
import { Header } from "@/components/dashboard/Header";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { CircularGauge } from "@/components/dashboard/CircularGauge";
import { WeatherCard } from "@/components/dashboard/WeatherCard";
import { IrrigationControl } from "@/components/dashboard/IrrigationControl";
import { SystemStatus } from "@/components/dashboard/SystemStatus";
import { MoistureChart } from "@/components/dashboard/MoistureChart";
import { ActivityLog } from "@/components/dashboard/ActivityLog";
import { WaterEfficiency } from "@/components/dashboard/WaterEfficiency";
import { VoiceAssistant } from "@/components/dashboard/VoiceAssistant";
import { LocationSelector } from "@/components/dashboard/LocationSelector";
import { CropRecommendations } from "@/components/dashboard/CropRecommendations";
import { AIInsightsPanel } from "@/components/dashboard/AIInsightsPanel";
import { CropEconomicsAnalyzer } from "@/components/dashboard/CropEconomicsAnalyzer";
import { HarvestProfitPredictor } from "@/components/dashboard/HarvestProfitPredictor";
import { CooperativeStoresLocator } from "@/components/dashboard/CooperativeStoresLocator";
import { GovernmentSchemesFinder } from "@/components/dashboard/GovernmentSchemesFinder";
import { IRSScoreCard } from "@/components/dashboard/IRSScoreCard";
import { LiveSensorPanel } from "@/components/dashboard/LiveSensorPanel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useSmartIrrigation } from "@/hooks/useSmartIrrigation";
import { useLiveSensorData } from "@/hooks/useLiveSensorData";
import { useWeather } from "@/hooks/useWeather";
import { useRainAlert } from "@/hooks/useRainAlert";
import { useFarm } from "@/hooks/useFarm";
import { useSensorData } from "@/hooks/useSensorData";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useIrrigationLogs } from "@/hooks/useIrrigationLogs";
import { RainAlertBanner } from "@/components/dashboard/RainAlertBanner";
import { Droplets, Thermometer, Wind, Sprout } from "lucide-react";

const Index = () => {
  const { t } = useLanguage();
  const { weather, location, isLoading: weatherLoading, error: weatherError, refresh: refreshWeather, requestLocation } = useWeather();
  const { checkRainAlert } = useRainAlert();
  
  // Farm and sensor data hooks
  const { farm, farms, isLoading: farmLoading, createFarm, updateFarmLocation, updateSoilType, selectFarm } = useFarm();
  const { aggregatedData: farmSensorData, chartData: farmChartData } = useSensorData(farm?.id || null);
  const { logs: activityLogs } = useActivityLogs(farm?.id || null);
  const { efficiencyData, logIrrigation } = useIrrigationLogs(farm?.id || null);

  // LIVE ESP32 data from smart_bloom_data table
  const {
    latestReading: liveLatestReading,
    lastValidReading: liveLastValidReading,
    readings: liveReadings,
    aggregatedData: liveData,
    chartData: liveChartData,
    isConnected: esp32Connected,
    isLoading: liveLoading,
    error: liveError,
    realtimeError: liveRealtimeError,
    retry: retryLive,
    togglePump,
    refetch: refetchLive,
  } = useLiveSensorData();

  // Prefer live ESP32 data over farm-based sensor_readings
  // Use last valid reading so the screen never shows empty/0 values
  const aggregatedData = liveData.lastUpdate ? {
    soilMoisture: liveLastValidReading.soilMoisture ?? liveData.soilMoisture,
    temperature: liveLastValidReading.temperature ?? liveData.temperature,
    humidity: liveLastValidReading.humidity ?? liveData.humidity,
    phLevel: farmSensorData.phLevel,
    nitrogen: farmSensorData.nitrogen,
    phosphorus: farmSensorData.phosphorus,
    potassium: farmSensorData.potassium,
    waterLevel: farmSensorData.waterLevel,
    pumpStatus: liveData.pumpStatus,
    lastUpdate: liveData.lastUpdate,
  } : farmSensorData;

  const chartData = liveChartData.length > 0 ? liveChartData : farmChartData;

  const [isIrrigating, setIsIrrigating] = useState(false);
  const [irrigationMode, setIrrigationMode] = useState<"auto" | "manual">("auto");
  const [showRainAlert, setShowRainAlert] = useState(true);
  const [isScannerOpen, setIsScannerOpen] = useState(false);

  // Smart Irrigation System (8-step IRS)
  const { decision, handleManualOverride } = useSmartIrrigation({
    farmId: farm?.id || null,
    sensorData: {
      soilMoisture: aggregatedData.soilMoisture,
      temperature: aggregatedData.temperature,
      humidity: aggregatedData.humidity,
      phLevel: aggregatedData.phLevel,
      waterLevel: aggregatedData.waterLevel,
      pumpStatus: aggregatedData.pumpStatus,
    },
    weather: {
      temperature: weather.temperature,
      humidity: weather.humidity,
      rainProbability: liveData.raining ? 100 : weather.rainProbability,
    },
    soilType: farm?.soil_type || null,
    cropType: 'default',
    irrigationMode,
  });

  // Device status based on sensor data
  const devices = [
    { 
      id: "1", 
      name: "Soil Sensor", 
      type: "sensor" as const, 
      status: aggregatedData.soilMoisture > 0 ? "online" as const : "offline" as const, 
      battery: 85, 
      signal: 92, 
      lastUpdate: aggregatedData.lastUpdate ? "Live" : "No data" 
    },
    { 
      id: "2", 
      name: "Weather Station", 
      type: "sensor" as const, 
      status: aggregatedData.temperature > 0 ? "online" as const : "offline" as const, 
      battery: 78, 
      signal: 88, 
      lastUpdate: aggregatedData.lastUpdate ? "Live" : "No data" 
    },
    { 
      id: "3", 
      name: "Water Pump", 
      type: "valve" as const, 
      status: esp32Connected ? "online" as const : "offline" as const, 
      lastUpdate: aggregatedData.pumpStatus ? "Running" : "Standby" 
    },
    { 
      id: "4", 
      name: "ESP32 Controller", 
      type: "controller" as const, 
      status: esp32Connected ? "online" as const : "offline" as const, 
      battery: 100, 
      signal: 95, 
      lastUpdate: esp32Connected ? "Connected" : "Not connected" 
    },
  ];

  // Default chart data when no sensor readings
  const displayChartData = chartData.length > 0 ? chartData : [
    { time: "No data", moisture: 0, optimal: 70 },
  ];

  // Default activity logs when none from DB
  const displayActivityLogs = activityLogs.length > 0 ? activityLogs : [
    { id: "1", type: "system" as const, message: "Waiting for sensor data...", timestamp: "Now" },
  ];

  // Default efficiency data
  const displayEfficiencyData = efficiencyData.currentEfficiency > 0 ? efficiencyData : {
    currentEfficiency: 0,
    waterSaved: 0,
    weeklyData: [
      { day: "Mon", used: 0, saved: 0 },
      { day: "Tue", used: 0, saved: 0 },
      { day: "Wed", used: 0, saved: 0 },
      { day: "Thu", used: 0, saved: 0 },
      { day: "Fri", used: 0, saved: 0 },
      { day: "Sat", used: 0, saved: 0 },
      { day: "Sun", used: 0, saved: 0 },
    ],
  };

  // Check for rain alerts when weather data updates
  useEffect(() => {
    if (weather && location.name && !weatherLoading) {
      checkRainAlert({
        rainProbability: weather.rainProbability,
        locationName: location.name,
      });
    }
  }, [weather, location.name, weatherLoading, checkRainAlert]);

  // Handle irrigation toggle — also sends pump command to ESP32 via Supabase
  const handleIrrigationToggle = async () => {
    const newState = !isIrrigating;
    setIsIrrigating(newState);
    
    // Send pump command to ESP32 through smart_bloom_data
    if (esp32Connected) {
      await togglePump(newState);
    }

    await logIrrigation(
      newState ? "started" : "stopped",
      undefined,
      undefined,
      irrigationMode === "auto" ? "ai" : "manual"
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 lg:px-8 py-6 space-y-6">
        {/* Hero Section with Key Metrics */}
        <section className="animate-fade-in">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-display font-bold">{t.dashboard}</h2>
              <p className="text-muted-foreground">{t.liveMonitoring}</p>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title={t.soilMoisture}
              value={aggregatedData.soilMoisture}
              unit="%"
              icon={Droplets}
              status={aggregatedData.soilMoisture > 60 ? "success" : aggregatedData.soilMoisture > 40 ? "normal" : "warning"}
            />
            <MetricCard
              title={t.temperature}
              value={aggregatedData.temperature}
              unit="°C"
              icon={Thermometer}
              status={aggregatedData.temperature > 35 ? "warning" : "normal"}
            />
            <MetricCard
              title={t.humidity}
              value={aggregatedData.humidity}
              unit="%"
              icon={Wind}
              status="normal"
            />
            <MetricCard
              title={t.cropHealth}
              value={aggregatedData.phLevel || 0}
              unit="pH"
              icon={Sprout}
              status={aggregatedData.phLevel > 6 && aggregatedData.phLevel < 7.5 ? "success" : "normal"}
            />
          </div>
        </section>

        {/* LIVE ESP32 Sensor Data Panel */}
        <section className="animate-fade-in" style={{ animationDelay: "0.045s" }}>
          <LiveSensorPanel
            latestReading={liveLatestReading}
            lastValidReading={liveLastValidReading}
            readings={liveReadings}
            isConnected={esp32Connected}
            isLoading={liveLoading}
            error={liveError}
            realtimeError={liveRealtimeError}
            onRefresh={refetchLive}
            onRetry={retryLive}
          />
        </section>

        {/* Farm Location Selector */}
        <section className="animate-fade-in" style={{ animationDelay: "0.05s" }}>
          <LocationSelector
            farms={farms}
            selectedFarm={farm}
            onSelectFarm={selectFarm}
            onCreateFarm={createFarm}
            onUpdateFarmLocation={updateFarmLocation}
            isLoading={farmLoading}
          />
        </section>

        {/* Crop Recommendations */}
        <section className="animate-fade-in" style={{ animationDelay: "0.06s" }}>
          <CropRecommendations
            farmId={farm?.id || null}
            soilType={farm?.soil_type || null}
            weather={{
              temperature: weather.temperature,
              humidity: weather.humidity,
              rainProbability: weather.rainProbability,
            }}
          />
        </section>

        {/* AI Insights Panel */}
        <section className="animate-fade-in" style={{ animationDelay: "0.07s" }}>
          <AIInsightsPanel
            farmId={farm?.id || null}
            sensorData={{
              soil_moisture: aggregatedData.soilMoisture,
              temperature: aggregatedData.temperature,
              humidity: aggregatedData.humidity,
              ph_level: aggregatedData.phLevel,
              water_level: aggregatedData.waterLevel,
            }}
            weather={{
              temperature: weather.temperature,
              humidity: weather.humidity,
              rainProbability: weather.rainProbability,
            }}
            soilType={farm?.soil_type || null}
          />
        </section>

        {/* IRS Score Card - Intelligent Irrigation Dashboard */}
        <section className="animate-fade-in" style={{ animationDelay: "0.075s" }}>
          <IRSScoreCard
            decision={decision}
          />
        </section>

        {/* Crop Economics & Earnings Prediction */}
        <section className="animate-fade-in" style={{ animationDelay: "0.08s" }}>
          <CropEconomicsAnalyzer />
        </section>

        {/* Harvest Profit Predictor */}
        <section className="animate-fade-in" style={{ animationDelay: "0.085s" }}>
          <HarvestProfitPredictor />
        </section>

        {/* Government Cooperative Stores Locator */}
        <section className="animate-fade-in" style={{ animationDelay: "0.09s" }}>
          <CooperativeStoresLocator />
        </section>

        {/* Government Schemes Finder */}
        <section className="animate-fade-in" style={{ animationDelay: "0.10s" }}>
          <GovernmentSchemesFinder />
        </section>

        {/* Rain Alert Banner */}
        {showRainAlert && weather.rainProbability > 60 && (
          <section className="animate-fade-in">
            <RainAlertBanner
              rainProbability={weather.rainProbability}
              locationName={location.name}
              onDismiss={() => setShowRainAlert(false)}
            />
          </section>
        )}

        {/* Gauges Section */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <div className="bg-card rounded-xl p-4 shadow-md flex flex-col items-center">
            <CircularGauge value={aggregatedData.soilMoisture} max={100} label={t.soilMoisture} variant="primary" />
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md flex flex-col items-center">
            <CircularGauge value={aggregatedData.temperature} max={50} label={t.temperature} unit="°C" variant="warning" />
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md flex flex-col items-center">
            <CircularGauge value={aggregatedData.humidity} max={100} label={t.humidity} variant="accent" />
          </div>
          <div className="bg-card rounded-xl p-4 shadow-md flex flex-col items-center">
            <CircularGauge value={displayEfficiencyData.currentEfficiency} max={100} label={t.efficiency} variant="success" />
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <MoistureChart data={displayChartData} className="animate-fade-in" style={{ animationDelay: "0.2s" } as React.CSSProperties} />
            <WaterEfficiency data={displayEfficiencyData} className="animate-fade-in" style={{ animationDelay: "0.3s" } as React.CSSProperties} />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <IrrigationControl
              isActive={isIrrigating}
              mode={irrigationMode}
              scheduledTime="6:00 AM tomorrow"
              aiRecommendation={{
                shouldIrrigate: decision?.shouldIrrigate ?? (aggregatedData.soilMoisture < 50),
                duration: decision?.recommendedDuration ?? (aggregatedData.soilMoisture < 50 ? 15 : 0),
                reason: decision?.recommendationText 
                  ?? (aggregatedData.soilMoisture < 50 
                    ? "Soil moisture is low. Irrigation recommended."
                    : aggregatedData.soilMoisture > 0 
                      ? "Soil moisture is adequate. No irrigation needed."
                      : "Waiting for sensor data..."),
                confidence: decision?.confidence ?? (aggregatedData.soilMoisture > 0 ? 85 : 0),
              }}
              onToggle={handleIrrigationToggle}
              onModeChange={setIrrigationMode}
              className="animate-slide-in-right"
            />
            <WeatherCard 
              data={weather} 
              location={location.name}
              isLoading={weatherLoading}
              error={weatherError}
              onRefresh={refreshWeather}
              onRequestLocation={requestLocation}
              className="animate-slide-in-right" 
              style={{ animationDelay: "0.1s" } as React.CSSProperties} 
            />
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid lg:grid-cols-2 gap-6">
          <SystemStatus devices={devices} className="animate-fade-in" style={{ animationDelay: "0.4s" } as React.CSSProperties} />
          <ActivityLog entries={displayActivityLogs} className="animate-fade-in" style={{ animationDelay: "0.5s" } as React.CSSProperties} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-8">
        <div className="container px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 {t.appName}. {t.poweredByAI}</p>
            <div className="flex items-center gap-4">
              <span>ESP32 {esp32Connected ? t.connected : farm ? t.connected : "Not connected"}</span>
              <span>&bull;</span>
              <span>Database {t.synced}</span>
              <span>&bull;</span>
              <span>API {t.online}</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Voice Assistant */}
      <VoiceAssistant farmId={farm?.id} />

      {/* Scan Button */}
      <ScanButton onClick={() => setIsScannerOpen(true)} />

      {/* Scanner Modal */}
      <ScannerModal
        isOpen={isScannerOpen}
        onClose={() => setIsScannerOpen(false)}
        farmId={farm?.id}
        soilType={farm?.soil_type}
      />
    </div>
  );
};

export default Index;
