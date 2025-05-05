"use client"

import { create } from "zustand"

interface MobileMenuState {
  open: boolean
  setOpen: (open: boolean) => void
}

export const useMobileMenu = create<MobileMenuState>((set) => ({
  open: false,
  setOpen: (open) => set({ open }),
}))
