export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://fhbdceauisvlcpmuzpmf.supabase.co";
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "house-ofvaah";
export const CDN_BASE_URL = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;

/**
 * Returns public Supabase Storage CDN URL for any media file
 * Example path: "Videos/Hero-section-video-two.mp4" or "Images/logo.png"
 */
export const getSupabaseMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;
  return `${CDN_BASE_URL}/${cleanPath}`;
};
