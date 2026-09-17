# Supabase Media & Storage Integration Guide

This guide details the complete step-by-step procedure to connect **Supabase Storage** to the **House of Urvaah** project and host all product images, campaign lookbooks, and hero videos on your public Supabase Storage bucket (`houseofurvaah-media`).

---

## 📌 Project Credentials & Bucket Info

| Property | Value |
| :--- | :--- |
| **Supabase Project Name** | `HouseofUrvaah` |
| **Supabase Project Reference ID** | `YOUR_SUPABASE_PROJECT_REF` |
| **Supabase Project Base URL** | `https://YOUR_SUPABASE_PROJECT_REF.supabase.co` |
| **Supabase Public Storage Bucket** | `houseofurvaah-media` |
| **Storage Access Level** | **PUBLIC** |

---

## 🚀 Step-by-Step Setup Guide

### Step 1: Obtain API Keys from Supabase Dashboard

1. Open your [Supabase Project Dashboard](https://supabase.com/dashboard).
2. On the left sidebar, click **Project Settings** (Gear icon ⚙️) → **API**.
3. Under **Project API keys**, copy the **`anon` `public`** key.

---

### Step 2: Upload Project Assets to Supabase Storage Bucket

In your Supabase Dashboard, navigate to **Storage** → **Buckets** → **`houseofurvaah-media`**.

Organize your storage bucket into two primary folders:

```text
houseofurvaah-media/
├── Images/
│   ├── Blue01.png
│   ├── Blue02.png
│   ├── Brown01.png
│   └── ... (all image assets)
└── Videos/
    └── Hero-section-video-two.mp4
```

---

### Step 3: Configure Environment Variables

Create or update your `.env` file in the project root:

```env
# Supabase Configuration for House of Urvaah
VITE_SUPABASE_PROJECT_REF=YOUR_SUPABASE_PROJECT_REF
VITE_SUPABASE_URL=https://YOUR_SUPABASE_PROJECT_REF.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_COPIED_SUPABASE_ANON_KEY
VITE_SUPABASE_STORAGE_BUCKET=houseofurvaah-media
```

---

### Step 4: Supabase Client & CDN Helper Utility (`src/lib/supabase.js`)

The project includes a helper module [`src/lib/supabase.js`](file:///c:/workspace/House-Of-Urvaah/src/lib/supabase.js) that resolves local media paths to your public Supabase Storage CDN URL when configured, or falls back to local paths when unconfigured:

```javascript
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_REF = import.meta.env.VITE_SUPABASE_PROJECT_REF || '';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || (SUPABASE_PROJECT_REF ? `https://${SUPABASE_PROJECT_REF}.supabase.co` : '');
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const BUCKET_NAME = import.meta.env.VITE_SUPABASE_STORAGE_BUCKET || 'houseofurvaah-media';

export const supabase = (SUPABASE_URL && SUPABASE_ANON_KEY)
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

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
| **Hero Background Video** | `/assets/video/Hero-section-video-two.mp4` | `https://YOUR_SUPABASE_PROJECT_REF.supabase.co/storage/v1/object/public/houseofurvaah-media/Videos/Hero-section-video-two.mp4` |
| **Product Image** | `/assets/Images/Brown01.png` | `https://YOUR_SUPABASE_PROJECT_REF.supabase.co/storage/v1/object/public/houseofurvaah-media/Images/Brown01.png` |
| **Campaign Banner Image** | `/assets/Images/Blue02.png` | `https://YOUR_SUPABASE_PROJECT_REF.supabase.co/storage/v1/object/public/houseofurvaah-media/Images/Blue02.png` |

---

## ⚡ Verification Checklist

1. **Verify Public Bucket Access**: Ensure `houseofurvaah-media` is marked **PUBLIC** in your Supabase Dashboard so CDN URLs can be accessed without auth headers.
2. **Test Build**: Run `npm run build` to confirm everything compiles without errors.
3. **Verify CDN Loading**: Inspect network requests in DevTools (F12) to verify media requests originate from your configured Supabase URL.
