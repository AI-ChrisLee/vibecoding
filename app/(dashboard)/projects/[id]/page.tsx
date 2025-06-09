import { notFound } from "next/navigation";

type Props = { params: { id: string } };

export default async function ProjectPage({ params }: Props) {
  const { id } = params;

  // 🔑  fetch project data here; fake for now
  const project = { id, name: `Project ${id}` };

  if (!project) notFound();

  return (
    <section className="space-y-6">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p className="text-muted-foreground">Project ID: {id}</p>
    </section>
  );
}