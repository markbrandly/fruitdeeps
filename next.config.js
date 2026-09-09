/** @type {import('next').NextConfig} */
const nextConfig = {
    // Fruitdeeps is a purely client-side app: no API routes, no SSR data
    // fetching. Exporting to static HTML means there is no Next.js server
    // running in production, which removes the entire server-side attack
    // surface and lets us host on GitHub Pages.
    output: "export",

    // next/image's optimizer is a server feature and is unused here (every
    // image in the app is a plain <img>), but this keeps the export honest
    // if an <Image> is ever added.
    images: { unoptimized: true },

    reactStrictMode: true,
};

module.exports = nextConfig;
