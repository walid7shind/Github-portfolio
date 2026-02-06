import { notFound } from "next/navigation";
import type { Metadata } from "next";
import ProjectPageClient from "./ProjectPageClient";
import { allProjectPages, getProjectPageBySlug } from "@/lib/data";

export function generateStaticParams() {
  return allProjectPages.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectPageBySlug(slug);
  if (!project) return { title: "Project" };

  return {
    title: `${project.title} — Portfolio`,
    description: project.punchline ?? project.overview ?? project.description,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectPageBySlug(slug);
  if (!project) notFound();

  return <ProjectPageClient slug={slug} />;
}
