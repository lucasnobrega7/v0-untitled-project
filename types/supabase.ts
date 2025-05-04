export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      agents: {
        Row: {
          id: string
          name: string
          description: string | null
          system_prompt: string | null
          model_id: string | null
          temperature: number | null
          user_id: string
          knowledge_base_id: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          system_prompt?: string | null
          model_id?: string | null
          temperature?: number | null
          user_id: string
          knowledge_base_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          system_prompt?: string | null
          model_id?: string | null
          temperature?: number | null
          user_id?: string
          knowledge_base_id?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      knowledge_bases: {
        Row: {
          id: string
          name: string
          description: string | null
          index_name: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          index_name: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          index_name?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      conversations: {
        Row: {
          id: string
          agent_id: string
          user_id: string
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          agent_id: string
          user_id: string
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          agent_id?: string
          user_id?: string
          created_at?: string | null
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          conversation_id: string
          content: string
          role: string
          created_at: string | null
        }
        Insert: {
          id?: string
          conversation_id: string
          content: string
          role: string
          created_at?: string | null
        }
        Update: {
          id?: string
          conversation_id?: string
          content?: string
          role?: string
          created_at?: string | null
        }
      }
      notes: {
        Row: {
          id: string
          title: string
          content: string
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          content: string
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          content?: string
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          name: string | null
          email: string | null
          email_verified: string | null
          image: string | null
          password: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          name?: string | null
          email?: string | null
          email_verified?: string | null
          image?: string | null
          password?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          name?: string | null
          email?: string | null
          email_verified?: string | null
          image?: string | null
          password?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      user_roles: {
        Row: {
          id: string
          user_id: string
          role: string
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          role: string
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          role?: string
          created_at?: string | null
        }
      }
      health_check: {
        Row: {
          id: string
          status: string
          timestamp: string
        }
        Insert: {
          id?: string
          status: string
          timestamp?: string
        }
        Update: {
          id?: string
          status?: string
          timestamp?: string
        }
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
