import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "TaskFlow",
    short_name: "TaskFlow",
    description: "Task manager dashboard built with Next.js and FSD",
    start_url: "/ru",
    display: "standalone",
    background_color: "#f7f2e8",
    theme_color: "#206a5d",
    icons: [
      {
        src: "/icon",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };
}
