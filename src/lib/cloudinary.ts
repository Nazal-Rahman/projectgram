export const CLOUDINARY_CONFIG = {
  cloudName: 'projectgram',
  apiKey: '937955666339829',
  apiSecret: '3g7y0mp5lo2_HnXoPAiKWEU3NNs' // Warning: In a production environment, never expose the secret key in the frontend. 
};

/**
 * Uploads a file to Cloudinary.
 * Note: For production, you should generate the signature on a backend server (e.g. Firebase Cloud Functions)
 * or use an Unsigned Upload Preset. For this demo, we'll configure the endpoint.
 */
export async function uploadToCloudinary(file: File): Promise<string> {
  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CONFIG.cloudName}/upload`;
  
  const formData = new FormData();
  formData.append('file', file);
  
  // To use this directly from the frontend without a backend signature, 
  // you must create an "Unsigned Upload Preset" in your Cloudinary Settings -> Upload.
  // Replace 'projectgram_preset' with your actual unsigned preset name.
  formData.append('upload_preset', 'projectgram_preset'); 

  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || 'Upload failed');
    }

    const data = await response.json();
    return data.secure_url; // Returns the uploaded image URL
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw error;
  }
}
