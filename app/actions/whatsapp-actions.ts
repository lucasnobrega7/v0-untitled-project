"use server"

import {
  getConnectionStatus,
  sendWhatsAppMessage,
  sendWhatsAppFile,
  getRecentMessages,
  getContacts,
  createGroup,
  generateQRCode,
  disconnectWhatsApp,
  restartWhatsApp,
} from "@/lib/z-api"

// Check WhatsApp connection status
export async function checkWhatsAppStatus() {
  try {
    const status = await getConnectionStatus()
    return { success: true, status }
  } catch (error) {
    console.error("Error checking WhatsApp status:", error)
    return { success: false, error: "Failed to check WhatsApp status" }
  }
}

// Send a WhatsApp message
export async function sendMessage(phone: string, message: string) {
  try {
    const result = await sendWhatsAppMessage(phone, message)
    return { success: true, result }
  } catch (error) {
    console.error("Error sending WhatsApp message:", error)
    return { success: false, error: "Failed to send WhatsApp message" }
  }
}

// Send a file via WhatsApp
export async function sendFile(phone: string, fileUrl: string, fileName: string, caption?: string) {
  try {
    const result = await sendWhatsAppFile(phone, fileUrl, fileName, caption)
    return { success: true, result }
  } catch (error) {
    console.error("Error sending WhatsApp file:", error)
    return { success: false, error: "Failed to send WhatsApp file" }
  }
}

// Get recent WhatsApp messages
export async function fetchRecentMessages() {
  try {
    const messages = await getRecentMessages()
    return { success: true, messages }
  } catch (error) {
    console.error("Error fetching WhatsApp messages:", error)
    return { success: false, error: "Failed to fetch WhatsApp messages" }
  }
}

// Get WhatsApp contacts
export async function fetchContacts() {
  try {
    const contacts = await getContacts()
    return { success: true, contacts }
  } catch (error) {
    console.error("Error fetching WhatsApp contacts:", error)
    return { success: false, error: "Failed to fetch WhatsApp contacts" }
  }
}

// Create a WhatsApp group
export async function createWhatsAppGroup(groupName: string, phones: string[]) {
  try {
    const result = await createGroup(groupName, phones)
    return { success: true, result }
  } catch (error) {
    console.error("Error creating WhatsApp group:", error)
    return { success: false, error: "Failed to create WhatsApp group" }
  }
}

// Generate QR code for WhatsApp connection
export async function getQRCode() {
  try {
    const qrCode = await generateQRCode()
    return { success: true, qrCode }
  } catch (error) {
    console.error("Error generating WhatsApp QR code:", error)
    return { success: false, error: "Failed to generate WhatsApp QR code" }
  }
}

// Disconnect WhatsApp
export async function disconnect() {
  try {
    const result = await disconnectWhatsApp()
    return { success: true, result }
  } catch (error) {
    console.error("Error disconnecting WhatsApp:", error)
    return { success: false, error: "Failed to disconnect WhatsApp" }
  }
}

// Restart WhatsApp connection
export async function restart() {
  try {
    const result = await restartWhatsApp()
    return { success: true, result }
  } catch (error) {
    console.error("Error restarting WhatsApp:", error)
    return { success: false, error: "Failed to restart WhatsApp" }
  }
}
