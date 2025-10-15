// Lighthouse IPFS Storage Configuration
// Documentation: https://docs.lighthouse.storage/

export const LIGHTHOUSE_CONFIG = {
  // Get your API key from: https://files.lighthouse.storage/
  apiKey: process.env.NEXT_PUBLIC_LIGHTHOUSE_API_KEY || "7698e6ce.85f372c9d2364e0f87ae656e5f45a0ca",
  
  // IPFS Gateway URLs
  gateways: {
    lighthouse: "https://gateway.lighthouse.storage/ipfs/",
    ipfs: "https://ipfs.io/ipfs/",
    cloudflare: "https://cloudflare-ipfs.com/ipfs/",
  },
  
  // Upload settings
  uploadSettings: {
    maxFileSize: 100 * 1024 * 1024, // 100MB
    supportedImageTypes: ["image/jpeg", "image/png", "image/gif", "image/webp"],
    supportedVideoTypes: ["video/mp4", "video/webm"],
  },
};

// Helper to get the best gateway URL
export const getLighthouseUrl = (cid: string) => {
  return `${LIGHTHOUSE_CONFIG.gateways.lighthouse}${cid}`;
};

// Helper to validate file type
export const isValidFileType = (file: File) => {
  const { supportedImageTypes, supportedVideoTypes } = LIGHTHOUSE_CONFIG.uploadSettings;
  return [...supportedImageTypes, ...supportedVideoTypes].includes(file.type);
};

// Helper to validate file size
export const isValidFileSize = (file: File) => {
  return file.size <= LIGHTHOUSE_CONFIG.uploadSettings.maxFileSize;
};
