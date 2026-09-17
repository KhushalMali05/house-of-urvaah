export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || "https://fhbdceauisvlcpmuzpmf.supabase.co";
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || "house-ofvaah";
export const CDN_BASE_URL = `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}`;

/**
 * Universal Media URL Resolver:
 * - External URLs (http/https) -> returned directly
 * - Local static bundle paths (assets/...) -> served from local web server (/assets/...)
 * - Supabase storage paths -> served from Supabase CDN
 */
export const getSupabaseMediaUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }
  const cleanPath = path.startsWith("/") ? path.slice(1) : path;

  // Local static asset fallback for bundled public assets
  if (cleanPath.startsWith("assets/")) {
    return `/${cleanPath}`;
  }

  return `${CDN_BASE_URL}/${cleanPath}`;
};
