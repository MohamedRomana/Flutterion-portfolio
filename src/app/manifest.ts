import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mohamed Romana | Flutter Developer Portfolio",
    short_name: "Mohamed Romana",
    description:
      "Flutter developer portfolio showcasing high-performance mobile applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b16",
    theme_color: "#050b16",
    icons: [
      {
        src: "/logo-icon.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
