import "./globals.css";

// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

import Script from "next/script";
import ClientLayout from "@/components/ClientLayout";
import pool from '@/lib/db';

// Function to fetch SEO settings
async function getSEOSettings() {
  try {
    // First check if the table exists
    const [tableExists] = await pool.query("SHOW TABLES LIKE 'site_seo'");
    
    if (tableExists.length === 0) {
      return {
        meta_title: 'My Website',
        meta_description: 'Real estate website',
        meta_keywords: 'real estate, properties, buy, sell, rent'
      };
    }
    
    // First try to get home page SEO settings
    const [homeSeo] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['home']);
    
    if (homeSeo.length > 0 && homeSeo[0].meta_title) {
      return {
        meta_title: homeSeo[0].meta_title || 'My Website',
        meta_description: homeSeo[0].meta_description || 'Real estate website',
        meta_keywords: homeSeo[0].meta_keywords || 'real estate, properties, buy, sell, rent'
      };
    }
    
    // Fallback to global settings if no home page SEO
    const [globalSeo] = await pool.query('SELECT * FROM site_seo WHERE page_slug = ?', ['global']);
    
    if (globalSeo.length > 0) {
      return {
        meta_title: globalSeo[0].meta_title || 'My Website',
        meta_description: globalSeo[0].meta_description || 'Real estate website',
        meta_keywords: globalSeo[0].meta_keywords || 'real estate, properties, buy, sell, rent'
      };
    }
    
    // Fallback to the most recent SEO settings
    const [rows] = await pool.query('SELECT * FROM site_seo ORDER BY id DESC LIMIT 1');
    
    if (rows.length > 0) {
      return {
        meta_title: rows[0].meta_title || 'My Website',
        meta_description: rows[0].meta_description || 'Real estate website',
        meta_keywords: rows[0].meta_keywords || 'real estate, properties, buy, sell, rent'
      };
    }
    
    return {
      meta_title: 'My Website',
      meta_description: 'Real estate website',
      meta_keywords: 'real estate, properties, buy, sell, rent'
    };
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return {
      meta_title: 'My Website',
      meta_description: 'Real estate website',
      meta_keywords: 'real estate, properties, buy, sell, rent'
    };
  }
}

export async function generateMetadata() {
  const seo = await getSEOSettings();
  
  return {
    title: seo.meta_title,
    description: seo.meta_description,
    keywords: seo.meta_keywords,
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Favicon */}
        <link rel="icon" href="/assets/images/img/logo-main.png" type="image/png" />
        
        {/* Google Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,200;1,300;1,400;1,500;1,600;1,700;1,800&amp;family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&amp;display=swap"
          rel="stylesheet"></link>
        {/* Icons */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        />

        {/* Plugin CSS */}
        <link rel="stylesheet" href="/assets/css/plugins/magnific-popup.css" />
        <link rel="stylesheet" href="/assets/css/plugins/nice-select.css" />
        <link rel="stylesheet" href="/assets/css/plugins/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/assets/css/style.css" />
      </head>

      <body suppressHydrationWarning>

        <ClientLayout>
          {children}
        </ClientLayout>

        {/* 1️ jQuery FIRST */}
        <Script
          src="/assets/js/vendor/jquery-3.6.0.min.js"
          strategy="beforeInteractive"
        />

        <Script
          src="/assets/js/vendor/jquery-migrate-3.3.2.min.js"
          strategy="beforeInteractive"
        />

        {/* 2️ jQuery Plugins */}
        <Script src="/assets/js/plugins/jquery.ajaxchimp.min.js" />
        <Script src="/assets/js/plugins/jquery.magnific-popup.min.js" />
        <Script src="/assets/js/plugins/jquery.nice-select.min.js" />
        <Script src="/assets/js/plugins/jquery.counterup.min.js" />
        <Script src="/assets/js/plugins/jquery.waypoints.js" />
        <Script src="/assets/js/plugins/parallax.min.js" />
        <Script src="/assets/js/plugins/popper.min.js" />
        <Script src="/assets/js/plugins/swiper-bundle.min.js" />
        <Script src="/assets/js/plugins/map-place.js" />

        {/* 3️ MAIN JS — ONLY ONCE, ALWAYS LAST */}
        <Script src="/assets/js/main.js" />
      </body>
    </html>
  );
}
