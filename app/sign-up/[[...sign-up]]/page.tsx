import { SignUp } from "@clerk/nextjs"

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-muted/30">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary: "bg-primary hover:bg-primary/90 text-primary-foreground",
            card: "shadow-md",
          },
        }}
      />
    </div>
  )
}
