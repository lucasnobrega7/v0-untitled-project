import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation"
import { ProfilePageContainer } from "@/features/profile/containers/profile-page-container"

export default function ProfilePage() {
  const { userId } = auth()

  if (!userId) {
    redirect("/sign-in")
  }

  return <ProfilePageContainer />
}
