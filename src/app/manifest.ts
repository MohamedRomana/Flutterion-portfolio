import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Flutterion | Flutter Developer Portfolio",
    short_name: "Flutterion",
    description:
      "Flutter developer portfolio showcasing high-performance mobile applications.",
    start_url: "/",
    display: "standalone",
    background_color: "#050b16",
    theme_color: "#050b16",
    icons: [
      {
        src: "/logo.png",
        sizes: "1672x941",
        type: "image/png",
      },
    ],
  };
}
