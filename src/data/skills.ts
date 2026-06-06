import type { SkillGroup, Stat, ProcessStep } from "@/types";

/**
 * Skills below are limited to what the CV explicitly lists or what is
 * demonstrably used across the documented projects (RGA/AdEC, Almustarih,
 * etc.). No speculative skills (WebSocket, CI/CD, Flavors…) are claimed
 * because the CV does not confirm them.
 */
export const skillGroups: SkillGroup[] = [
  {
    title: "Languages & Framework",
    icon: "Code2",
    skills: ["Dart", "Flutter", "Advanced UI", "Responsive UI (ScreenUtil)"],
  },
  {
    title: "State Management",
    icon: "Workflow",
    skills: ["BLoC", "Cubit", "Finite State Machine", "MVVM Pattern"],
  },
  {
    title: "Architecture & Quality",
    icon: "Boxes",
    skills: ["Clean Code", "SOLID", "OOP", "Reusable Modules", "Error Handling"],
  },
  {
    title: "Networking & Backend",
    icon: "Server",
    skills: ["REST APIs", "Dio", "HTTP", "Firebase"],
  },
  {
    title: "Maps & Location",
    icon: "MapPin",
    skills: ["Google Maps API", "Geolocator", "Real-time Location"],
  },
  {
    title: "Realtime & Media",
    icon: "BellRing",
    skills: [
      "Firebase Push Notifications",
      "Firebase Messaging",
      "Real-time Sync",
      "Media Upload (docs / photos / video)",
      "Audio Playback",
    ],
  },
  {
    title: "Tooling",
    icon: "GitBranch",
    skills: ["Git", "GitHub", "Problem Solving"],
  },
];

/**
 * The tech-stack marquee. Each item is verified across the CV/projects.
 */
export const techStack: string[] = [
  "Flutter",
  "Dart",
  "BLoC",
  "Cubit",
  "MVVM",
  "Dio",
  "REST APIs",
  "Firebase",
  "Firebase Messaging",
  "Google Maps",
  "Geolocator",
  "ScreenUtil",
  "SOLID",
  "Clean Architecture",
  "Git",
  "GitHub",
];

/**
 * Stats use only real, verifiable numbers — no invented metrics.
 * 10 = shipped apps in this portfolio. 5 = roles in the RGA platform (CV).
 * 2 = iOS + Android. The fourth stat is a factual status, not a metric.
 */
export const stats: Stat[] = [
  { value: 10, display: "10", label: "Flutter apps designed & built", suffix: "" },
  { value: 2, display: "2", label: "Platforms shipped — iOS & Android", suffix: "" },
  { value: 5, display: "5", label: "User roles in the flagship RGA platform", suffix: "" },
  { value: null, display: "BLoC", label: "First architecture, every project", suffix: "" },
];

export const processSteps: ProcessStep[] = [
  {
    step: "01",
    title: "Discover & Architect",
    description:
      "Clarify the product goals, model the domain, and choose the architecture — BLoC/Cubit, repositories, and a clean folder structure that scales.",
    icon: "Compass",
  },
  {
    step: "02",
    title: "Build the UI",
    description:
      "Translate designs into pixel-accurate, responsive Flutter widgets with ScreenUtil, handling RTL/Arabic layouts and every device size.",
    icon: "LayoutTemplate",
  },
  {
    step: "03",
    title: "Wire the Logic",
    description:
      "Connect REST APIs with Dio, manage state with BLoC, and add real-time features, notifications, maps, and media — with robust error handling.",
    icon: "Cable",
  },
  {
    step: "04",
    title: "Polish & Ship",
    description:
      "Optimise performance, test flows across roles, and prepare release builds for the App Store and Google Play.",
    icon: "Rocket",
  },
];
