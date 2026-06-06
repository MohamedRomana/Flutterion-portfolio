import type { Service, TimelineEntry } from "@/types";

/**
 * Services are framed from the verified skill set in the CV — they
 * describe capabilities actually demonstrated across the projects, not
 * invented offerings or guarantees.
 */
export const services: Service[] = [
  {
    title: "Flutter App Development",
    description:
      "End-to-end cross-platform apps for iOS and Android from a single Dart codebase — from first screen to store release.",
    icon: "Smartphone",
    features: ["iOS & Android", "Single codebase", "Store-ready builds"],
  },
  {
    title: "State Management & Architecture",
    description:
      "Scalable, maintainable apps built on BLoC/Cubit and MVVM, with SOLID principles, clean code, and reusable modules.",
    icon: "Workflow",
    features: ["BLoC / Cubit", "Clean architecture", "SOLID & reusable code"],
  },
  {
    title: "API Integration",
    description:
      "Reliable REST integration with Dio and HTTP — typed models, structured error handling, and smooth data flows.",
    icon: "Plug",
    features: ["REST APIs", "Dio / HTTP", "Robust error handling"],
  },
  {
    title: "Realtime & Notifications",
    description:
      "Live, connected experiences with Firebase push notifications, in-app messaging, and real-time data synchronisation.",
    icon: "BellRing",
    features: ["Firebase push", "In-app messaging", "Real-time sync"],
  },
  {
    title: "Maps & Geolocation",
    description:
      "Location-aware features powered by Google Maps and Geolocator — tracking, geolocated inspections, and delivery flows.",
    icon: "MapPin",
    features: ["Google Maps", "Geolocator", "Live tracking"],
  },
  {
    title: "UI / UX Implementation",
    description:
      "Pixel-accurate, responsive interfaces with ScreenUtil — including Arabic / RTL layouts and advanced, polished UI.",
    icon: "Sparkles",
    features: ["Responsive UI", "RTL / Arabic", "Advanced UI"],
  },
];

/**
 * Timeline contains only dated, verifiable facts from the CV. No
 * fabricated roles or dates are added.
 */
export const timeline: TimelineEntry[] = [
  {
    period: "Dec 2024 — Present",
    title: "Flutter Developer",
    organization: "Efadh For Web Solution",
    description:
      "Building production Flutter applications full-time, including a large-scale platform for the Roads General Authority (RGA) in Saudi Arabia — multi-role workflows, geolocation inspections, and real-time data synchronisation.",
    type: "work",
    current: true,
  },
  {
    period: "2021 — 2025",
    title: "B.Sc. in Computer Science",
    organization: "Mansoura University",
    description:
      "Bachelor of Science in Computer Science, building the foundations in OOP, problem solving, and software engineering that underpin my Flutter work.",
    type: "education",
  },
];
