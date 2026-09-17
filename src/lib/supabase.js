import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF || '';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || (SUPABASE_PROJECT_REF ? `https://${SUPABASE_PROJECT_REF}.supabase.co` : '');
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'houseofurvaah-media';

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Returns the public Supabase CDN URL for a given media path.
 * If SUPABASE_URL is configured, it resolves to the Supabase CDN URL.
 * Otherwise, it falls back seamlessly to the local asset path.
 */
export const getSupabaseMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (!SUPABASE_URL) return path;

  let cleanPath = path;
  if (cleanPath.startsWith('/assets/')) {
    cleanPath = cleanPath.replace('/assets/', '');
  } else if (cleanPath.startsWith('assets/')) {
    cleanPath = cleanPath.replace('assets/', '');
  } else if (cleanPath.startsWith('/')) {
    cleanPath = cleanPath.slice(1);
  }

  // Normalize folder casing to match Supabase Storage bucket ('Videos/' and 'Images/')
  if (cleanPath.startsWith('video/')) {
    cleanPath = cleanPath.replace('video/', 'Videos/');
  } else if (cleanPath.startsWith('images/')) {
    cleanPath = cleanPath.replace('images/', 'Images/');
  }

  return `${SUPABASE_URL}/storage/v1/object/public/${BUCKET_NAME}/${cleanPath}`;
};

