import { EditorialList } from "@/components/ui/EditorialList";
import { services } from "@/data/services";

export function Services() {
  return (
    <EditorialList
      id="services"
      ariaLabel="Services"
      index="08"
      eyebrow="Services"
      title={
        <>
          How I can <span className="text-gradient">help you ship.</span>
        </>
      }
      description="From a single screen to a full multi-role product — capabilities drawn directly from work I've already delivered."
      items={services.map((s, i) => ({
        n: String(i + 1).padStart(2, "0"),
        title: s.title,
        description: s.description,
        tags: s.features,
      }))}
    />
  );
}
