import { EditorialList } from "@/components/ui/EditorialList";
import { processSteps } from "@/data/skills";

export function Process() {
  return (
    <EditorialList
      id="process"
      ariaLabel="Development process"
      index="06"
      eyebrow="Process"
      title={
        <>
          From idea to <span className="text-gradient">store.</span>
        </>
      }
      description="A pragmatic, repeatable flow that keeps quality high from the first widget to the release build."
      items={processSteps.map((s) => ({
        n: s.step,
        title: s.title,
        description: s.description,
      }))}
    />
  );
}
