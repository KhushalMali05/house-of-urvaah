import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF || 'ucnqcqktkikbrbfvihvt';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_REF}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'houseofurvaah-media';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY || 'placeholder');

/**
 * Returns the public Supabase CDN URL for a given media path.
 * Maps local asset paths like "/assets/Images/Brown01.png" or "Images/Brown01.png"
 * to: https://ucnqcqktkikbrbfvihvt.supabase.co/storage/v1/object/public/houseofurvaah-media/Images/Brown01.png
 */
export const getSupabaseMediaUrl = (path) => {
  if (!path) return '';
  if (path.startsWith('http://') || path.startsWith('https://')) return path;

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
