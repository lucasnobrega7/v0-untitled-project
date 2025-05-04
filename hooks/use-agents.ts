"use client"

import { useState, useEffect } from "react"
import { useAppContext } from "@/contexts/app-context"
import { createBrowserSupabaseClient } from "@/lib/supabase/client"
import { LIMITS } from "@/constants"

export type Agent = {
  id: string
  name: string
  description: string | null
  system_prompt: string | null
  model_id: string
  temperature: number
  user_id: string
  knowledge_base_id: string | null
  created_at: string
  updated_at: string
}

export function useAgents() {
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAppContext()
  const supabase = createBrowserSupabaseClient()

  // Carregar agentes
  const loadAgents = async () => {
    if (!user?.id) return

    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase
        .from("agents")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })

      if (error) throw error

      setAgents(data || [])
    } catch (err: any) {
      console.error("Erro ao carregar agentes:", err)
      setError(err.message || "Erro ao carregar agentes")
    } finally {
      setLoading(false)
    }
  }

  // Carregar agentes quando o usuário mudar
  useEffect(() => {
    if (user?.id) {
      loadAgents()
    } else {
      setAgents([])
    }
  }, [user?.id])

  // Criar um novo agente
  const createAgent = async (agentData: Partial<Agent>) => {
    if (!user?.id) throw new Error("Usuário não autenticado")

    // Verificar limite de agentes
    if (agents.length >= LIMITS.MAX_AGENTS_FREE) {
      throw new Error(`Você atingiu o limite de ${LIMITS.MAX_AGENTS_FREE} agentes no plano gratuito`)
    }

    try {
      const { data, error } = await supabase
        .from("agents")
        .insert({
          ...agentData,
          user_id: user.id,
        })
        .select()
        .single()

      if (error) throw error

      // Atualizar lista de agentes
      setAgents((prev) => [data, ...prev])

      return data
    } catch (err: any) {
      console.error("Erro ao criar agente:", err)
      throw err
    }
  }

  // Atualizar um agente existente
  const updateAgent = async (id: string, agentData: Partial<Agent>) => {
    if (!user?.id) throw new Error("Usuário não autenticado")

    try {
      const { data, error } = await supabase
        .from("agents")
        .update(agentData)
        .eq("id", id)
        .eq("user_id", user.id)
        .select()
        .single()

      if (error) throw error

      // Atualizar lista de agentes
      setAgents((prev) => prev.map((agent) => (agent.id === id ? data : agent)))

      return data
    } catch (err: any) {
      console.error("Erro ao atualizar agente:", err)
      throw err
    }
  }

  // Excluir um agente
  const deleteAgent = async (id: string) => {
    if (!user?.id) throw new Error("Usuário não autenticado")

    try {
      const { error } = await supabase.from("agents").delete().eq("id", id).eq("user_id", user.id)

      if (error) throw error

      // Atualizar lista de agentes
      setAgents((prev) => prev.filter((agent) => agent.id !== id))

      return true
    } catch (err: any) {
      console.error("Erro ao excluir agente:", err)
      throw err
    }
  }

  return {
    agents,
    loading,
    error,
    loadAgents,
    createAgent,
    updateAgent,
    deleteAgent,
  }
}
