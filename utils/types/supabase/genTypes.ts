export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      assessments: {
        Row: {
          access_code: string
          assessment_id: string
          assessment_name: string
          date_time: string
          duration_mins: number
          instructor_id: string
          marks_obtainable: number
          pass_mark: number
          status: string | null
        }
        Insert: {
          access_code?: string
          assessment_id?: string
          assessment_name: string
          date_time?: string
          duration_mins: number
          instructor_id?: string
          marks_obtainable: number
          pass_mark: number
          status?: string | null
        }
        Update: {
          access_code?: string
          assessment_id?: string
          assessment_name?: string
          date_time?: string
          duration_mins?: number
          instructor_id?: string
          marks_obtainable?: number
          pass_mark?: number
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "assessments_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["user_id"]
          },
        ]
      }
      candidates: {
        Row: {
          answers: string[]
          assessment_id: string
          candidate_department: string
          candidate_email: string
          candidate_id: string
          instructor_id: string
          name: string
          pass_code: string
          remark: string | null
          score: number | null
          serial_number: number
          submitted: boolean
          time_spent_mins: number | null
        }
        Insert: {
          answers: string[]
          assessment_id: string
          candidate_department: string
          candidate_email: string
          candidate_id: string
          instructor_id?: string
          name: string
          pass_code?: string
          remark?: string | null
          score?: number | null
          serial_number?: number
          submitted?: boolean
          time_spent_mins?: number | null
        }
        Update: {
          answers?: string[]
          assessment_id?: string
          candidate_department?: string
          candidate_email?: string
          candidate_id?: string
          instructor_id?: string
          name?: string
          pass_code?: string
          remark?: string | null
          score?: number | null
          serial_number?: number
          submitted?: boolean
          time_spent_mins?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "candidates_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: false
            referencedRelation: "assessments"
            referencedColumns: ["assessment_id"]
          },
          {
            foreignKeyName: "candidates_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["user_id"]
          },
        ]
      }
      correct_answers: {
        Row: {
          assessment_id: string
          correct_answers: string[]
          instructor_id: string
        }
        Insert: {
          assessment_id: string
          correct_answers: string[]
          instructor_id: string
        }
        Update: {
          assessment_id?: string
          correct_answers?: string[]
          instructor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "correct_answers_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "assessments"
            referencedColumns: ["assessment_id"]
          },
          {
            foreignKeyName: "correct_answers_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["user_id"]
          },
        ]
      }
      instructors: {
        Row: {
          email: string
          name: string
          user_id: string
        }
        Insert: {
          email: string
          name: string
          user_id?: string
        }
        Update: {
          email?: string
          name?: string
          user_id?: string
        }
        Relationships: []
      }
      questions: {
        Row: {
          assessment_id: string
          instructor_id: string
          questions: Json[]
        }
        Insert: {
          assessment_id: string
          instructor_id: string
          questions: Json[]
        }
        Update: {
          assessment_id?: string
          instructor_id?: string
          questions?: Json[]
        }
        Relationships: [
          {
            foreignKeyName: "questions_assessment_id_fkey"
            columns: ["assessment_id"]
            isOneToOne: true
            referencedRelation: "assessments"
            referencedColumns: ["assessment_id"]
          },
          {
            foreignKeyName: "questions_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      update_assessment_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
