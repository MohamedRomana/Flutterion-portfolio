import { EditorialList } from "@/components/ui/EditorialList";
import { skillGroups } from "@/data/skills";

export function Skills() {
  return (
    <EditorialList
      id="skills"
      ariaLabel="Flutter engineering skills"
      index="04"
      eyebrow="Engineering"
      title={
        <>
          The Flutter <span className="text-gradient">engineering stack.</span>
        </>
      }
      description="A capability map of the tools and patterns I use in production — every item is drawn from real, shipped work."
      items={skillGroups.map((g, i) => ({
        n: String(i + 1).padStart(2, "0"),
        title: g.title,
        description: "",
        tags: g.skills,
      }))}
    />
  );
}
