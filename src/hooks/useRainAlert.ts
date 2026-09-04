 import { useState, useEffect, useCallback, useRef } from "react";
 import { useLanguage } from "@/contexts/LanguageContext";
 import { toast } from "sonner";
 
 interface RainAlertConfig {
   rainProbability: number;
   locationName?: string;
 }
 
 const ALERT_COOLDOWN_MS = 30 * 60 * 1000; // 30 minutes between alerts
 
 export function useRainAlert() {
   const { t, language } = useLanguage();
   const [lastAlertTime, setLastAlertTime] = useState<number>(0);
   const [alertShown, setAlertShown] = useState(false);
   const speechSynthRef = useRef<SpeechSynthesisUtterance | null>(null);
 
   // Get the appropriate voice for the language
   const getVoice = useCallback(() => {
     const voices = window.speechSynthesis.getVoices();
     let langCode = "en";
     
     switch (language) {
       case "ta":
       case "tanglish":
         langCode = "ta";
         break;
       case "hi":
         langCode = "hi";
         break;
       default:
         langCode = "en";
     }
     
     // Try to find a voice for the language
     return voices.find(v => v.lang.startsWith(langCode)) || voices[0];
   }, [language]);
 
   // Get alert message in the correct language
   const getAlertMessage = useCallback((rainProbability: number, locationName?: string) => {
     const location = locationName || "";
     
     switch (language) {
       case "ta":
         return `எச்சரிக்கை! ${location} இல் அடுத்த 2 மணி நேரத்தில் ${rainProbability}% மழை வாய்ப்பு உள்ளது. நீர்ப்பாசனத்தை ஒத்திவைக்கவும்.`;
       case "tanglish":
         return `Alert! ${location} la next 2 hours la ${rainProbability}% mazhai vaippu iruku. Watering postpone pannunga.`;
       case "hi":
         return `चेतावनी! ${location} में अगले 2 घंटे में ${rainProbability}% बारिश की संभावना है। सिंचाई टालें।`;
       default:
         return `Rain Alert! ${rainProbability}% chance of rain in ${location} in the next 2 hours. Consider postponing watering.`;
     }
   }, [language]);
 
   // Speak the alert message
   const speakAlert = useCallback((message: string) => {
     if (!("speechSynthesis" in window)) return;
     
     // Cancel any ongoing speech
     window.speechSynthesis.cancel();
     
     const utterance = new SpeechSynthesisUtterance(message);
     utterance.voice = getVoice();
     utterance.rate = 0.9;
     utterance.pitch = 1;
     utterance.volume = 1;
     
     speechSynthRef.current = utterance;
     window.speechSynthesis.speak(utterance);
   }, [getVoice]);
 
   // Show browser notification
   const showNotification = useCallback(async (message: string) => {
     // Request notification permission if not granted
     if ("Notification" in window) {
       if (Notification.permission === "default") {
         await Notification.requestPermission();
       }
       
       if (Notification.permission === "granted") {
         new Notification("🌧️ Rain Alert - GeaNexa", {
           body: message,
           icon: "/favicon.ico",
           tag: "rain-alert",
         });
       }
     }
   }, []);
 
   // Check and trigger rain alert
   const checkRainAlert = useCallback(({ rainProbability, locationName }: RainAlertConfig) => {
     const now = Date.now();
     
     // Only alert if rain probability is high (>60%) and cooldown has passed
     if (rainProbability > 60 && now - lastAlertTime > ALERT_COOLDOWN_MS) {
       const message = getAlertMessage(rainProbability, locationName);
       
       // Show toast notification
       toast.warning(message, {
         duration: 10000,
         id: "rain-alert",
       });
       
       // Speak the alert
       speakAlert(message);
       
       // Show browser notification
       showNotification(message);
       
       setLastAlertTime(now);
       setAlertShown(true);
       
       return true;
     }
     
     return false;
   }, [lastAlertTime, getAlertMessage, speakAlert, showNotification]);
 
   // Request notification permission on mount
   useEffect(() => {
     if ("Notification" in window && Notification.permission === "default") {
       Notification.requestPermission();
     }
   }, []);
 
   // Cleanup speech on unmount
   useEffect(() => {
     return () => {
       if ("speechSynthesis" in window) {
         window.speechSynthesis.cancel();
       }
     };
   }, []);
 
   return {
     checkRainAlert,
     alertShown,
     lastAlertTime,
   };
 }