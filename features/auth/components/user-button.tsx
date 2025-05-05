"use client"

import { UserButton as ClerkUserButton } from "@clerk/nextjs"

export function UserButton() {
  return (
    <ClerkUserButton
      appearance={{
        elements: {
          userButtonAvatarBox: "w-8 h-8",
        },
      }}
    />
  )
}
