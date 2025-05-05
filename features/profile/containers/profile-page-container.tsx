import { ProfileHeader } from "@/features/profile/components/profile-header"
import { ProfileForm } from "@/features/profile/components/profile-form"
import { SecuritySettings } from "@/features/profile/components/security-settings"
import { MobileSidebar } from "@/features/dashboard/components/mobile-sidebar"

export function ProfilePageContainer() {
  return (
    <>
      <MobileSidebar />
      <div className="flex flex-col gap-6">
        <ProfileHeader />
        <div className="grid gap-6 md:grid-cols-2">
          <ProfileForm />
          <SecuritySettings />
        </div>
      </div>
    </>
  )
}
