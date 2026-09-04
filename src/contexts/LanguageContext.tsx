import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'ta' | 'tanglish' | 'hi';

interface Translations {
  // Header
  appName: string;
  smartIrrigation: string;
  systemOnline: string;
  lastSync: string;
  minAgo: string;
  
  // Dashboard
  // Settings
  language: string;
  settings: string;
  
  dashboard: string;
  liveMonitoring: string;
  
  // Metrics
  soilMoisture: string;
  temperature: string;
  humidity: string;
  cropHealth: string;
  waterSaved: string;
  efficiency: string;
  vsLastHour: string;
  
  // Weather
  weather: string;
  rainChance: string;
  wind: string;
  today: string;
  locationNeeded: string;
  allowLocation: string;
  farmLocation: string;
  detectingLocation: string;
  locationError: string;
  unknownLocation: string;
  yourArea: string;
  rainAlert: string;
  
  // Irrigation
  waterControl: string;
  autoMode: string;
  manualMode: string;
  startWatering: string;
  stopWatering: string;
  active: string;
  idle: string;
  nextScheduled: string;
  
  // AI Recommendation
  aiSuggestion: string;
  confidence: string;
  suggestedTime: string;
  
  // System Status
  deviceStatus: string;
  online: string;
  offline: string;
  devicesOnline: string;
  allGood: string;
  needsAttention: string;
  battery: string;
  signal: string;
  lastUpdated: string;
  sensor: string;
  valve: string;
  controller: string;
  
  // Activity Log
  recentActivity: string;
  wateringDone: string;
  
  // Charts
  moistureTrend: string;
  last24Hours: string;
  actualMoisture: string;
  goodLevel: string;
  weeklyWater: string;
  waterUsed: string;
  
  // Voice Assistant
  askQuestion: string;
  voiceAssistant: string;
  tapToSpeak: string;
  listening: string;
  thinking: string;
  speakNow: string;
  
  // Footer
  poweredByAI: string;
  connected: string;
  synced: string;
  
  // Common
  minutes: string;
  liters: string;
  thisWeek: string;

  // Auth
  welcome: string;
  signInDescription: string;
  signIn: string;
  signUp: string;
  email: string;
  password: string;
  confirmPassword: string;
  createAccount: string;
  checkEmail: string;
  welcomeBack: string;
  accountCreated: string;
  invalidEmail: string;
  passwordMin: string;
  passwordMismatch: string;
  alreadyRegistered: string;
  verifyEmail: string;
  invalidCredentials: string;

  // Settings page
  account: string;
  manageAccount: string;
  signedIn: string;
  signOut: string;
  notifications: string;
  configureNotifications: string;
  enableNotifications: string;
  notificationDescription: string;
  rainThreshold: string;
  thresholdDescription: string;
  preferences: string;
  temperatureUnit: string;
  celsius: string;
  fahrenheit: string;
  settingsUpdated: string;
  languageUpdated: string;

  // Install page
  installApp: string;
  appInstalled: string;
  appInstalledDesc: string;
  installDescription: string;
  installNow: string;
  installOnIos: string;
  installOnAndroid: string;
  benefits: string;
  quickAccess: string;
  worksOffline: string;
  nativeExperience: string;
  fasterLoading: string;
  goToDashboard: string;
  openInBrowser: string;
  tapShare: string;
  tapAddHome: string;
  tapAdd: string;
  tapMenu: string;
  tapInstall: string;

  // Location/Farm
  addFarm: string;
  editLocation: string;
  updateLocation: string;
  farmName: string;
  address: string;
  latitude: string;
  longitude: string;
  soilType: string;
  detectLocation: string;
  noFarmsAdded: string;
  farmDialogDesc: string;
  searchAddress: string;
  selectSoilType: string;
  soilTypeHelp: string;
  enterCoords: string;

  // Soil Types
  claySoil: string;
  sandySoil: string;
  loamySoil: string;
  siltSoil: string;
  peatSoil: string;
  chalkySoil: string;
  blackSoil: string;
  redSoil: string;
  alluvialSoil: string;

  // Crop Recommendations
  cropRecommendations: string;
  basedOnSoil: string;
  suitable: string;
  noRecommendations: string;
  getRecommendations: string;
  failedRecommendations: string;
  setSoilType: string;
  retry: string;

  // AI Insights
  aiInsights: string;
  irrigationAdvice: string;
  healthAnalysis: string;
  confidenceScore: string;
  analyzingData: string;
  noDataYet: string;
  refreshAnalysis: string;
  factors: string;
  recommendation: string;
  optimal: string;
  warning: string;
  critical: string;

  // Government Schemes
  governmentSchemes: string;
  governmentSchemesFinder: string;
  discoverSchemes: string;
  schemeEligibility: string;
  howToApply: string;
  requiredDocuments: string;
  helpline: string;
  applyOnline: string;
  selectState: string;
  filterByCategory: string;
  foundSchemes: string;
  noSchemesFound: string;

  // Subsidy Schemes
  subsidySchemes: string;
  pmKisan: string;
  rythuBharosa: string;
  dbt: string;
  pmksy: string;

  // Insurance Schemes
  insuranceSchemes: string;
  pmFasalBima: string;
  weatherBasedInsurance: string;

  // Cooperative Stores
  cooperativeStores: string;
  cooperativeStoresLocator: string;
  nearbyStores: string;
  searchRadius: string;
  storeType: string;
  distance: string;
  manager: string;
  contact: string;
  phone: string;
  openingHours: string;
  weekdays: string;
  weekend: string;
  availableProducts: string;
  subsidies: string;
  getDirections: string;
  callStore: string;
  noStoresFound: string;

  // Eligibility
  landHolding: string;
  annualIncome: string;
  age: string;
  eligibilityDetails: string;

  // Application Steps
  step: string;
  applicationProcess: string;
  documents: string;
  website: string;

  // Filter Options
  all: string;
  subsidy: string;
  loan: string;
  insurance: string;
  infrastructure: string;
  training: string;
  marketing: string;

  // IRS - Irrigation Risk Score (Step 3)
  irsScore: string;
  riskLevelSafe: string;
  riskLevelWarning: string;
  riskLevelCritical: string;
  factorBreakdown: string;
  soilDryness: string;
  tempStress: string;
  humidityStress: string;
  cropSensitivity: string;
  weatherFactor: string;
  sensorAnomaly: string;
  sensorFault: string;
  decisionReasoning: string;
  recommendedTime: string;
  hardwareStatus: string;
  ledStatus: string;
  buzzerStatus: string;
  monitorConditions: string;
  irrigationNeeded: string;
  noIrrigationNeeded: string;
  rainDelayActive: string;
  manualOverrideActive: string;
  safetyBlockActive: string;
  learningInsights: string;
  overrideRate: string;
  avgIrsScore: string;
  systemLearning: string;

  // Crop Economics
  cropEconomics: string;
  costBreakdownDetails: string;
  selectCrop: string;
  landSize: string;
  analyzeEconomics: string;
  totalInvestment: string;
  projectedEarnings: string;
  profitMargin: string;
  roi: string;
  investmentViability: string;
  viableCrop: string;
  notViable: string;
  timelineToHarvest: string;
  daysToMaturity: string;
  seedToHarvest: string;
  months: string;
  bestPlantingTime: string;
  marketOutlook: string;
  currentPrice: string;
  perUnit: string;
  expectedYield: string;
  quintals: string;
  revenuePerAcre: string;
  costBreakdown: string;
  seedCost: string;
  fertiliserCost: string;
  labourCost: string;
  waterManagement: string;
  pestControl: string;
  totalCost: string;
  economicsSummary: string;
  willNeed: string;
  expectedIncome: string;
  profitAfterCosts: string;
  timeTillHarvest: string;
  invalidInput: string;
  failedAnalysis: string;

  // Scan Feature
  scanCrop: string;
  takePhoto: string;
  uploadPhoto: string;
  analyzing: string;
  scanResult: string;
  identified: string;
  noIssuesFound: string;
  recommendations: string;
  scanAgain: string;
  pestDetection: string;
  diseaseAnalysis: string;
  soilAnalysis: string;

  // Harvest Profit Predictor
  harvestPredictor: string;
  harvestPredictorDesc: string;
  predictProfit: string;
  sellNowRec: string;
  holdRec: string;
  waitPeakRec: string;
  sellNowReason: string;
  holdReason: string;
  waitPeakReason: string;
  extraProfit: string;
  currentMarketPrice: string;
  marketPrice: string;
  sellNowValue: string;
  peakPrice: string;
  priceChange12m: string;
  priceTrend: string;
  seasonalDemand: string;
  currentMonth: string;
  bestSellMonth: string;
  holdingCosts: string;
  storageCost: string;
  spoilageLoss: string;
  waitMonths: string;
  profitComparison: string;
  sellAtPeak: string;
  netGain: string;
  perishableWarning: string;

  // Offline & Sync
  pendingSync: string;
  offlineMode: string;
  dataWillSync: string;

  // Live Market Prices
  livePrices: string;
  fetchingPrices: string;
  mandiPrices: string;
  priceforecast: string;
  topMandis: string;
  weekChange: string;
  monthChange: string;
  refreshPrices: string;
  lastFetched: string;
  marketSummary: string;
}

const translations: Record<Language, Translations> = {
  en: {
    appName: 'GeaNexa',
    smartIrrigation: 'Smart Farming',
    systemOnline: 'System Working',
    lastSync: 'Last checked',
    minAgo: 'min ago',
    
    language: 'Language',
    settings: 'Settings',
    
    dashboard: 'My Farm',
    liveMonitoring: 'Live farm updates',
    
    soilMoisture: 'Soil Wetness',
    temperature: 'Heat Level',
    humidity: 'Air Moisture',
    cropHealth: 'Crop Health',
    waterSaved: 'Water Saved',
    efficiency: 'How Good',
    vsLastHour: 'vs last hour',
    
    weather: 'Weather Today',
    rainChance: 'Rain Chance',
    wind: 'Wind',
    today: 'Today',
    locationNeeded: 'Location access needed for weather',
    allowLocation: 'Allow Location',
    farmLocation: 'Your Farm Location',
    detectingLocation: 'Finding your location...',
    locationError: 'Could not find location',
    unknownLocation: 'Location not set',
    yourArea: 'your area',
    rainAlert: 'Rain Alert!',
    
    waterControl: 'Water Control',
    autoMode: 'Auto',
    manualMode: 'By Hand',
    startWatering: 'Start Watering',
    stopWatering: 'Stop Watering',
    active: 'Watering Now',
    idle: 'Not Watering',
    nextScheduled: 'Next watering at',
    
    aiSuggestion: 'Smart Advice',
    confidence: 'sure',
    suggestedTime: 'Water for',
    
    deviceStatus: 'Device Health',
    online: 'Working',
    offline: 'Not Working',
    devicesOnline: 'devices working',
    allGood: 'All Good!',
    needsAttention: 'Check This',
    battery: 'Battery',
    signal: 'Signal',
    lastUpdated: 'Updated',
    sensor: 'Sensor',
    valve: 'Valve',
    controller: 'Controller',
    
    recentActivity: 'Recent Events',
    wateringDone: 'Watering done',
    
    moistureTrend: 'Soil Wetness Over Time',
    last24Hours: 'Last 24 hours',
    actualMoisture: 'Current Level',
    goodLevel: 'Good Level',
    weeklyWater: 'Weekly Water Use',
    waterUsed: 'Water Used',
    
    askQuestion: 'Ask me anything about your farm...',
    voiceAssistant: 'Farm Helper',
    tapToSpeak: 'Tap to speak',
    listening: 'Listening...',
    thinking: 'Thinking...',
    speakNow: 'Speak now',
    
    poweredByAI: 'Smart Farming Made Easy',
    connected: 'Connected',
    synced: 'Synced',
    
    minutes: 'min',
    liters: 'L',
    thisWeek: 'this week',

    // Auth
    welcome: 'Welcome',
    signInDescription: 'Sign in to your account or create a new one',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Create Account',
    checkEmail: 'Check your email',
    welcomeBack: 'Welcome back!',
    accountCreated: 'Your account has been created successfully.',
    invalidEmail: 'Please enter a valid email address',
    passwordMin: 'Password must be at least 6 characters',
    passwordMismatch: 'Passwords do not match',
    alreadyRegistered: 'This email is already registered. Please sign in instead.',
    verifyEmail: 'Please verify your email address before signing in.',
    invalidCredentials: 'Invalid email or password. Please try again.',

    // Settings
    account: 'Account',
    manageAccount: 'Manage your account settings',
    signedIn: 'Signed in',
    signOut: 'Sign Out',
    notifications: 'Notifications',
    configureNotifications: 'Configure notification preferences',
    enableNotifications: 'Enable Notifications',
    notificationDescription: 'Receive alerts for rain, irrigation, and system events',
    rainThreshold: 'Rain Alert Threshold',
    thresholdDescription: 'Get notified when rain probability exceeds this threshold',
    preferences: 'Preferences',
    temperatureUnit: 'Temperature Unit',
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    settingsUpdated: 'Settings updated',
    languageUpdated: 'Language preference saved',

    // Install
    installApp: 'Install App',
    appInstalled: 'App Already Installed!',
    appInstalledDesc: 'GeaNexa is already installed on your device. Look for it on your home screen.',
    installDescription: 'Install the app on your device for quick access, offline support, and a native experience.',
    installNow: 'Install Now',
    installOnIos: 'Install on iOS',
    installOnAndroid: 'Install on Android',
    benefits: 'Benefits',
    quickAccess: 'Quick access from your home screen',
    worksOffline: 'Works offline - view your farm data anytime',
    nativeExperience: 'Native app experience - no browser bars',
    fasterLoading: 'Faster loading times',
    goToDashboard: 'Go to Dashboard',
    openInBrowser: 'Open this page in Chrome or Safari on your mobile device to install the app.',
    tapShare: 'Tap the Share button in Safari',
    tapAddHome: 'Scroll down and tap "Add to Home Screen"',
    tapAdd: 'Tap "Add" to confirm',
    tapMenu: 'Tap the menu button in Chrome',
    tapInstall: 'Tap "Add to Home screen" or "Install app"',

    // Farm/Location
    addFarm: 'Add Farm',
    editLocation: 'Edit Location',
    updateLocation: 'Update Location',
    farmName: 'Farm Name',
    address: 'Address',
    latitude: 'Latitude',
    longitude: 'Longitude',
    soilType: 'Soil Type',
    detectLocation: 'Detect My Location (GPS)',
    noFarmsAdded: 'No farms added yet',
    farmDialogDesc: 'Enter farm details or use GPS to detect your location automatically.',
    searchAddress: 'Enter village, town or address',
    selectSoilType: 'Select soil type',
    soilTypeHelp: 'Select your soil type for better crop recommendations',
    enterCoords: 'Please enter or detect location coordinates',

    // Soil Types
    claySoil: 'Clay Soil',
    sandySoil: 'Sandy Soil',
    loamySoil: 'Loamy Soil',
    siltSoil: 'Silt Soil',
    peatSoil: 'Peat Soil',
    chalkySoil: 'Chalky Soil',
    blackSoil: 'Black Soil (Regur)',
    redSoil: 'Red Soil',
    alluvialSoil: 'Alluvial Soil',

    // Crop Recommendations
    cropRecommendations: 'Crop Recommendations',
    basedOnSoil: 'Based on',
    suitable: 'suitable',
    noRecommendations: 'No recommendations available',
    getRecommendations: 'Get Recommendations',
    failedRecommendations: 'Failed to get recommendations',
    setSoilType: 'Set your soil type to get crop recommendations',
    retry: 'Retry',

    // AI Insights
    aiInsights: 'AI Insights',
    irrigationAdvice: 'Irrigation Advice',
    healthAnalysis: 'Health Analysis',
    confidenceScore: 'Confidence',
    analyzingData: 'Analyzing your farm data...',
    noDataYet: 'Connect sensors to get AI insights',
    refreshAnalysis: 'Refresh Analysis',
    factors: 'Factors Considered',
    recommendation: 'Recommendation',
    optimal: 'Optimal',
    warning: 'Warning',
    critical: 'Critical',

    // Government Schemes
    governmentSchemes: 'Government Schemes',
    governmentSchemesFinder: 'Government Agricultural Schemes',
    discoverSchemes: 'Discover and apply for government schemes',
    schemeEligibility: 'Eligibility',
    howToApply: 'How to Apply',
    requiredDocuments: 'Required Documents',
    helpline: 'Helpline',
    applyOnline: 'Apply Online',
    selectState: 'Select State',
    filterByCategory: 'Filter by Category',
    foundSchemes: 'Found',
    noSchemesFound: 'No schemes found',

    // Subsidy Schemes
    subsidySchemes: 'Subsidy Schemes',
    pmKisan: 'PM-KISAN',
    rythuBharosa: 'Rythu Bharosa',
    dbt: 'Direct Benefit Transfer',
    pmksy: 'PM Krishi Sinchayee Yojana',

    // Insurance Schemes
    insuranceSchemes: 'Insurance Schemes',
    pmFasalBima: 'PM Fasal Bima',
    weatherBasedInsurance: 'Weather-based Insurance',

    // Cooperative Stores
    cooperativeStores: 'Cooperative Stores',
    cooperativeStoresLocator: 'Cooperative Stores Locator',
    nearbyStores: 'Nearby Stores',
    searchRadius: 'Search Radius',
    storeType: 'Store Type',
    distance: 'Distance',
    manager: 'Manager',
    contact: 'Contact',
    phone: 'Phone',
    openingHours: 'Opening Hours',
    weekdays: 'Weekdays',
    weekend: 'Weekend',
    availableProducts: 'Available Products',
    subsidies: 'Subsidies',
    getDirections: 'Get Directions',
    callStore: 'Call Store',
    noStoresFound: 'No stores found',

    // Eligibility
    landHolding: 'Land Holding',
    annualIncome: 'Annual Income',
    age: 'Age',
    eligibilityDetails: 'Eligibility Details',

    // Application Steps
    step: 'Step',
    applicationProcess: 'Application Process',
    documents: 'Documents',
    website: 'Website',

    // Filter Options
    all: 'All',
    subsidy: 'Subsidy',
    loan: 'Loan',
    insurance: 'Insurance',
    infrastructure: 'Infrastructure',
    training: 'Training',
    marketing: 'Marketing',

    // IRS
    irsScore: 'Irrigation Risk Score',
    riskLevelSafe: 'Safe',
    riskLevelWarning: 'Warning',
    riskLevelCritical: 'Critical',
    factorBreakdown: 'Factor Analysis',
    soilDryness: 'Soil Dryness',
    tempStress: 'Temp Stress',
    humidityStress: 'Humidity Stress',
    cropSensitivity: 'Crop Sensitivity',
    weatherFactor: 'Rain Factor',
    sensorAnomaly: 'Sensor reading unstable',
    sensorFault: 'Sensor fault detected',
    decisionReasoning: 'Why this decision?',
    recommendedTime: 'Best time',
    hardwareStatus: 'Hardware Status',
    ledStatus: 'LED Status',
    buzzerStatus: 'Buzzer Status',
    monitorConditions: 'Monitor conditions',
    irrigationNeeded: 'Irrigation needed',
    noIrrigationNeeded: 'No irrigation needed',
    rainDelayActive: 'Rain expected — irrigation delayed',
    manualOverrideActive: 'Manual override active',
    safetyBlockActive: 'Safety block — check sensors',
    learningInsights: 'Learning Insights',
    overrideRate: 'Override Rate',
    avgIrsScore: 'Avg IRS Score',
    systemLearning: 'System learning from your decisions',

    // Crop Economics
    cropEconomics: 'Crop Economics',
    costBreakdownDetails: 'Cost breakdown and profit analysis',
    selectCrop: 'Select Crop',
    landSize: 'Land Size (acres)',
    analyzeEconomics: 'Analyze Economics',
    totalInvestment: 'Total Investment',
    projectedEarnings: 'Projected Earnings',
    profitMargin: 'Profit Margin',
    roi: 'ROI',
    investmentViability: 'Investment Viability',
    viableCrop: 'Viable Crop',
    notViable: 'Not Viable',
    timelineToHarvest: 'Timeline to Harvest',
    daysToMaturity: 'Days to Maturity',
    seedToHarvest: 'Seed to Harvest',
    months: 'months',
    bestPlantingTime: 'Best Planting Time',
    marketOutlook: 'Market Outlook',
    currentPrice: 'Current Price',
    perUnit: 'per quintal',
    expectedYield: 'Expected Yield',
    quintals: 'quintals',
    revenuePerAcre: 'Revenue per Acre',
    costBreakdown: 'Cost Breakdown',
    seedCost: 'Seed Cost',
    fertiliserCost: 'Fertiliser Cost',
    labourCost: 'Labour Cost',
    waterManagement: 'Water Management',
    pestControl: 'Pest Control',
    totalCost: 'Total Cost',
    economicsSummary: 'Economics Summary',
    willNeed: 'You will need',
    expectedIncome: 'Expected income',
    profitAfterCosts: 'Profit after costs',
    timeTillHarvest: 'Time till harvest',
    invalidInput: 'Please select a crop and enter land size',
    failedAnalysis: 'Failed to analyze economics',
    scanCrop: 'Scan Crop',
    takePhoto: 'Take Photo',
    uploadPhoto: 'Upload Photo',
    analyzing: 'Analyzing...',
    scanResult: 'Scan Result',
    identified: 'Identified',
    noIssuesFound: 'No Issues Found',
    recommendations: 'Recommendations',
    scanAgain: 'Scan Again',
    pestDetection: 'Pest Detection',
    diseaseAnalysis: 'Disease Analysis',
    soilAnalysis: 'Soil Analysis',
    harvestPredictor: 'Harvest Profit Predictor',
    harvestPredictorDesc: 'Find the best time to sell your crops for maximum profit',
    predictProfit: 'Predict Profit',
    sellNowRec: '🟢 Sell Now!',
    holdRec: '🟡 Hold & Monitor',
    waitPeakRec: '🔵 Wait for Peak',
    sellNowReason: 'Current prices are good and holding costs outweigh potential gains.',
    holdReason: 'Prices may improve. Best expected month:',
    waitPeakReason: 'Prices are expected to peak in',
    extraProfit: 'Extra profit',
    currentMarketPrice: 'Current Price',
    marketPrice: 'Market Price',
    sellNowValue: 'Sell Now Value',
    peakPrice: 'Peak Price',
    priceChange12m: '12-Month Change',
    priceTrend: 'Price Trend (12 Months)',
    seasonalDemand: 'Seasonal Demand Calendar',
    currentMonth: 'Current Month',
    bestSellMonth: 'Best Sell Month',
    holdingCosts: 'Holding Costs',
    storageCost: 'Storage Cost',
    spoilageLoss: 'Spoilage Loss',
    waitMonths: 'Months to Wait',
    profitComparison: 'Profit Comparison',
    sellAtPeak: 'Sell at Peak (net)',
    netGain: 'Net Gain from Waiting',
    perishableWarning: '⚠️ This crop is highly perishable. Storage losses are significant — sell quickly if possible.',
    pendingSync: 'pending sync',
    offlineMode: 'Offline mode',
    dataWillSync: 'Data will sync when online',
    livePrices: 'Live Market Prices',
    fetchingPrices: 'Fetching live prices...',
    mandiPrices: 'Mandi Prices',
    priceforecast: 'Forecast',
    topMandis: 'Top Mandis',
    weekChange: 'Week change',
    monthChange: 'Month change',
    refreshPrices: 'Refresh Prices',
    lastFetched: 'Last fetched',
    marketSummary: 'Market Summary',
  },
  ta: {
    appName: 'GeaNexa',
    smartIrrigation: 'ஸ்மார்ட் நீர்ப்பாசனம்',
    systemOnline: 'சிஸ்டம் வேலை செய்கிறது',
    lastSync: 'கடைசி செக்',
    minAgo: 'நிமிடம் முன்',
    
    language: 'மொழி',
    settings: 'அமைப்புகள்',
    
    dashboard: 'என் தோட்டம்',
    liveMonitoring: 'நேரடி தகவல்கள்',
    
    soilMoisture: 'மண் ஈரப்பதம்',
    temperature: 'வெப்பநிலை',
    humidity: 'காற்று ஈரப்பதம்',
    cropHealth: 'பயிர் ஆரோக்கியம்',
    waterSaved: 'சேமித்த தண்ணீர்',
    efficiency: 'எவ்வளவு நல்லது',
    vsLastHour: 'கடந்த மணி நேரத்தை விட',
    
    weather: 'இன்றைய வானிலை',
    rainChance: 'மழை வாய்ப்பு',
    wind: 'காற்று',
    today: 'இன்று',
    locationNeeded: 'வானிலைக்கு இடம் தேவை',
    allowLocation: 'இடம் அனுமதி',
    farmLocation: 'உங்கள் தோட்ட இடம்',
    detectingLocation: 'இடம் கண்டுபிடிக்கிறது...',
    locationError: 'இடம் கிடைக்கவில்லை',
    unknownLocation: 'இடம் தெரியவில்லை',
    yourArea: 'உங்கள் பகுதி',
    rainAlert: 'மழை எச்சரிக்கை!',
    
    waterControl: 'தண்ணீர் கட்டுப்பாடு',
    autoMode: 'ஆட்டோ',
    manualMode: 'கைமுறை',
    startWatering: 'நீர் பாய்ச்சு',
    stopWatering: 'நிறுத்து',
    active: 'நீர் பாய்கிறது',
    idle: 'நிறுத்தி உள்ளது',
    nextScheduled: 'அடுத்த நீர்ப்பாசனம்',
    
    aiSuggestion: 'AI ஆலோசனை',
    confidence: 'நம்பிக்கை',
    suggestedTime: 'தண்ணீர் விட',
    
    deviceStatus: 'கருவி நிலை',
    online: 'வேலை செய்கிறது',
    offline: 'நிறுத்தி உள்ளது',
    devicesOnline: 'கருவிகள் வேலை செய்கின்றன',
    allGood: 'எல்லாம் நல்லது!',
    needsAttention: 'பாருங்க',
    battery: 'பேட்டரி',
    signal: 'சிக்னல்',
    lastUpdated: 'புதுப்பிக்கப்பட்டது',
    sensor: 'சென்சார்',
    valve: 'வால்வு',
    controller: 'கண்ட்ரோலர்',
    
    recentActivity: 'சமீபத்திய நிகழ்வுகள்',
    wateringDone: 'நீர்ப்பாசனம் முடிந்தது',
    
    moistureTrend: 'மண் ஈரப்பதம் நேரப்படி',
    last24Hours: 'கடந்த 24 மணி நேரம்',
    actualMoisture: 'தற்போதைய நிலை',
    goodLevel: 'நல்ல நிலை',
    weeklyWater: 'வாராந்திர தண்ணீர் பயன்பாடு',
    waterUsed: 'பயன்படுத்திய தண்ணீர்',
    
    askQuestion: 'உங்கள் தோட்டம் பற்றி கேளுங்கள்...',
    voiceAssistant: 'தோட்ட உதவியாளர்',
    tapToSpeak: 'பேச தட்டுங்கள்',
    listening: 'கேட்கிறேன்...',
    thinking: 'யோசிக்கிறேன்...',
    speakNow: 'இப்போது பேசுங்கள்',
    
    poweredByAI: 'ஸ்மார்ட் விவசாயம் எளிதாக',
    connected: 'இணைக்கப்பட்டது',
    synced: 'ஒத்திசைக்கப்பட்டது',
    
    minutes: 'நிமிடம்',
    liters: 'லிட்டர்',
    thisWeek: 'இந்த வாரம்',

    // Auth
    welcome: 'வரவேற்கிறோம்',
    signInDescription: 'உங்கள் கணக்கில் உள்நுழையவும் அல்லது புதிய கணக்கு உருவாக்கவும்',
    signIn: 'உள்நுழை',
    signUp: 'பதிவு செய்',
    email: 'மின்னஞ்சல்',
    password: 'கடவுச்சொல்',
    confirmPassword: 'கடவுச்சொல் உறுதிப்படுத்து',
    createAccount: 'கணக்கு உருவாக்கு',
    checkEmail: 'உங்கள் மின்னஞ்சலை சரிபாருங்கள்',
    welcomeBack: 'மீண்டும் வரவேற்கிறோம்!',
    accountCreated: 'உங்கள் கணக்கு வெற்றிகரமாக உருவாக்கப்பட்டது.',
    invalidEmail: 'சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்',
    passwordMin: 'கடவுச்சொல் குறைந்தது 6 எழுத்துகள் இருக்க வேண்டும்',
    passwordMismatch: 'கடவுச்சொற்கள் பொருந்தவில்லை',
    alreadyRegistered: 'இந்த மின்னஞ்சல் ஏற்கனவே பதிவு செய்யப்பட்டுள்ளது. உள்நுழையவும்.',
    verifyEmail: 'உள்நுழைவதற்கு முன் உங்கள் மின்னஞ்சலை சரிபாருங்கள்.',
    invalidCredentials: 'தவறான மின்னஞ்சல் அல்லது கடவுச்சொல். மீண்டும் முயற்சிக்கவும்.',

    // Settings
    account: 'கணக்கு',
    manageAccount: 'உங்கள் கணக்கு அமைப்புகளை நிர்வகிக்கவும்',
    signedIn: 'உள்நுழைந்துள்ளீர்கள்',
    signOut: 'வெளியேறு',
    notifications: 'அறிவிப்புகள்',
    configureNotifications: 'அறிவிப்பு விருப்பங்களை கட்டமைக்கவும்',
    enableNotifications: 'அறிவிப்புகளை இயக்கு',
    notificationDescription: 'மழை, நீர்ப்பாசனம் மற்றும் சிஸ்டம் நிகழ்வுகளுக்கு எச்சரிக்கைகள் பெறுங்கள்',
    rainThreshold: 'மழை எச்சரிக்கை அளவு',
    thresholdDescription: 'மழை வாய்ப்பு இந்த அளவை தாண்டும்போது அறிவிப்பு பெறுங்கள்',
    preferences: 'விருப்பங்கள்',
    temperatureUnit: 'வெப்பநிலை அலகு',
    celsius: 'செல்சியஸ்',
    fahrenheit: 'ஃபாரன்ஹீட்',
    settingsUpdated: 'அமைப்புகள் புதுப்பிக்கப்பட்டன',
    languageUpdated: 'மொழி விருப்பம் சேமிக்கப்பட்டது',

    // Install
    installApp: 'ஆப்பை நிறுவு',
    appInstalled: 'ஆப் ஏற்கனவே நிறுவப்பட்டுள்ளது!',
    appInstalledDesc: 'GeaNexa உங்கள் சாதனத்தில் ஏற்கனவே நிறுவப்பட்டுள்ளது. முகப்பு திரையில் பாருங்கள்.',
    installDescription: 'விரைவான அணுகல், ஆஃப்லைன் ஆதரவு மற்றும் நேட்டிவ் அனுபவத்திற்கு ஆப்பை நிறுவுங்கள்.',
    installNow: 'இப்போது நிறுவு',
    installOnIos: 'iOS-ல் நிறுவு',
    installOnAndroid: 'Android-ல் நிறுவு',
    benefits: 'நன்மைகள்',
    quickAccess: 'முகப்பு திரையிலிருந்து விரைவான அணுகல்',
    worksOffline: 'ஆஃப்லைனில் வேலை செய்யும் - எப்போது வேண்டுமானாலும் பாருங்கள்',
    nativeExperience: 'நேட்டிவ் ஆப் அனுபவம் - பிரவுசர் பார்கள் இல்லை',
    fasterLoading: 'வேகமான ஏற்றுதல்',
    goToDashboard: 'டாஷ்போர்டுக்கு செல்',
    openInBrowser: 'ஆப்பை நிறுவ Chrome அல்லது Safari-ல் திறக்கவும்.',
    tapShare: 'Safari-ல் Share பட்டனை அழுத்துங்கள்',
    tapAddHome: 'கீழே ஸ்க்ரோல் செய்து "Add to Home Screen" அழுத்துங்கள்',
    tapAdd: '"Add" அழுத்தி உறுதிப்படுத்துங்கள்',
    tapMenu: 'Chrome-ல் மெனு பட்டனை அழுத்துங்கள்',
    tapInstall: '"Add to Home screen" அல்லது "Install app" அழுத்துங்கள்',

    // Farm/Location
    addFarm: 'தோட்டம் சேர்',
    editLocation: 'இடம் திருத்து',
    updateLocation: 'இடம் புதுப்பி',
    farmName: 'தோட்ட பெயர்',
    address: 'முகவரி',
    latitude: 'அட்சரேகை',
    longitude: 'தீர்க்கரேகை',
    soilType: 'மண் வகை',
    detectLocation: 'எனது இடம் கண்டுபிடி (GPS)',
    noFarmsAdded: 'தோட்டங்கள் இன்னும் சேர்க்கப்படவில்லை',
    farmDialogDesc: 'தோட்ட விவரங்களை உள்ளிடவும் அல்லது GPS பயன்படுத்தி கண்டுபிடிக்கவும்.',
    searchAddress: 'கிராமம், நகரம் அல்லது முகவரி உள்ளிடவும்',
    selectSoilType: 'மண் வகையை தேர்ந்தெடுக்கவும்',
    soilTypeHelp: 'சிறந்த பயிர் பரிந்துரைகளுக்கு மண் வகையை தேர்ந்தெடுக்கவும்',
    enterCoords: 'இடம் ஆயங்களை உள்ளிடவும் அல்லது கண்டுபிடிக்கவும்',

    // Soil Types
    claySoil: 'களிமண்',
    sandySoil: 'மணல் மண்',
    loamySoil: 'வண்டல் மண்',
    siltSoil: 'சேறு மண்',
    peatSoil: 'தொழு மண்',
    chalkySoil: 'சுண்ணாம்பு மண்',
    blackSoil: 'கருப்பு மண் (ரேகூர்)',
    redSoil: 'செம்மண்',
    alluvialSoil: 'வண்டல் மண்',

    // Crop Recommendations
    cropRecommendations: 'பயிர் பரிந்துரைகள்',
    basedOnSoil: 'அடிப்படையில்',
    suitable: 'பொருத்தமானது',
    noRecommendations: 'பரிந்துரைகள் இல்லை',
    getRecommendations: 'பரிந்துரைகள் பெறு',
    failedRecommendations: 'பரிந்துரைகள் பெற முடியவில்லை',
    setSoilType: 'பயிர் பரிந்துரைகளுக்கு மண் வகையை அமைக்கவும்',
    retry: 'மீண்டும் முயற்சி',

    // AI Insights
    aiInsights: 'AI நுண்ணறிவுகள்',
    irrigationAdvice: 'நீர்ப்பாசன ஆலோசனை',
    healthAnalysis: 'ஆரோக்கிய பகுப்பாய்வு',
    confidenceScore: 'நம்பிக்கை',
    analyzingData: 'உங்கள் தோட்ட தரவை பகுப்பாய்வு செய்கிறது...',
    noDataYet: 'AI நுண்ணறிவுகளுக்கு சென்சார்களை இணைக்கவும்',
    refreshAnalysis: 'பகுப்பாய்வை புதுப்பி',
    factors: 'கருத்தில் கொள்ளப்பட்ட காரணிகள்',
    recommendation: 'பரிந்துரை',
    optimal: 'சிறந்தது',
    warning: 'எச்சரிக்கை',
    critical: 'முக்கியமானது',

    // Government Schemes
    governmentSchemes: 'அரசு திட்டங்கள்',
    governmentSchemesFinder: 'அரசு வேளாண் திட்டங்கள்',
    discoverSchemes: 'அரசு திட்டங்களைக் கண்டறியு மற்றும் விண்ணப்பி',
    schemeEligibility: 'தகுதி',
    howToApply: 'எப்படி விண்ணப்பிக்க வேண்டும்',
    requiredDocuments: 'தேவையான ஆவணங்கள்',
    helpline: 'உதவி இணை',
    applyOnline: 'ஆன்லைনில் விண்ணப்பி',
    selectState: 'மாநிலத்தைத் தேர்ந்தெடு',
    filterByCategory: 'வகையினால் வடிகட்ட',
    foundSchemes: 'கண்டுபிடிக்கப்பட்டது',
    noSchemesFound: 'திட்டங்கள் கிடைக்கவில்லை',

    // Subsidy Schemes
    subsidySchemes: 'மானிய திட்டங்கள்',
    pmKisan: 'பி.எம். கிசான்',
    rythuBharosa: 'ரைதூ பரோசா',
    dbt: 'நேரடி நன்மைகள் பரிமாற்றம்',
    pmksy: 'பி.எம். கிருஷி சிஞ்சயே யோஜனா',

    // Insurance Schemes
    insuranceSchemes: 'இன்சொரன்ஸ் திட்டங்கள்',
    pmFasalBima: 'பி.எம் பசல் பீமா',
    weatherBasedInsurance: 'வானிலை அடிப்படையிலான பீமா',

    // Cooperative Stores
    cooperativeStores: 'கூட்டுறவு கடைகள்',
    cooperativeStoresLocator: 'கூட்டுறவு கடைகள் இருப்பிடவி',
    nearbyStores: 'அقریbovely கடைகள்',
    searchRadius: 'தேடல் வட்டம்',
    storeType: 'கடை வகை',
    distance: 'தூரம்',
    manager: 'மேலாளர்',
    contact: 'தொடர்பு',
    phone: 'தொலைபேசி',
    openingHours: 'திறக்கும் நேரம்',
    weekdays: 'வாரக்கிழமைகள்',
    weekend: 'வாரவிடுமுறை',
    availableProducts: 'उपलब्ध उत्पाद',
    subsidies: 'மானியங்கள்',
    getDirections: 'திசைவழி பெறு',
    callStore: 'கடையை அழையு',
    noStoresFound: 'கடைகள் கிடைக்கவில்லை',

    // Eligibility
    landHolding: 'நிலம் அளவு',
    annualIncome: 'வருடாந்திர வருமானம்',
    age: 'வயது',
    eligibilityDetails: 'தகுதி விவரங்கள்',

    // Application Steps
    step: 'படி',
    applicationProcess: 'விண்ணப்ப செயல்முறை',
    documents: 'ஆவணங்கள்',
    website: 'இணையதளம்',

    // Filter Options
    all: 'அனைத்து',
    subsidy: 'மானியம்',
    loan: 'கடன்',
    insurance: 'பீமா',
    infrastructure: 'உள்கட்டமைப்பு',
    training: 'பயிற்சி',
    marketing: 'சந்தைப்படுத்தல்',

    // IRS
    irsScore: 'நீர்ப்பாசன ஆபத்து மதிப்பெண்',
    riskLevelSafe: 'பாதுகாப்பானது',
    riskLevelWarning: 'எச்சரிக்கை',
    riskLevelCritical: 'அவசரம்',
    factorBreakdown: 'காரணி பகுப்பாய்வு',
    soilDryness: 'மண் வறட்சி',
    tempStress: 'வெப்ப அழுத்தம்',
    humidityStress: 'ஈரப்பத அழுத்தம்',
    cropSensitivity: 'பயிர் உணர்திறன்',
    weatherFactor: 'மழை காரணி',
    sensorAnomaly: 'சென்சார் படிப்பு நிலையற்றது',
    sensorFault: 'சென்சார் பிழை கண்டறியப்பட்டது',
    decisionReasoning: 'ஏன் இந்த முடிவு?',
    recommendedTime: 'சிறந்த நேரம்',
    hardwareStatus: 'ஹார்ட்வேர் நிலை',
    ledStatus: 'LED நிலை',
    buzzerStatus: 'பஸர் நிலை',
    monitorConditions: 'நிலைமைகளை கண்காணிக்கவும்',
    irrigationNeeded: 'நீர்ப்பாசனம் தேவை',
    noIrrigationNeeded: 'நீர்ப்பாசனம் தேவையில்லை',
    rainDelayActive: 'மழை எதிர்பார்க்கப்படுகிறது - நீர்ப்பாசனம் தாமதமானது',
    manualOverrideActive: 'கைமுறை மேலெழுதல் செயலில்',
    safetyBlockActive: 'பாதுகாப்பு தடை - சென்சார்களை சரிபாருங்கள்',
    learningInsights: 'கற்றல் நுண்ணறிவுகள்',
    overrideRate: 'மேலெழுதல் விகிதம்',
    avgIrsScore: 'சராசரி IRS மதிப்பெண்',
    systemLearning: 'உங்கள் முடிவுகளிலிருந்து கணினி கற்றுக்கொள்கிறது',

    // Crop Economics
    cropEconomics: 'பயிர் பொருளாதாரம்',
    costBreakdownDetails: 'செலவு பிரிப்பு மற்றும் லாப பகுப்பாய்வு',
    selectCrop: 'பயிரை தேர்ந்தெடுக்கவும்',
    landSize: 'நிலம் அளவு (ஏக்கர்)',
    analyzeEconomics: 'பொருளாதாரத்தை பகுப்பாய்வு செய்',
    totalInvestment: 'மொத்த முதலீடு',
    projectedEarnings: 'எதிர்பார்க்கப்படும் வருமானம்',
    profitMargin: 'லாப விகிதம்',
    roi: 'ROI',
    investmentViability: 'முதலீட்டு நம்பகத்தன்மை',
    viableCrop: 'சாத்தியமான பயிர்',
    notViable: 'சாத்தியமில்லை',
    timelineToHarvest: 'அறுவடைக்கான காலவரிசை',
    daysToMaturity: 'முதிர்ச்சிக்கான நாட்கள்',
    seedToHarvest: 'விதை முதல் அறுவடை',
    months: 'மாதங்கள்',
    bestPlantingTime: 'சிறந்த நடவு நேரம்',
    marketOutlook: 'சந்தை கண்ணோட்டம்',
    currentPrice: 'தற்போதைய விலை',
    perUnit: 'குவிண்டால் ஒன்றுக்கு',
    expectedYield: 'எதிர்பார்க்கப்படும் விளைச்சல்',
    quintals: 'குவிண்டால்கள்',
    revenuePerAcre: 'ஏக்கருக்கான வருமானம்',
    costBreakdown: 'செலவு பிரிப்பு',
    seedCost: 'விதை செலவு',
    fertiliserCost: 'உரம் செலவு',
    labourCost: 'கூலி செலவு',
    waterManagement: 'நீர் மேலாண்மை',
    pestControl: 'பூச்சி கட்டுப்பாடு',
    totalCost: 'மொத்த செலவு',
    economicsSummary: 'பொருளாதார சுருக்கம்',
    willNeed: 'உங்களுக்கு தேவை',
    expectedIncome: 'எதிர்பார்க்கப்படும் வருமானம்',
    profitAfterCosts: 'செலவுகளுக்குப் பிறகு லாபம்',
    timeTillHarvest: 'அறுவடை வரை நேரம்',
    invalidInput: 'பயிரைத் தேர்ந்தெடுத்து நிலம் அளவை உள்ளிடவும்',
    failedAnalysis: 'பொருளாதாரத்தை பகுப்பாய்வு செய்ய முடியவில்லை',
    scanCrop: 'பயிரை ஸ்கேன் செய்',
    takePhoto: 'புகைப்படம் எடு',
    uploadPhoto: 'புகைப்படம் பதிவேற்று',
    analyzing: 'பகுப்பாய்வு செய்கிறது...',
    scanResult: 'ஸ்கேன் முடிவு',
    identified: 'கண்டறியப்பட்டது',
    noIssuesFound: 'பிரச்சனை இல்லை',
    recommendations: 'பரிந்துரைகள்',
    scanAgain: 'மீண்டும் ஸ்கேன் செய்',
    pestDetection: 'பூச்சி கண்டறிதல்',
    diseaseAnalysis: 'நோய் பகுப்பாய்வு',
    soilAnalysis: 'மண் பகுப்பாய்வு',
    harvestPredictor: 'அறுவடை லாப கணிப்பான்',
    harvestPredictorDesc: 'அதிக லாபத்திற்கு விற்க சிறந்த நேரத்தை கண்டறியுங்கள்',
    predictProfit: 'லாபம் கணிக்க',
    sellNowRec: '🟢 இப்போதே விற்கவும்!',
    holdRec: '🟡 வைத்திருங்கள்',
    waitPeakRec: '🔵 உச்ச விலைக்கு காத்திருங்கள்',
    sellNowReason: 'தற்போதைய விலை நல்லது, சேமிப்பு செலவு அதிகம்.',
    holdReason: 'விலை உயரலாம். சிறந்த மாதம்:',
    waitPeakReason: 'விலை உச்சம் அடையும் மாதம்',
    extraProfit: 'கூடுதல் லாபம்',
    currentMarketPrice: 'தற்போதைய விலை',
    marketPrice: 'சந்தை விலை',
    sellNowValue: 'இப்போது விற்றால்',
    peakPrice: 'உச்ச விலை',
    priceChange12m: '12 மாத மாற்றம்',
    priceTrend: 'விலை போக்கு (12 மாதங்கள்)',
    seasonalDemand: 'பருவகால தேவை நாட்காட்டி',
    currentMonth: 'நடப்பு மாதம்',
    bestSellMonth: 'சிறந்த விற்பனை மாதம்',
    holdingCosts: 'சேமிப்பு செலவுகள்',
    storageCost: 'கிடங்கு செலவு',
    spoilageLoss: 'கெட்டுப்போகும் இழப்பு',
    waitMonths: 'காத்திருக்கும் மாதங்கள்',
    profitComparison: 'லாப ஒப்பீடு',
    sellAtPeak: 'உச்சத்தில் விற்றால் (நிகர)',
    netGain: 'காத்திருப்பதால் நிகர லாபம்',
    perishableWarning: '⚠️ இது விரைவில் கெட்டுப்போகும் பயிர். சேமிப்பு இழப்பு அதிகம் — விரைவில் விற்கவும்.',
    pendingSync: 'ஒத்திசைக்க உள்ளது',
    offlineMode: 'ஆஃப்லைன் பயன்முறை',
    dataWillSync: 'இணையம் வந்ததும் ஒத்திசைக்கப்படும்',
    livePrices: 'நேரடி சந்தை விலை',
    fetchingPrices: 'விலைகளை பெறுகிறது...',
    mandiPrices: 'மண்டி விலைகள்',
    priceforecast: 'முன்கணிப்பு',
    topMandis: 'சிறந்த மண்டிகள்',
    weekChange: 'வார மாற்றம்',
    monthChange: 'மாத மாற்றம்',
    refreshPrices: 'விலை புதுப்பிக்க',
    lastFetched: 'கடைசி புதுப்பிப்பு',
    marketSummary: 'சந்தை சுருக்கம்',
  },
  tanglish: {
    appName: 'GeaNexa',
    smartIrrigation: 'Smart Thanneer Paasanam',
    systemOnline: 'System Velai Seiyudhu',
    lastSync: 'Last check',
    minAgo: 'nimisham munnadhi',
    
    language: 'Mozhi',
    settings: 'Settings',
    
    dashboard: 'En Thotam',
    liveMonitoring: 'Live thakavalkal',
    
    soilMoisture: 'Mann Eerappatham',
    temperature: 'Veppanilai',
    humidity: 'Kaatru Eerappatham',
    cropHealth: 'Payir Health',
    waterSaved: 'Save Aana Thanneer',
    efficiency: 'Evvalavu Nalladu',
    vsLastHour: 'vs kadantha hour',
    
    weather: 'Innaiku Weather',
    rainChance: 'Mazhai Vaippu',
    wind: 'Kaatru',
    today: 'Innaiku',
    locationNeeded: 'Weather ku location venum',
    allowLocation: 'Location Allow Pannunga',
    farmLocation: 'Unga Thotam Location',
    detectingLocation: 'Location kandupidikiranga...',
    locationError: 'Location kidaikala',
    unknownLocation: 'Location theriyala',
    yourArea: 'unga area',
    rainAlert: 'Mazhai Alert!',
    
    waterControl: 'Thanneer Control',
    autoMode: 'Auto',
    manualMode: 'Manual',
    startWatering: 'Thanneer Vidu',
    stopWatering: 'Niruthu',
    active: 'Thanneer Pogudhu',
    idle: 'Niruthiyiruku',
    nextScheduled: 'Aduthadhu',
    
    aiSuggestion: 'AI Yosanai',
    confidence: 'sure',
    suggestedTime: 'Thanneer vida',
    
    deviceStatus: 'Device Status',
    online: 'Velai Seiyudhu',
    offline: 'Velai Seiyala',
    devicesOnline: 'devices velai seiyudhu',
    allGood: 'Ellam Nalla Iruku!',
    needsAttention: 'Parunga',
    battery: 'Battery',
    signal: 'Signal',
    lastUpdated: 'Updated',
    sensor: 'Sensor',
    valve: 'Valve',
    controller: 'Controller',
    
    recentActivity: 'Recent Events',
    wateringDone: 'Watering mudinjichu',
    
    moistureTrend: 'Mann Eerappatham Over Time',
    last24Hours: 'Kadantha 24 hours',
    actualMoisture: 'Ippo Level',
    goodLevel: 'Nalla Level',
    weeklyWater: 'Weekly Thanneer Use',
    waterUsed: 'Use Aana Thanneer',
    
    askQuestion: 'Unga thotam pathi ketkalaam...',
    voiceAssistant: 'Thotam Helper',
    tapToSpeak: 'Pesa tap pannunga',
    listening: 'Kekkuren...',
    thinking: 'Yosikkuren...',
    speakNow: 'Ippo pesunga',
    
    poweredByAI: 'Smart Vivasayam Easy-a',
    connected: 'Connected',
    synced: 'Synced',
    
    minutes: 'min',
    liters: 'L',
    thisWeek: 'inda week',

    // Auth
    welcome: 'Welcome',
    signInDescription: 'Unga account-la sign in pannunga illa pudhu account create pannunga',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    createAccount: 'Account Create Pannu',
    checkEmail: 'Unga email check pannunga',
    welcomeBack: 'Welcome back!',
    accountCreated: 'Unga account successfully create aayiduchu.',
    invalidEmail: 'Valid email address enter pannunga',
    passwordMin: 'Password minimum 6 characters irukanum',
    passwordMismatch: 'Passwords match aagala',
    alreadyRegistered: 'Indha email already registered. Please sign in pannunga.',
    verifyEmail: 'Sign in panna munnadhi email verify pannunga.',
    invalidCredentials: 'Wrong email or password. Try again pannunga.',

    // Settings
    account: 'Account',
    manageAccount: 'Unga account settings manage pannunga',
    signedIn: 'Signed in',
    signOut: 'Sign Out',
    notifications: 'Notifications',
    configureNotifications: 'Notification preferences set pannunga',
    enableNotifications: 'Notifications Enable Pannu',
    notificationDescription: 'Mazhai, watering, system events ku alerts varum',
    rainThreshold: 'Mazhai Alert Threshold',
    thresholdDescription: 'Mazhai chance indha level thandi notify pannும்',
    preferences: 'Preferences',
    temperatureUnit: 'Temperature Unit',
    celsius: 'Celsius',
    fahrenheit: 'Fahrenheit',
    settingsUpdated: 'Settings updated',
    languageUpdated: 'Language preference saved',

    // Install
    installApp: 'App Install Pannu',
    appInstalled: 'App Already Installed!',
    appInstalledDesc: 'GeaNexa unga device-la already install aayiduchu. Home screen-la parunga.',
    installDescription: 'Quick access, offline support, native experience ku app install pannunga.',
    installNow: 'Ippo Install Pannu',
    installOnIos: 'iOS-la Install Pannu',
    installOnAndroid: 'Android-la Install Pannu',
    benefits: 'Benefits',
    quickAccess: 'Home screen-la irundhu quick access',
    worksOffline: 'Offline-la velai seiyum - eppo venum paalum parunga',
    nativeExperience: 'Native app experience - browser bars illa',
    fasterLoading: 'Fast-a load aagum',
    goToDashboard: 'Dashboard-ku Po',
    openInBrowser: 'App install panna Chrome or Safari-la open pannunga.',
    tapShare: 'Safari-la Share button tap pannunga',
    tapAddHome: 'Scroll panni "Add to Home Screen" tap pannunga',
    tapAdd: '"Add" tap panni confirm pannunga',
    tapMenu: 'Chrome-la menu button tap pannunga',
    tapInstall: '"Add to Home screen" or "Install app" tap pannunga',

    // Farm/Location
    addFarm: 'Farm Add Pannu',
    editLocation: 'Location Edit Pannu',
    updateLocation: 'Location Update Pannu',
    farmName: 'Farm Name',
    address: 'Address',
    latitude: 'Latitude',
    longitude: 'Longitude',
    soilType: 'Mann Vagai',
    detectLocation: 'En Location Kandupidi (GPS)',
    noFarmsAdded: 'Farms innumnu add aagala',
    farmDialogDesc: 'Farm details enter pannunga illa GPS use panni kandupidinga.',
    searchAddress: 'Village, town or address enter pannunga',
    selectSoilType: 'Mann vagai select pannunga',
    soilTypeHelp: 'Better payir recommendations ku mann vagai select pannunga',
    enterCoords: 'Location coordinates enter pannunga illa detect pannunga',

    // Soil Types
    claySoil: 'Clay Mann',
    sandySoil: 'Manal Mann',
    loamySoil: 'Loamy Mann',
    siltSoil: 'Silt Mann',
    peatSoil: 'Peat Mann',
    chalkySoil: 'Chalky Mann',
    blackSoil: 'Black Mann (Regur)',
    redSoil: 'Red Mann',
    alluvialSoil: 'Alluvial Mann',

    // Crop Recommendations
    cropRecommendations: 'Payir Recommendations',
    basedOnSoil: 'Based on',
    suitable: 'suitable',
    noRecommendations: 'Recommendations illa',
    getRecommendations: 'Recommendations Edu',
    failedRecommendations: 'Recommendations edukka mudiyala',
    setSoilType: 'Payir recommendations ku mann vagai set pannunga',
    retry: 'Retry',

    // AI Insights
    aiInsights: 'AI Insights',
    irrigationAdvice: 'Watering Advice',
    healthAnalysis: 'Health Analysis',
    confidenceScore: 'Confidence',
    analyzingData: 'Unga farm data analyze panranga...',
    noDataYet: 'AI insights ku sensors connect pannunga',
    refreshAnalysis: 'Analysis Refresh Pannu',
    factors: 'Factors Considered',
    recommendation: 'Recommendation',
    optimal: 'Optimal',
    warning: 'Warning',
    critical: 'Critical',

    // Government Schemes
    governmentSchemes: 'Government Schemes',
    governmentSchemesFinder: 'Government Vivasaya Schemes',
    discoverSchemes: 'Government schemes kandupidi aur apply pannu',
    schemeEligibility: 'Eligibility',
    howToApply: 'Eppadi Apply Panndra',
    requiredDocuments: 'Thavainai Documents',
    helpline: 'Help Number',
    applyOnline: 'Online Apply Pannu',
    selectState: 'State Select Pannu',
    filterByCategory: 'Category-la Filter Pannu',
    foundSchemes: 'Kandupittathu',
    noSchemesFound: 'Schemes Kandupala',

    // Subsidy Schemes
    subsidySchemes: 'Subsidy Schemes',
    pmKisan: 'PM-KISAN',
    rythuBharosa: 'Ryithu Bharosa',
    dbt: 'Direct Benefit Transfer',
    pmksy: 'PM Krishi Sinchayee Yojana',

    // Insurance Schemes
    insuranceSchemes: 'Insurance Schemes',
    pmFasalBima: 'PM Fasal Bima',
    weatherBasedInsurance: 'Vanilai-based Insurance',

    // Cooperative Stores
    cooperativeStores: 'Cooperative Stores',
    cooperativeStoresLocator: 'Cooperative Stores Kandupidi',
    nearbyStores: 'Nearby Stores',
    searchRadius: 'Search Distance',
    storeType: 'Store Type',
    distance: 'Distance',
    manager: 'Manager',
    contact: 'Contact',
    phone: 'Phone',
    openingHours: 'Open Timing',
    weekdays: 'Weekdays',
    weekend: 'Weekend',
    availableProducts: 'Available Products',
    subsidies: 'Subsidies',
    getDirections: 'Direction Edu',
    callStore: 'Store Call Pannu',
    noStoresFound: 'Stores Kandupala',

    // Eligibility
    landHolding: 'Nilam Vazhi',
    annualIncome: 'Varusanda Varamai',
    age: 'Vayasu',
    eligibilityDetails: 'Eligibility Details',

    // Application Steps
    step: 'Kadam',
    applicationProcess: 'Apply Process',
    documents: 'Documents',
    website: 'Website',

    // Filter Options
    all: 'Ellarum',
    subsidy: 'Subsidy',
    loan: 'Loan',
    insurance: 'Insurance',
    infrastructure: 'Infrastructure',
    training: 'Training',
    marketing: 'Marketing',

    // IRS
    irsScore: 'Irrigation Risk Score',
    riskLevelSafe: 'Safe',
    riskLevelWarning: 'Warning',
    riskLevelCritical: 'Critical',
    factorBreakdown: 'Factor Analysis',
    soilDryness: 'Mann Varatchi',
    tempStress: 'Temp Stress',
    humidityStress: 'Humidity Stress',
    cropSensitivity: 'Payir Sensitivity',
    weatherFactor: 'Mazhai Factor',
    sensorAnomaly: 'Sensor reading stable illa',
    sensorFault: 'Sensor problem kandupittathu',
    decisionReasoning: 'Yen indha decision?',
    recommendedTime: 'Best time',
    hardwareStatus: 'Hardware Status',
    ledStatus: 'LED Status',
    buzzerStatus: 'Buzzer Status',
    monitorConditions: 'Conditions monitor pannu',
    irrigationNeeded: 'Thanneer venum',
    noIrrigationNeeded: 'Thanneer vendam',
    rainDelayActive: 'Mazhai varum - watering delayed',
    manualOverrideActive: 'Manual override active',
    safetyBlockActive: 'Safety block - sensors check pannu',
    learningInsights: 'Learning Insights',
    overrideRate: 'Override Rate',
    avgIrsScore: 'Avg IRS Score',
    systemLearning: 'Unga decisions-la irundhu system learn panrudhu',

    // Crop Economics
    cropEconomics: 'Payir Economics',
    costBreakdownDetails: 'Cost breakdown and profit analysis',
    selectCrop: 'Payir Select Pannu',
    landSize: 'Nilam Size (acres)',
    analyzeEconomics: 'Economics Analyze Pannu',
    totalInvestment: 'Total Investment',
    projectedEarnings: 'Expected Earnings',
    profitMargin: 'Profit Margin',
    roi: 'ROI',
    investmentViability: 'Investment Viability',
    viableCrop: 'Viable Payir',
    notViable: 'Not Viable',
    timelineToHarvest: 'Harvest-ku Timeline',
    daysToMaturity: 'Maturity-ku Days',
    seedToHarvest: 'Vithai to Harvest',
    months: 'months',
    bestPlantingTime: 'Best Planting Time',
    marketOutlook: 'Market Outlook',
    currentPrice: 'Ippodhu Price',
    perUnit: 'per quintal',
    expectedYield: 'Expected Yield',
    quintals: 'quintals',
    revenuePerAcre: 'Acre-ku Revenue',
    costBreakdown: 'Cost Breakdown',
    seedCost: 'Vithai Cost',
    fertiliserCost: 'Fertiliser Cost',
    labourCost: 'Labour Cost',
    waterManagement: 'Thanneer Management',
    pestControl: 'Poochi Control',
    totalCost: 'Total Cost',
    economicsSummary: 'Economics Summary',
    willNeed: 'Unakku venum',
    expectedIncome: 'Expected income',
    profitAfterCosts: 'Costs-ku aprom profit',
    timeTillHarvest: 'Harvest-ku time',
    invalidInput: 'Payir select pannu and nilam size enter pannu',
    failedAnalysis: 'Economics analyze panna mudiyala',
    scanCrop: 'Payirai Scan Pannu',
    takePhoto: 'Photo Edu',
    uploadPhoto: 'Photo Upload Pannu',
    analyzing: 'Analyze pannudhu...',
    scanResult: 'Scan Result',
    identified: 'Kandupidichadu',
    noIssuesFound: 'Problem Illa',
    recommendations: 'Parindhuraigal',
    scanAgain: 'Meendum Scan Pannu',
    pestDetection: 'Poochi Detection',
    diseaseAnalysis: 'Noi Analysis',
    soilAnalysis: 'Mann Analysis',
    harvestPredictor: 'Harvest Profit Predictor',
    harvestPredictorDesc: 'Athiga labathukku eppo vikkanum nu kandupidunga',
    predictProfit: 'Profit Predict Pannu',
    sellNowRec: '🟢 Ippo Vikkuinga!',
    holdRec: '🟡 Vachchirunga',
    waitPeakRec: '🔵 Peak ku Wait Pannunga',
    sellNowReason: 'Ippo price nallaa iruku, storage cost athigam.',
    holdReason: 'Price increase aagalam. Best month:',
    waitPeakReason: 'Price peak aagum month',
    extraProfit: 'Extra labam',
    currentMarketPrice: 'Ippo Price',
    marketPrice: 'Market Price',
    sellNowValue: 'Ippo Vikka Value',
    peakPrice: 'Peak Price',
    priceChange12m: '12-Month Change',
    priceTrend: 'Price Trend (12 Months)',
    seasonalDemand: 'Season Demand Calendar',
    currentMonth: 'Ippo Month',
    bestSellMonth: 'Best Sell Month',
    holdingCosts: 'Storage Costs',
    storageCost: 'Kidangu Cost',
    spoilageLoss: 'Kettupona Loss',
    waitMonths: 'Wait Months',
    profitComparison: 'Profit Comparison',
    sellAtPeak: 'Peak la Vikka (net)',
    netGain: 'Wait Panna Kidaikura Extra',
    perishableWarning: '⚠️ Idhu seekiram kettupoora crop. Storage la niraiya loss — seekiram vikkuinga.',
    pendingSync: 'sync aaganum',
    offlineMode: 'Offline mode',
    dataWillSync: 'Internet vanthathum sync aagum',
    livePrices: 'Live Market Prices',
    fetchingPrices: 'Prices fetch pannurom...',
    mandiPrices: 'Mandi Prices',
    priceforecast: 'Forecast',
    topMandis: 'Top Mandis',
    weekChange: 'Week change',
    monthChange: 'Month change',
    refreshPrices: 'Prices Refresh',
    lastFetched: 'Last fetch',
    marketSummary: 'Market Summary',
  },
  hi: {
    appName: 'GeaNexa',
    smartIrrigation: 'स्मार्ट सिंचाई',
    systemOnline: 'सिस्टम चल रहा है',
    lastSync: 'आखिरी जांच',
    minAgo: 'मिनट पहले',
    
    language: 'भाषा',
    settings: 'सेटिंग्स',
    
    dashboard: 'मेरा खेत',
    liveMonitoring: 'लाइव जानकारी',
    
    soilMoisture: 'मिट्टी की नमी',
    temperature: 'तापमान',
    humidity: 'हवा की नमी',
    cropHealth: 'फसल स्वास्थ्य',
    waterSaved: 'बचाया पानी',
    efficiency: 'कितना अच्छा',
    vsLastHour: 'पिछले घंटे से',
    
    weather: 'आज का मौसम',
    rainChance: 'बारिश की संभावना',
    wind: 'हवा',
    today: 'आज',
    locationNeeded: 'मौसम के लिए स्थान आवश्यक',
    allowLocation: 'स्थान अनुमति दें',
    farmLocation: 'आपके खेत का स्थान',
    detectingLocation: 'स्थान खोज रहा है...',
    locationError: 'स्थान नहीं मिला',
    unknownLocation: 'स्थान अज्ञात',
    yourArea: 'आपका क्षेत्र',
    rainAlert: 'बारिश की चेतावनी!',
    
    waterControl: 'पानी नियंत्रण',
    autoMode: 'ऑटो',
    manualMode: 'हाथ से',
    startWatering: 'पानी डालो',
    stopWatering: 'बंद करो',
    active: 'पानी चल रहा',
    idle: 'बंद है',
    nextScheduled: 'अगली सिंचाई',
    
    aiSuggestion: 'AI सलाह',
    confidence: 'भरोसा',
    suggestedTime: 'पानी देना',
    
    deviceStatus: 'यंत्र स्थिति',
    online: 'चल रहा',
    offline: 'बंद है',
    devicesOnline: 'यंत्र चल रहे',
    allGood: 'सब ठीक है!',
    needsAttention: 'देखें',
    battery: 'बैटरी',
    signal: 'सिग्नल',
    lastUpdated: 'अपडेट',
    sensor: 'सेंसर',
    valve: 'वाल्व',
    controller: 'कंट्रोलर',
    
    recentActivity: 'हाल की घटनाएं',
    wateringDone: 'सिंचाई पूरी हुई',
    
    moistureTrend: 'मिट्टी नमी का रुझान',
    last24Hours: 'पिछले 24 घंटे',
    actualMoisture: 'अभी का स्तर',
    goodLevel: 'अच्छा स्तर',
    weeklyWater: 'साप्ताहिक पानी उपयोग',
    waterUsed: 'इस्तेमाल पानी',
    
    askQuestion: 'अपने खेत के बारे में पूछें...',
    voiceAssistant: 'खेत सहायक',
    tapToSpeak: 'बोलने के लिए दबाएं',
    listening: 'सुन रहा हूं...',
    thinking: 'सोच रहा हूं...',
    speakNow: 'अब बोलें',
    
    poweredByAI: 'स्मार्ट खेती आसान',
    connected: 'जुड़ा हुआ',
    synced: 'सिंक हुआ',
    
    minutes: 'मिनट',
    liters: 'लीटर',
    thisWeek: 'इस हफ्ते',

    // Auth
    welcome: 'स्वागत है',
    signInDescription: 'अपने खाते में साइन इन करें या नया खाता बनाएं',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    email: 'ईमेल',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि',
    createAccount: 'खाता बनाएं',
    checkEmail: 'अपना ईमेल जांचें',
    welcomeBack: 'वापस स्वागत है!',
    accountCreated: 'आपका खाता सफलतापूर्वक बन गया।',
    invalidEmail: 'कृपया सही ईमेल पता दर्ज करें',
    passwordMin: 'पासवर्ड कम से कम 6 अक्षर होना चाहिए',
    passwordMismatch: 'पासवर्ड मेल नहीं खाते',
    alreadyRegistered: 'यह ईमेल पहले से पंजीकृत है। कृपया साइन इन करें।',
    verifyEmail: 'साइन इन करने से पहले अपना ईमेल सत्यापित करें।',
    invalidCredentials: 'गलत ईमेल या पासवर्ड। फिर से कोशिश करें।',

    // Settings
    account: 'खाता',
    manageAccount: 'अपनी खाता सेटिंग्स प्रबंधित करें',
    signedIn: 'साइन इन हैं',
    signOut: 'साइन आउट',
    notifications: 'सूचनाएं',
    configureNotifications: 'सूचना प्राथमिकताएं कॉन्फ़िगर करें',
    enableNotifications: 'सूचनाएं सक्षम करें',
    notificationDescription: 'बारिश, सिंचाई और सिस्टम इवेंट के लिए अलर्ट प्राप्त करें',
    rainThreshold: 'बारिश अलर्ट सीमा',
    thresholdDescription: 'बारिश की संभावना इस सीमा से अधिक होने पर सूचित करें',
    preferences: 'प्राथमिकताएं',
    temperatureUnit: 'तापमान इकाई',
    celsius: 'सेल्सियस',
    fahrenheit: 'फारेनहाइट',
    settingsUpdated: 'सेटिंग्स अपडेट हो गईं',
    languageUpdated: 'भाषा प्राथमिकता सहेजी गई',

    // Install
    installApp: 'ऐप इंस्टॉल करें',
    appInstalled: 'ऐप पहले से इंस्टॉल है!',
    appInstalledDesc: 'GeaNexa आपके डिवाइस पर पहले से इंस्टॉल है। होम स्क्रीन पर देखें।',
    installDescription: 'त्वरित एक्सेस, ऑफलाइन सपोर्ट और नेटिव अनुभव के लिए ऐप इंस्टॉल करें।',
    installNow: 'अभी इंस्टॉल करें',
    installOnIos: 'iOS पर इंस्टॉल करें',
    installOnAndroid: 'Android पर इंस्टॉल करें',
    benefits: 'लाभ',
    quickAccess: 'होम स्क्रीन से त्वरित एक्सेस',
    worksOffline: 'ऑफलाइन काम करता है - कभी भी खेत डेटा देखें',
    nativeExperience: 'नेटिव ऐप अनुभव - ब्राउज़र बार नहीं',
    fasterLoading: 'तेज़ लोडिंग',
    goToDashboard: 'डैशबोर्ड पर जाएं',
    openInBrowser: 'ऐप इंस्टॉल करने के लिए Chrome या Safari में खोलें।',
    tapShare: 'Safari में Share बटन दबाएं',
    tapAddHome: 'नीचे स्क्रॉल करें और "Add to Home Screen" दबाएं',
    tapAdd: '"Add" दबाकर पुष्टि करें',
    tapMenu: 'Chrome में मेनू बटन दबाएं',
    tapInstall: '"Add to Home screen" या "Install app" दबाएं',

    // Farm/Location
    addFarm: 'खेत जोड़ें',
    editLocation: 'स्थान संपादित करें',
    updateLocation: 'स्थान अपडेट करें',
    farmName: 'खेत का नाम',
    address: 'पता',
    latitude: 'अक्षांश',
    longitude: 'देशांतर',
    soilType: 'मिट्टी का प्रकार',
    detectLocation: 'मेरा स्थान खोजें (GPS)',
    noFarmsAdded: 'अभी तक कोई खेत नहीं जोड़ा',
    farmDialogDesc: 'खेत का विवरण दर्ज करें या GPS से स्थान खोजें।',
    searchAddress: 'गांव, शहर या पता दर्ज करें',
    selectSoilType: 'मिट्टी का प्रकार चुनें',
    soilTypeHelp: 'बेहतर फसल सिफारिशों के लिए मिट्टी का प्रकार चुनें',
    enterCoords: 'स्थान निर्देशांक दर्ज करें या खोजें',

    // Soil Types
    claySoil: 'चिकनी मिट्टी',
    sandySoil: 'रेतीली मिट्टी',
    loamySoil: 'दोमट मिट्टी',
    siltSoil: 'गाद मिट्टी',
    peatSoil: 'पीट मिट्टी',
    chalkySoil: 'चूनेदार मिट्टी',
    blackSoil: 'काली मिट्टी (रेगूर)',
    redSoil: 'लाल मिट्टी',
    alluvialSoil: 'जलोढ़ मिट्टी',

    // Crop Recommendations
    cropRecommendations: 'फसल सिफारिशें',
    basedOnSoil: 'आधारित',
    suitable: 'उपयुक्त',
    noRecommendations: 'कोई सिफारिश उपलब्ध नहीं',
    getRecommendations: 'सिफारिशें प्राप्त करें',
    failedRecommendations: 'सिफारिशें प्राप्त करने में विफल',
    setSoilType: 'फसल सिफारिशों के लिए मिट्टी का प्रकार सेट करें',
    retry: 'पुनः प्रयास',

    // AI Insights
    aiInsights: 'AI अंतर्दृष्टि',
    irrigationAdvice: 'सिंचाई सलाह',
    healthAnalysis: 'स्वास्थ्य विश्लेषण',
    confidenceScore: 'विश्वास',
    analyzingData: 'आपके खेत डेटा का विश्लेषण हो रहा है...',
    noDataYet: 'AI अंतर्दृष्टि के लिए सेंसर कनेक्ट करें',
    refreshAnalysis: 'विश्लेषण ताज़ा करें',
    factors: 'विचारित कारक',
    recommendation: 'सिफारिश',
    optimal: 'इष्टतम',
    warning: 'चेतावनी',
    critical: 'गंभीर',

    // Government Schemes
    governmentSchemes: 'सरकारी योजनाएं',
    governmentSchemesFinder: 'सरकारी कृषि योजनाएं',
    discoverSchemes: 'सरकारी योजनाओं की खोज करें और आवेदन करें',
    schemeEligibility: 'पात्रता',
    howToApply: 'कैसे आवेदन करें',
    requiredDocuments: 'आवश्यक दस्तावेज',
    helpline: 'हेल्पलाइन',
    applyOnline: 'ऑनलाइन आवेदन करें',
    selectState: 'राज्य चुनें',
    filterByCategory: 'श्रेणी के अनुसार फ़िल्टर करें',
    foundSchemes: 'पाई गईं',
    noSchemesFound: 'कोई योजना नहीं मिली',

    // Subsidy Schemes
    subsidySchemes: 'अनुदान योजनाएं',
    pmKisan: 'पीएम-किसान',
    rythuBharosa: 'रैथु भरोसा',
    dbt: 'प्रत्यक्ष लाभ अंतरण',
    pmksy: 'पीएम कृषि सिंचाई योजना',

    // Insurance Schemes
    insuranceSchemes: 'बीमा योजनाएं',
    pmFasalBima: 'पीएम फसल बीमा',
    weatherBasedInsurance: 'मौसम आधारित बीमा',

    // Cooperative Stores
    cooperativeStores: 'सहकारी स्टोर',
    cooperativeStoresLocator: 'सहकारी स्टोर खोजें',
    nearbyStores: 'पास के स्टोर',
    searchRadius: 'खोज दूरी',
    storeType: 'स्टोर प्रकार',
    distance: 'दूरी',
    manager: 'प्रबंधक',
    contact: 'संपर्क',
    phone: 'फ़ोन',
    openingHours: 'खुलने का समय',
    weekdays: 'सप्ताह के दिन',
    weekend: 'सप्ताहांत',
    availableProducts: 'उपलब्ध उत्पाद',
    subsidies: 'अनुदान',
    getDirections: 'दिशानिर्देश प्राप्त करें',
    callStore: 'स्टोर को कॉल करें',
    noStoresFound: 'कोई स्टोर नहीं मिला',

    // Eligibility
    landHolding: 'भूमि धारण',
    annualIncome: 'वार्षिक आय',
    age: 'आयु',
    eligibilityDetails: 'पात्रता विवरण',

    // Application Steps
    step: 'चरण',
    applicationProcess: 'आवेदन प्रक्रिया',
    documents: 'दस्तावेज़',
    website: 'वेबसाइट',

    // Filter Options
    all: 'सभी',
    subsidy: 'अनुदान',
    loan: 'ऋण',
    insurance: 'बीमा',
    infrastructure: 'अवसंरचना',
    training: 'प्रशिक्षण',
    marketing: 'विपणन',

    // IRS
    irsScore: 'सिंचाई जोखिम स्कोर',
    riskLevelSafe: 'सुरक्षित',
    riskLevelWarning: 'चेतावनी',
    riskLevelCritical: 'गंभीर',
    factorBreakdown: 'कारक विश्लेषण',
    soilDryness: 'मिट्टी सूखापन',
    tempStress: 'तापमान तनाव',
    humidityStress: 'नमी तनाव',
    cropSensitivity: 'फसल संवेदनशीलता',
    weatherFactor: 'बारिश कारक',
    sensorAnomaly: 'सेंसर रीडिंग अस्थिर',
    sensorFault: 'सेंसर खराबी पाई गई',
    decisionReasoning: 'यह निर्णय क्यों?',
    recommendedTime: 'सर्वोत्तम समय',
    hardwareStatus: 'हार्डवेयर स्थिति',
    ledStatus: 'LED स्थिति',
    buzzerStatus: 'बजर स्थिति',
    monitorConditions: 'स्थितियों की निगरानी करें',
    irrigationNeeded: 'सिंचाई आवश्यक',
    noIrrigationNeeded: 'सिंचाई आवश्यक नहीं',
    rainDelayActive: 'बारिश की उम्मीद - सिंचाई स्थगित',
    manualOverrideActive: 'मैनुअल ओवरराइड सक्रिय',
    safetyBlockActive: 'सुरक्षा ब्लॉक - सेंसर जांचें',
    learningInsights: 'सीखने की अंतर्दृष्टि',
    overrideRate: 'ओवरराइड दर',
    avgIrsScore: 'औसत IRS स्कोर',
    systemLearning: 'आपके निर्णयों से सिस्टम सीख रहा है',

    // Crop Economics
    cropEconomics: 'फसल अर्थशास्त्र',
    costBreakdownDetails: 'लागत विवरण और लाभ विश्लेषण',
    selectCrop: 'फसल चुनें',
    landSize: 'भूमि का आकार (एकड़)',
    analyzeEconomics: 'अर्थशास्त्र विश्लेषण करें',
    totalInvestment: 'कुल निवेश',
    projectedEarnings: 'अनुमानित आय',
    profitMargin: 'लाभ मार्जिन',
    roi: 'ROI',
    investmentViability: 'निवेश व्यवहार्यता',
    viableCrop: 'व्यवहार्य फसल',
    notViable: 'व्यवहार्य नहीं',
    timelineToHarvest: 'कटाई की समयरेखा',
    daysToMaturity: 'परिपक्वता के दिन',
    seedToHarvest: 'बीज से कटाई',
    months: 'महीने',
    bestPlantingTime: 'सर्वोत्तम रोपण समय',
    marketOutlook: 'बाजार दृष्टिकोण',
    currentPrice: 'वर्तमान मूल्य',
    perUnit: 'प्रति क्विंटल',
    expectedYield: 'अपेक्षित उपज',
    quintals: 'क्विंटल',
    revenuePerAcre: 'प्रति एकड़ राजस्व',
    costBreakdown: 'लागत विवरण',
    seedCost: 'बीज लागत',
    fertiliserCost: 'उर्वरक लागत',
    labourCost: 'श्रम लागत',
    waterManagement: 'जल प्रबंधन',
    pestControl: 'कीट नियंत्रण',
    totalCost: 'कुल लागत',
    economicsSummary: 'अर्थशास्त्र सारांश',
    willNeed: 'आपको चाहिए',
    expectedIncome: 'अपेक्षित आय',
    profitAfterCosts: 'लागत के बाद लाभ',
    timeTillHarvest: 'कटाई तक समय',
    invalidInput: 'कृपया फसल चुनें और भूमि का आकार दर्ज करें',
    failedAnalysis: 'अर्थशास्त्र विश्लेषण विफल',
    scanCrop: 'फसल स्कैन करें',
    takePhoto: 'फोटो लें',
    uploadPhoto: 'फोटो अपलोड करें',
    analyzing: 'विश्लेषण हो रहा है...',
    scanResult: 'स्कैन परिणाम',
    identified: 'पहचाना गया',
    noIssuesFound: 'कोई समस्या नहीं',
    recommendations: 'सिफारिशें',
    scanAgain: 'फिर से स्कैन करें',
    pestDetection: 'कीट पहचान',
    diseaseAnalysis: 'रोग विश्लेषण',
    soilAnalysis: 'मिट्टी विश्लेषण',
    harvestPredictor: 'फसल लाभ भविष्यवक्ता',
    harvestPredictorDesc: 'अधिकतम लाभ के लिए बेचने का सही समय जानें',
    predictProfit: 'लाभ अनुमान',
    sellNowRec: '🟢 अभी बेचें!',
    holdRec: '🟡 रुकें और देखें',
    waitPeakRec: '🔵 शिखर की प्रतीक्षा करें',
    sellNowReason: 'वर्तमान मूल्य अच्छा है और भंडारण लागत अधिक है।',
    holdReason: 'कीमत बढ़ सकती है। सर्वोत्तम महीना:',
    waitPeakReason: 'कीमत चरम पर पहुंचने की उम्मीद',
    extraProfit: 'अतिरिक्त लाभ',
    currentMarketPrice: 'वर्तमान मूल्य',
    marketPrice: 'बाज़ार मूल्य',
    sellNowValue: 'अभी बेचने का मूल्य',
    peakPrice: 'शिखर मूल्य',
    priceChange12m: '12 महीने का बदलाव',
    priceTrend: 'मूल्य रुझान (12 महीने)',
    seasonalDemand: 'मौसमी मांग कैलेंडर',
    currentMonth: 'वर्तमान महीना',
    bestSellMonth: 'बेचने का सर्वोत्तम महीना',
    holdingCosts: 'भंडारण लागत',
    storageCost: 'गोदाम लागत',
    spoilageLoss: 'खराबी का नुकसान',
    waitMonths: 'प्रतीक्षा के महीने',
    profitComparison: 'लाभ तुलना',
    sellAtPeak: 'शिखर पर बेचें (शुद्ध)',
    netGain: 'प्रतीक्षा से शुद्ध लाभ',
    perishableWarning: '⚠️ यह जल्दी खराब होने वाली फसल है। भंडारण में काफी नुकसान — जल्दी बेचें।',
    pendingSync: 'सिंक बाकी',
    offlineMode: 'ऑफलाइन मोड',
    dataWillSync: 'इंटरनेट आने पर सिंक होगा',
    livePrices: 'लाइव बाजार भाव',
    fetchingPrices: 'भाव लोड हो रहे हैं...',
    mandiPrices: 'मंडी भाव',
    priceforecast: 'पूर्वानुमान',
    topMandis: 'शीर्ष मंडियां',
    weekChange: 'हफ्ते का बदलाव',
    monthChange: 'महीने का बदलाव',
    refreshPrices: 'भाव ताज़ा करें',
    lastFetched: 'आखरी अपडेट',
    marketSummary: 'बाजार सारांश',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
  languageNames: Record<Language, string>;
}

const languageNames: Record<Language, string> = {
  en: 'English',
  ta: 'தமிழ்',
  tanglish: 'Tanglish',
  hi: 'हिंदी',
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
    languageNames,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
