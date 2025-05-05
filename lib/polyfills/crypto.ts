// This is a minimal polyfill for crypto.createHash
// Only implement what's needed for NextAuth
import { createHash as nodeCryptoCreateHash } from "crypto"

// Check if we're in an environment where crypto is not available
if (typeof globalThis.crypto === "undefined") {
  // @ts-ignore
  globalThis.crypto = {}
}

// Only add the polyfill if it doesn't exist
if (typeof globalThis.crypto.subtle === "undefined") {
  // @ts-ignore
  globalThis.crypto.subtle = {
    // Implement only what's needed
    digest: async (algorithm: string, data: BufferSource) => {
      // Convert algorithm to Node.js format
      const nodeAlgorithm = algorithm.toLowerCase().replace("-", "")

      // Use TextEncoder to convert data to Buffer if needed
      const buffer = data instanceof ArrayBuffer ? Buffer.from(data) : Buffer.from(new Uint8Array(data))

      // Use Node.js crypto
      const hash = nodeCryptoCreateHash(nodeAlgorithm)
      hash.update(buffer)
      return hash.digest()
    },
  }
}
