import { EditorialList } from "@/components/ui/EditorialList";

/**
 * Each capability maps to something demonstrated in the CV/projects —
 * no invented specialisations.
 */
const specializations = [
  {
    title: "Cross-Platform Apps",
    description:
      "One Dart codebase shipping polished iOS and Android apps — responsive across every screen size with ScreenUtil.",
  },
  {
    title: "State Management",
    description:
      "Scalable, testable state with BLoC and Cubit — including a Finite State Machine for complex multi-role workflows.",
  },
  {
    title: "Real-Time Features",
    description:
      "Live data synchronisation, order tracking, and Firebase push notifications that keep users instantly in sync.",
  },
  {
    title: "API Integration",
    description:
      "Robust REST integration with Dio — typed models, interceptors, and structured error handling end to end.",
  },
  {
    title: "Clean Architecture",
    description:
      "SOLID principles, MVVM, and reusable modules that keep large apps maintainable as they grow.",
  },
  {
    title: "Performance",
    description:
      "Smooth, optimised UIs tuned for government-scale data and demanding, media-heavy real-world workloads.",
  },
];

export function Specialization() {
  return (
    <EditorialList
      id="specialization"
      ariaLabel="Flutter specialization"
      className="bg-background-secondary"
      index="01"
      eyebrow="Specialization"
      title={
        <>
          Built for <span className="text-gradient">mobile excellence.</span>
        </>
      }
      description="My work centres on the parts of mobile engineering that decide whether an app feels premium — architecture, real-time behaviour, and performance."
      items={specializations.map((s, i) => ({
        n: String(i + 1).padStart(2, "0"),
        title: s.title,
        description: s.description,
      }))}
    />
  );
}
