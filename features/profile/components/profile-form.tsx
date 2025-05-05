"use client"

import { useState } from "react"
import { useUser } from "@clerk/nextjs"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

const profileFormSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  bio: z.string().max(160).optional(),
})

type ProfileFormValues = z.infer<typeof profileFormSchema>

export function ProfileForm() {
  const { user, isLoaded } = useUser()
  const [isUpdating, setIsUpdating] = useState(false)

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      bio: "",
    },
    mode: "onChange",
  })

  // Update form when user data is loaded
  if (isLoaded && user && !form.formState.isDirty) {
    form.reset({
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.primaryEmailAddress?.emailAddress || "",
      bio: (user.unsafeMetadata.bio as string) || "",
    })
  }

  async function onSubmit(data: ProfileFormValues) {
    setIsUpdating(true)

    try {
      await user?.update({
        firstName: data.firstName,
        lastName: data.lastName,
        unsafeMetadata: {
          bio: data.bio,
        },
      })

      toast({
        title: "Profile updated",
        description: "Your profile has been updated successfully.",
      })
    } catch (error) {
      console.error(error)
      toast({
        title: "Error",
        description: "There was an error updating your profile.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  if (!isLoaded) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Profile</CardTitle>
          <CardDescription>Loading your profile information...</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center py-10">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Update your profile information. This information will be displayed publicly.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center space-x-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={user?.imageUrl || "/placeholder.svg"} alt={user?.fullName || "User"} />
            <AvatarFallback>
              {user?.firstName?.charAt(0)}
              {user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-medium">{user?.fullName}</h3>
            <p className="text-sm text-muted-foreground">{user?.primaryEmailAddress?.emailAddress}</p>
          </div>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First name</FormLabel>
                    <FormControl>
                      <Input placeholder="John" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last name</FormLabel>
                    <FormControl>
                      <Input placeholder="Doe" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john.doe@example.com" {...field} disabled />
                  </FormControl>
                  <FormDescription>You cannot change your email address here.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="bio"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bio</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us a little bit about yourself" className="resize-none" {...field} />
                  </FormControl>
                  <FormDescription>Brief description for your profile. Max 160 characters.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isUpdating || !form.formState.isDirty}>
              {isUpdating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isUpdating ? "Updating..." : "Update profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
