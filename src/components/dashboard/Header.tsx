import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Menu, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSelector } from "./LanguageSelector";
import { NotificationCenter } from "./NotificationCenter";
import { OfflineIndicator } from "./OfflineIndicator";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useOfflineSync } from "@/hooks/useOfflineSync";

interface HeaderProps {
  onMenuClick?: () => void;
  className?: string;
}

export function Header({ onMenuClick, className }: HeaderProps) {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { isOnline, pendingCount, lastSyncTime, syncPendingData } = useOfflineSync();

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full bg-card/80 backdrop-blur-md border-b border-border/50",
        className
      )}
    >
      <div className="w-full flex h-16 items-center justify-between px-4 lg:px-8">
        {/* Logo & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#4285F4] text-white font-semibold text-xl" aria-label="Google Developer Groups">
              G
            </div>
            <div className="hidden sm:block">
              <h1 className="text-lg font-display">{t.appName}</h1>
              <p className="text-xs text-muted-foreground">Google Developer Groups</p>
            </div>
          </div>
        </div>

        {/* Status Badge */}
        <div className="hidden md:flex items-center gap-2">
          <OfflineIndicator
            isOnline={isOnline}
            pendingCount={pendingCount}
            lastSyncTime={lastSyncTime}
            onSync={syncPendingData}
          />
          {isOnline && pendingCount === 0 && (
            <Badge variant="outline" className="bg-success/10 text-success border-success/30 font-medium">
              <span className="w-2 h-2 rounded-full bg-success mr-2 animate-pulse" />
              {t.systemOnline}
            </Badge>
          )}
          <span className="text-sm text-muted-foreground">
            {t.lastSync}: {lastSyncTime || `2 ${t.minAgo}`}
          </span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <LanguageSelector />
          {isAuthenticated && <NotificationCenter />}
          <Button variant="ghost" size="icon" onClick={() => navigate(isAuthenticated ? "/settings" : "/auth")}>
            {isAuthenticated ? <Settings className="h-5 w-5" /> : <LogIn className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </header>
  );
}