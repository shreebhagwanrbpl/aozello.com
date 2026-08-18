export default function robots() {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/api/",
                    "/*?*search=",
                    "/*?*sort=",
                    "/*?*filter=",
                ],
            },
        ],
        sitemap: "https://aozello.com/sitemap.xml",
    };
}