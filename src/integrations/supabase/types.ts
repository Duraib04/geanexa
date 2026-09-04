export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      activity_logs: {
        Row: {
          created_at: string
          event_type: string
          farm_id: string | null
          id: string
          message: string
          severity: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          farm_id?: string | null
          id?: string
          message: string
          severity?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          farm_id?: string | null
          id?: string
          message?: string
          severity?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "activity_logs_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      ai_decisions: {
        Row: {
          confidence_score: number | null
          created_at: string | null
          decision_type: string
          farm_id: string | null
          id: string
          input_data: Json
          output_data: Json
          user_id: string
          was_followed: boolean | null
        }
        Insert: {
          confidence_score?: number | null
          created_at?: string | null
          decision_type: string
          farm_id?: string | null
          id?: string
          input_data?: Json
          output_data?: Json
          user_id: string
          was_followed?: boolean | null
        }
        Update: {
          confidence_score?: number | null
          created_at?: string | null
          decision_type?: string
          farm_id?: string | null
          id?: string
          input_data?: Json
          output_data?: Json
          user_id?: string
          was_followed?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_decisions_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      crop_recommendations: {
        Row: {
          created_at: string | null
          crop_name: string
          farm_id: string | null
          id: string
          reason: string | null
          season: string | null
          suitability_score: number | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          crop_name: string
          farm_id?: string | null
          id?: string
          reason?: string | null
          season?: string | null
          suitability_score?: number | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          crop_name?: string
          farm_id?: string | null
          id?: string
          reason?: string | null
          season?: string | null
          suitability_score?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "crop_recommendations_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farm_preferences: {
        Row: {
          created_at: string | null
          crop_types: string[] | null
          farm_id: string | null
          id: string
          irrigation_method: string | null
          preferred_irrigation_time: string | null
          updated_at: string | null
          user_id: string
          water_budget_daily: number | null
        }
        Insert: {
          created_at?: string | null
          crop_types?: string[] | null
          farm_id?: string | null
          id?: string
          irrigation_method?: string | null
          preferred_irrigation_time?: string | null
          updated_at?: string | null
          user_id: string
          water_budget_daily?: number | null
        }
        Update: {
          created_at?: string | null
          crop_types?: string[] | null
          farm_id?: string | null
          id?: string
          irrigation_method?: string | null
          preferred_irrigation_time?: string | null
          updated_at?: string | null
          user_id?: string
          water_budget_daily?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "farm_preferences_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: true
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      farms: {
        Row: {
          address: string | null
          created_at: string
          id: string
          latitude: number
          longitude: number
          name: string
          soil_type: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          created_at?: string
          id?: string
          latitude: number
          longitude: number
          name: string
          soil_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          created_at?: string
          id?: string
          latitude?: number
          longitude?: number
          name?: string
          soil_type?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      irrigation_logs: {
        Row: {
          action: string
          created_at: string
          duration_minutes: number | null
          farm_id: string | null
          id: string
          triggered_by: string | null
          water_used_liters: number | null
        }
        Insert: {
          action: string
          created_at?: string
          duration_minutes?: number | null
          farm_id?: string | null
          id?: string
          triggered_by?: string | null
          water_used_liters?: number | null
        }
        Update: {
          action?: string
          created_at?: string
          duration_minutes?: number | null
          farm_id?: string | null
          id?: string
          triggered_by?: string | null
          water_used_liters?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "irrigation_logs_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string | null
          id: string
          message: string
          read: boolean | null
          title: string
          type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          message: string
          read?: boolean | null
          title: string
          type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          message?: string
          read?: boolean | null
          title?: string
          type?: string | null
          user_id?: string
        }
        Relationships: []
      }
      scan_history: {
        Row: {
          created_at: string | null
          farm_id: string | null
          id: string
          image_url: string
          language: string | null
          result: Json
          scan_type: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          image_url: string
          language?: string | null
          result?: Json
          scan_type?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          farm_id?: string | null
          id?: string
          image_url?: string
          language?: string | null
          result?: Json
          scan_type?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "scan_history_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_readings: {
        Row: {
          created_at: string
          farm_id: string | null
          humidity: number | null
          id: string
          nitrogen: number | null
          ph_level: number | null
          phosphorus: number | null
          potassium: number | null
          pump_status: boolean | null
          soil_moisture: number | null
          temperature: number | null
          water_level: number | null
        }
        Insert: {
          created_at?: string
          farm_id?: string | null
          humidity?: number | null
          id?: string
          nitrogen?: number | null
          ph_level?: number | null
          phosphorus?: number | null
          potassium?: number | null
          pump_status?: boolean | null
          soil_moisture?: number | null
          temperature?: number | null
          water_level?: number | null
        }
        Update: {
          created_at?: string
          farm_id?: string | null
          humidity?: number | null
          id?: string
          nitrogen?: number | null
          ph_level?: number | null
          phosphorus?: number | null
          potassium?: number | null
          pump_status?: boolean | null
          soil_moisture?: number | null
          temperature?: number | null
          water_level?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "sensor_readings_farm_id_fkey"
            columns: ["farm_id"]
            isOneToOne: false
            referencedRelation: "farms"
            referencedColumns: ["id"]
          },
        ]
      }
      sensor_readings_v2: {
        Row: {
          created_at: string
          css: number | null
          device_id: string | null
          flow: number | null
          humidity: number | null
          id: string
          pump: string | null
          rain: string | null
          soil_moisture: number | null
          temperature: number | null
        }
        Insert: {
          created_at?: string
          css?: number | null
          device_id?: string | null
          flow?: number | null
          humidity?: number | null
          id?: string
          pump?: string | null
          rain?: string | null
          soil_moisture?: number | null
          temperature?: number | null
        }
        Update: {
          created_at?: string
          css?: number | null
          device_id?: string | null
          flow?: number | null
          humidity?: number | null
          id?: string
          pump?: string | null
          rain?: string | null
          soil_moisture?: number | null
          temperature?: number | null
        }
        Relationships: []
      }
      user_settings: {
        Row: {
          created_at: string | null
          id: string
          language: string | null
          notification_enabled: boolean | null
          rain_alert_threshold: number | null
          temperature_unit: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_enabled?: boolean | null
          rain_alert_threshold?: number | null
          temperature_unit?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          language?: string | null
          notification_enabled?: boolean | null
          rain_alert_threshold?: number | null
          temperature_unit?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
