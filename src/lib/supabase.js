import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL || '';
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isValidUrl = (url) => {
  return typeof url === 'string' && (url.startsWith('http://') || url.startsWith('https://')) && !url.includes('YOUR_');
};

export const SUPABASE_URL = isValidUrl(rawUrl) ? rawUrl : '';
export const SUPABASE_ANON_KEY = (typeof rawKey === 'string' && !rawKey.includes('YOUR_')) ? rawKey : '';
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'houseofurvaah-media';

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

/**
 * Returns the public Supabase CDN URL for a given media path.
 * If SUPABASE_URL is valid, it resolves to the Supabase CDN URL.
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


