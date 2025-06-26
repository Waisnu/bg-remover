
# Next.js Migration Guide

This guide will help you convert your current Vite React app to Next.js 14+ with the App Router.

## 1. Create New Next.js Project

```bash
npx create-next-app@latest ai-background-remover --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"
cd ai-background-remover
```

## 2. Install Required Dependencies

```bash
npm install @huggingface/transformers
npm install @radix-ui/react-dialog @radix-ui/react-progress @radix-ui/react-radio-group @radix-ui/react-select
npm install class-variance-authority clsx tailwind-merge
npm install lucide-react sonner
npm install @tanstack/react-query
```

## 3. File Structure Migration

### Move files from current structure to Next.js:

```
Current (Vite)              →  Next.js (App Router)
src/pages/Index.tsx         →  src/app/page.tsx
src/components/             →  src/components/ (same)
src/lib/                   →  src/lib/ (same)
src/hooks/                 →  src/hooks/ (same)
src/index.css              →  src/app/globals.css
```

## 4. Key Changes Needed

### A. Root Layout (src/app/layout.tsx)
```tsx
import './globals.css'
import { Inter } from 'next/font/google'
import { Toaster } from 'sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <QueryClientProvider client={new QueryClient()}>
          {children}
          <Toaster />
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### B. Main Page (src/app/page.tsx)
Copy the content from `src/pages/Index.tsx` but remove the router imports since Next.js handles routing differently.

### C. Update transformers.js for Next.js
In `src/lib/backgroundRemover.ts`, add this configuration:

```typescript
import { pipeline, env } from '@huggingface/transformers';

// Next.js specific configuration
env.allowLocalModels = false;
env.useBrowserCache = true;
env.backends.onnx.wasm.wasmPaths = '/onnx-wasm/';
```

### D. Add Next.js Config (next.config.js)
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;
```

## 5. Component Updates

### A. Client Components
Add `'use client'` directive to components that use:
- useState, useEffect, or other React hooks
- Event handlers
- Browser APIs

Example:
```tsx
'use client'
import { useState } from 'react'
// ... rest of component
```

### B. Server Components (Default)
Components that don't need client-side interactivity can remain as server components (no 'use client' needed).

## 6. Static Assets

Move static assets to the `public/` directory in the Next.js project root.

## 7. Environment Variables

Create `.env.local` for environment variables:
```
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

## 8. Build and Deploy

### Development:
```bash
npm run dev
```

### Production Build:
```bash
npm run build
npm run start
```

### Deploy to Vercel:
```bash
npx vercel
```

## 9. Additional Optimizations for Next.js

### A. Image Optimization
Replace `<img>` tags with Next.js `<Image>` component:

```tsx
import Image from 'next/image'

<Image
  src={imageSrc}
  alt="Description"
  width={500}
  height={300}
  className="object-contain"
/>
```

### B. Metadata
Add metadata to improve SEO:

```tsx
// src/app/layout.tsx or page.tsx
export const metadata = {
  title: 'AI Background Remover',
  description: 'Professional AI-powered background removal for your images',
}
```

### C. Loading States
Create loading.tsx files for better UX:

```tsx
// src/app/loading.tsx
export default function Loading() {
  return <div>Loading...</div>
}
```

## 10. Testing Migration

1. Start with a fresh Next.js project
2. Copy components one by one
3. Test each component individually
4. Ensure all imports work correctly
5. Test the background removal functionality
6. Verify all UI interactions work as expected

This migration will give you:
- Better SEO with server-side rendering
- Improved performance with Next.js optimizations
- Built-in deployment options with Vercel
- Better development experience with hot reloading
- Automatic code splitting and optimization
