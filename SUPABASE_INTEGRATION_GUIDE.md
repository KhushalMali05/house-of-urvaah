# Supabase Media & Storage Integration Guide

This guide details the complete step-by-step procedure to connect **Supabase Storage** to the **House of Urvaah** project and host all product images, campaign lookbooks, and hero videos on your public Supabase Storage bucket (`houseofurvaah-media`).

---

## 📌 Project Credentials & Bucket Info

| Property | Value |
| :--- | :--- |
| **Supabase Project Name** | `HouseofUrvaah` |
| **Supabase Project Reference ID** | `ucnqcqktkikbrbfvihvt` |
| **Supabase Project Base URL** | `https://ucnqcqktkikbrbfvihvt.supabase.co` |
| **Supabase Public Storage Bucket** | `houseofurvaah-media` |
| **Storage Access Level** | **PUBLIC** |

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Obtain API Keys from Supabase Dashboard

1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard/project/ucnqcqktkikbrbfvihvt).
2. On the left sidebar, click **Project Settings** (Gear icon ⚙️) → **API**.
3. Under **Project API keys**, copy the **`anon` `public`** key (e.g. `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...`).

---

### Step 2: Upload Project Assets to Supabase Storage Bucket

In your Supabase Dashboard, navigate to **Storage** → **Buckets** → **`houseofurvaah-media`**.

#### 1. Create Folder `Images/` and Upload Product Images:
Upload all image files from your project's `public/assets/Images/` folder into the `Images/` folder inside `houseofurvaah-media`:
- `Blue01.png`, `Blue02.png`, `Blue03.png`, `Blue04.png`, `Blue_Halter.jpg`
- `Brown01.png`, `Brown02.png`, `Brown03.png`, `Brown04.png`, `Brown_Floral.jpg`
- `Corset01.png`, `Corset02.png`, `Corset03.png`, `Corset04.png`, `Corset_Blue1.jpg`, `Corset_Blue2.jpg`
- `Peach01.png`, `Peach02.png`, `Peach03.png`, `Peach04.png`, `Peach_Floral.jpg`
- `Outfit_Collage.png`

#### 2. Create Folder `Videos/` and Upload Hero Video:
Upload the background video file from `public/assets/video/` into the `Videos/` folder inside `houseofurvaah-media`:
- `Hero-section-video-two.mp4`

---

### Step 3: Project Environment Configuration (`.env`)

Add the following environment variables to your `.env` file in the project root:

```env
# Supabase Configuration for House of Urvaah
VITE_SUPABASE_PROJECT_REF=ucnqcqktkikbrbfvihvt
VITE_SUPABASE_URL=https://ucnqcqktkikbrbfvihvt.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_COPIED_SUPABASE_ANON_KEY
VITE_SUPABASE_STORAGE_BUCKET=houseofurvaah-media
```

---

### Step 4: Supabase Client & CDN Helper Utility (`src/lib/supabase.js`)

The project includes a helper module [`src/lib/supabase.js`](file:///c:/workspace/HouseOfUrvaah/src/lib/supabase.js) that resolves any local media path to your public Supabase Storage CDN URL:

```javascript
import { createClient } from '@supabase/supabase-js';

const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF || 'ucnqcqktkikbrbfvihvt';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_REF}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'houseofurvaah-media';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY || 'placeholder');

/**
 * Resolves local media paths like "/assets/Images/Brown01.png" or "/assets/video/Hero-section-video-two.mp4"
 * to: https://ucnqcqktkikbrbfvihvt.supabase.co/storage/v1/object/public/houseofurvaah-media/Videos/Hero-section-video-two.mp4
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
```

---

### Step 5: Media URL Structure Reference

| Media Asset Type | Local Path | Resolved Supabase Storage CDN URL |
| :--- | :--- | :--- |
| **Hero Background Video** | `/assets/video/Hero-section-video-two.mp4` | `https://ucnqcqktkikbrbfvihvt.supabase.co/storage/v1/object/public/houseofurvaah-media/Videos/Hero-section-video-two.mp4` |
| **Product Image** | `/assets/Images/Brown01.png` | `https://ucnqcqktkikbrbfvihvt.supabase.co/storage/v1/object/public/houseofurvaah-media/Images/Brown01.png` |
| **Campaign Banner Image** | `/assets/Images/Blue02.png` | `https://ucnqcqktkikbrbfvihvt.supabase.co/storage/v1/object/public/houseofurvaah-media/Images/Blue02.png` |

---

## ⚡ Verification Checklist

1. **Verify Public Bucket Access**: Ensure `houseofurvaah-media` is marked **PUBLIC** in your Supabase Dashboard so CDN URLs can be accessed without auth headers.
2. **Test Build**: Run `npm run build` to confirm everything compiles without errors.
3. **Verify CDN Loading**: Inspect network requests in DevTools (F12) to verify media requests originate from `https://ucnqcqktkikbrbfvihvt.supabase.co`.
