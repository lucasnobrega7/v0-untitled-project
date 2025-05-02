// Z-API utility functions for WhatsApp integration

// Base URL for Z-API
const Z_API_BASE_URL = "https://api.z-api.io/instances"

// Helper function to create the API URL
const createApiUrl = (path: string) => {
  const instanceId = process.env.Z_API_INSTANCE
  const token = process.env.Z_API_TOKEN
  return `${Z_API_BASE_URL}/${instanceId}/${path}?token=${token}`
}

// Generic function to make API requests to Z-API
async function makeZApiRequest(path: string, method = "GET", body?: any) {
  const url = createApiUrl(path)

  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      ...(body && { body: JSON.stringify(body) }),
    })

    if (!response.ok) {
      throw new Error(`Z-API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("Z-API request error:", error)
    throw error
  }
}

// Get the connection status of the WhatsApp instance
export async function getConnectionStatus() {
  return makeZApiRequest("status")
}

// Send a text message to a WhatsApp number
export async function sendWhatsAppMessage(phone: string, message: string) {
  return makeZApiRequest("send-text", "POST", {
    phone,
    message,
  })
}

// Send a file (image, document, etc.) to a WhatsApp number
export async function sendWhatsAppFile(phone: string, fileUrl: string, fileName: string, caption?: string) {
  return makeZApiRequest("send-file-url", "POST", {
    phone,
    fileUrl,
    fileName,
    caption,
  })
}

// Get recent messages
export async function getRecentMessages() {
  return makeZApiRequest("messages")
}

// Get contacts
export async function getContacts() {
  return makeZApiRequest("contacts")
}

// Create a group
export async function createGroup(groupName: string, phones: string[]) {
  return makeZApiRequest("create-group", "POST", {
    groupName,
    phones,
  })
}

// Generate QR code for connecting WhatsApp
export async function generateQRCode() {
  return makeZApiRequest("qr-code")
}

// Disconnect WhatsApp
export async function disconnectWhatsApp() {
  return makeZApiRequest("disconnect", "POST")
}

// Restart WhatsApp connection
export async function restartWhatsApp() {
  return makeZApiRequest("restart", "POST")
}
