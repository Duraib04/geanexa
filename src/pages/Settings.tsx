 import { useNavigate } from "react-router-dom";
 import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
 import { Button } from "@/components/ui/button";
 import { Switch } from "@/components/ui/switch";
 import { Label } from "@/components/ui/label";
 import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
 import { Slider } from "@/components/ui/slider";
 import { ArrowLeft, Bell, Thermometer, Globe, Loader2, Gauge, ChevronRight, Users, ExternalLink } from "lucide-react";
 import { useSettings } from "@/hooks/useSettings";
 import { useAuth } from "@/hooks/useAuth";
 import { useToast } from "@/hooks/use-toast";
 import { useLanguage } from "@/contexts/LanguageContext";
 
 const Settings = () => {
   const navigate = useNavigate();
   const { user, signOut } = useAuth();
   const { settings, isLoading, updateSettings } = useSettings();
   const { toast } = useToast();
   const { language, setLanguage, t } = useLanguage();
 
   if (!user) {
     navigate("/auth");
     return null;
   }
 
   const handleNotificationToggle = async (enabled: boolean) => {
     const { error } = await updateSettings({ notification_enabled: enabled });
     if (!error) {
       toast({ title: t.settingsUpdated, description: `${t.notifications} ${enabled ? t.online : t.offline}` });
     }
   };
 
   const handleThresholdChange = async (value: number[]) => {
     await updateSettings({ rain_alert_threshold: value[0] });
   };
 
   const handleUnitChange = async (unit: string) => {
     const { error } = await updateSettings({ temperature_unit: unit });
     if (!error) {
       toast({ title: t.settingsUpdated, description: `${t.temperatureUnit}: ${unit === 'celsius' ? t.celsius : t.fahrenheit}` });
     }
   };
 
   const handleLanguageChange = async (lang: string) => {
     setLanguage(lang as "en" | "ta" | "tanglish" | "hi");
     await updateSettings({ language: lang });
     toast({ title: t.settingsUpdated, description: t.languageUpdated });
   };
 
   const handleSignOut = async () => {
     await signOut();
     navigate("/auth");
   };
 
   if (isLoading) {
     return (
       <div className="min-h-screen bg-background flex items-center justify-center">
         <Loader2 className="h-8 w-8 animate-spin text-primary" />
       </div>
     );
   }
 
   return (
     <div className="min-h-screen bg-background">
       <header className="sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border/50">
         <div className="w-full flex h-16 items-center px-4 lg:px-8">
           <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
             <ArrowLeft className="h-5 w-5" />
           </Button>
           <h1 className="text-lg font-semibold ml-2">{t.settings}</h1>
         </div>
       </header>
 
       <main className="w-full px-4 lg:px-8 py-6 space-y-6 max-w-2xl mx-auto">
         <Card>
           <CardHeader>
             <CardTitle>{t.account}</CardTitle>
             <CardDescription>{t.manageAccount}</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4">
             <div className="flex items-center justify-between">
               <div>
                 <p className="font-medium">{user.email}</p>
                 <p className="text-sm text-muted-foreground">{t.signedIn}</p>
               </div>
               <Button variant="outline" onClick={handleSignOut}>{t.signOut}</Button>
             </div>
           </CardContent>
         </Card>

         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Users className="h-5 w-5 text-primary" />
               About GDG Coimbatore
             </CardTitle>
             <CardDescription>Learning, connection, and technology for every developer.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4 text-sm">
             <div className="grid gap-3 sm:grid-cols-3">
               <div><p className="text-muted-foreground">GDG Organizer</p><p className="font-medium">Durai B</p></div>
               <div><p className="text-muted-foreground">Team member</p><p className="font-medium">NITHYA RUBINI</p></div>
               <div><p className="text-muted-foreground">Team member</p><p className="font-medium">MAHBUBA YASMIN LASKAR</p></div>
             </div>
             <a className="inline-flex items-center gap-2 text-primary hover:underline" href="https://duraib.vercel.app" target="_blank" rel="noreferrer">
               Visit duraib.vercel.app <ExternalLink className="h-4 w-4" />
             </a>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Bell className="h-5 w-5" />
               {t.notifications}
             </CardTitle>
             <CardDescription>{t.configureNotifications}</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="flex items-center justify-between">
               <div>
                 <Label>{t.enableNotifications}</Label>
                 <p className="text-sm text-muted-foreground">{t.notificationDescription}</p>
               </div>
               <Switch checked={settings?.notification_enabled ?? true} onCheckedChange={handleNotificationToggle} />
             </div>
 
             <div className="space-y-3">
               <div className="flex items-center justify-between">
                 <Label>{t.rainThreshold}</Label>
                 <span className="text-sm font-medium">{settings?.rain_alert_threshold ?? 60}%</span>
               </div>
               <Slider value={[settings?.rain_alert_threshold ?? 60]} onValueCommit={handleThresholdChange} min={20} max={90} step={5} className="w-full" />
               <p className="text-sm text-muted-foreground">{t.thresholdDescription}</p>
             </div>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Thermometer className="h-5 w-5" />
               {t.preferences}
             </CardTitle>
             <CardDescription>{t.temperatureUnit}</CardDescription>
           </CardHeader>
           <CardContent className="space-y-6">
             <div className="flex items-center justify-between">
               <div>
                 <Label>{t.temperatureUnit}</Label>
                 <p className="text-sm text-muted-foreground">{t.celsius} / {t.fahrenheit}</p>
               </div>
               <Select value={settings?.temperature_unit ?? 'celsius'} onValueChange={handleUnitChange}>
                 <SelectTrigger className="w-32"><SelectValue /></SelectTrigger>
                 <SelectContent>
                   <SelectItem value="celsius">{t.celsius}</SelectItem>
                   <SelectItem value="fahrenheit">{t.fahrenheit}</SelectItem>
                 </SelectContent>
               </Select>
             </div>
           </CardContent>
         </Card>
 
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Globe className="h-5 w-5" />
               {t.language}
             </CardTitle>
             <CardDescription>{t.configureNotifications}</CardDescription>
           </CardHeader>
           <CardContent>
             <Select value={language} onValueChange={handleLanguageChange}>
               <SelectTrigger className="w-full"><SelectValue /></SelectTrigger>
               <SelectContent>
                 <SelectItem value="en">English</SelectItem>
                 <SelectItem value="ta">தமிழ் (Tamil)</SelectItem>
                 <SelectItem value="tanglish">Tanglish</SelectItem>
                 <SelectItem value="hi">हिंदी (Hindi)</SelectItem>
               </SelectContent>
             </Select>
           </CardContent>
         </Card>
         <Card>
           <CardHeader>
             <CardTitle className="flex items-center gap-2">
               <Gauge className="h-5 w-5" />
               Soil Moisture Calibration
             </CardTitle>
             <CardDescription>Adjust the ADC-to-percentage mapping for your soil probe</CardDescription>
           </CardHeader>
           <CardContent>
             <Button variant="outline" className="w-full justify-between" onClick={() => navigate("/calibration")}>
               Open calibration settings
               <ChevronRight className="h-4 w-4" />
             </Button>
           </CardContent>
         </Card>
       </main>
     </div>
   );
 };
 
 export default Settings;