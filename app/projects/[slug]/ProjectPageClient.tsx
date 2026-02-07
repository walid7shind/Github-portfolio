"use client";

import Link from "next/link";
import { useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { ProjectPageItem } from "@/lib/data";
import { getProjectPageBySlug } from "@/lib/data";
import { withBasePath } from "@/lib/withBasePath";
import ProjectTabs, { type ProjectTab } from "@/components/projects/ProjectTabs";

type TechItem = {
  title: string;
  description?: string;
};

type TechGroup = {
  title: string;
  items: TechItem[];
};

function titleizeKey(key: string) {
  return key
    .replace(/[_-]+/g, " ")
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function parseTechLine(line: string): TechItem {
  const trimmed = line.trim();
  if (!trimmed) return { title: "" };

  // Prefer explicit separators
  const dashIdx = trimmed.indexOf(" - ");
  if (dashIdx > 0) {
    return {
      title: trimmed.slice(0, dashIdx).trim(),
      description: trimmed.slice(dashIdx + 3).trim(),
    };
  }

  const colonIdx = trimmed.indexOf(": ");
  if (colonIdx > 0) {
    return {
      title: trimmed.slice(0, colonIdx).trim(),
      description: trimmed.slice(colonIdx + 2).trim(),
    };
  }

  // Parentheses: "PyTorch (segmentation)" -> title + description
  const openParen = trimmed.indexOf("(");
  const closeParen = trimmed.lastIndexOf(")");
  if (openParen > 0 && closeParen > openParen) {
    return {
      title: trimmed.slice(0, openParen).trim(),
      description: trimmed.slice(openParen + 1, closeParen).trim(),
    };
  }

  return { title: trimmed };
}

function normalizeTechStack(input: ProjectPageItem["techStack"] | undefined): TechGroup[] {
  if (!input) return [];

  if (Array.isArray(input)) {
    const items = input
      .map(parseTechLine)
      .filter((i) => Boolean(i.title));
    return items.length ? [{ title: "Tech Stack", items }] : [];
  }

  const record = input as Record<string, string[]>;
  const groups: TechGroup[] = [];

  for (const [key, value] of Object.entries(record)) {
    const items = (value ?? []).map(parseTechLine).filter((i) => Boolean(i.title));
    if (items.length) groups.push({ title: titleizeKey(key), items });
  }

  return groups;
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full border bg-background/50 px-3 py-1 text-xs font-semibold text-foreground/90 backdrop-blur">
      {children}
    </span>
  );
}

function GlassCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border bg-background/60 backdrop-blur supports-[backdrop-filter]:bg-background/40 shadow-sm">
      {children}
    </div>
  );
}

function getProjectFromTranslator(tProjects: unknown, slug: string): ProjectPageItem | undefined {
  const pages = (tProjects as { pages?: ProjectPageItem[] } | undefined)?.pages;
  return pages?.find((p) => p.slug === slug);
}

export default function ProjectPageClient({ slug }: { slug: string }) {
  const { t } = useLanguage();

  const project = useMemo(() => {
    const fromLang = getProjectFromTranslator(t.projects, slug);
    return fromLang ?? getProjectPageBySlug(slug);
  }, [t.projects, slug]);

  const tabs: ProjectTab[] = useMemo(
    () => [
      { id: "overview", label: "Overview" },
      { id: "demo", label: "Demo" },
      { id: "gallery", label: "Gallery" },
      { id: "tech", label: "Tech" },
      { id: "details", label: "Details" },
    ],
    []
  );

  if (!project) {
    return (
      <div className="container mx-auto px-4 md:px-6 py-16">
        <p className="text-muted-foreground">Project not found.</p>
        <Link href="/#projects" className="inline-flex items-center gap-2 mt-4 text-sm font-medium hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>
      </div>
    );
  }

  const techGroups = useMemo(() => normalizeTechStack(project.techStack), [project.techStack]);
  const techItems = useMemo(() => techGroups.flatMap((g) => g.items), [techGroups]);
  const techCount = techItems.length;

  return (
    <div>
      {/* Full-width hero */}
      <section className="relative overflow-hidden border-b">
        <div className="absolute inset-0">
          {project.heroVideo ? (
            <video
              className="h-full w-full object-cover opacity-40"
              src={withBasePath(project.heroVideo)}
              autoPlay
              muted
              loop
              playsInline
            />
          ) : (
            <div className="h-full w-full bg-[radial-gradient(80%_60%_at_50%_10%,rgba(15,23,42,0.25),transparent),linear-gradient(to_bottom,rgba(2,6,23,0.08),transparent)] dark:bg-[radial-gradient(80%_60%_at_50%_10%,rgba(248,250,252,0.10),transparent),linear-gradient(to_bottom,rgba(2,6,23,0.35),transparent)]" />
          )}
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/30 to-background" />

        <div className="container mx-auto px-4 md:px-6">
          <div className="relative py-16 md:py-24 max-w-4xl">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>

            <div className="mt-8 flex flex-wrap gap-2">
              {techItems.slice(0, 4).map((item) => (
                <Pill key={`${item.title}-${item.description ?? ""}`}>{item.title}</Pill>
              ))}
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
              {project.title}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-muted-foreground max-w-2xl">
              {project.punchline ?? project.overview ?? project.description}
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              {project.demoUrl ? (
                <Link
                  href={project.demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                >
                  Live demo <ExternalLink className="h-4 w-4" />
                </Link>
              ) : (
                <span className="inline-flex items-center rounded-full border bg-background/50 px-5 py-2.5 text-sm font-medium text-muted-foreground backdrop-blur">
                  Demo coming soon
                </span>
              )}

              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border bg-background/50 px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
              >
                GitHub <Github className="h-4 w-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* Sticky tabs */}
      <ProjectTabs tabs={tabs} />

      {/* Section blocks */}
      <div className="container mx-auto px-4 md:px-6">
        <div className="py-14 md:py-20 space-y-12 md:space-y-16">
          <section id="overview" className="scroll-mt-32">
            <div className="grid gap-6 md:grid-cols-12 items-start">
              <div className="md:col-span-7">
                <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Overview</h2>
                <div className="mt-4 text-muted-foreground leading-relaxed space-y-4">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="leading-relaxed">{children}</p>,
                      strong: ({ children }) => <strong className="text-foreground font-semibold">{children}</strong>,
                      a: ({ children, href }) => (
                        <a
                          href={href}
                          className="underline underline-offset-4"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {children}
                        </a>
                      ),
                      ul: ({ children }) => <ul className="list-disc pl-5 space-y-1">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal pl-5 space-y-1">{children}</ol>,
                      li: ({ children }) => <li className="leading-relaxed">{children}</li>,
                    }}
                  >
                    {project.overview ?? project.description}
                  </ReactMarkdown>
                </div>
              </div>
              <div className="md:col-span-5">
                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-sm font-semibold text-foreground/80">At a glance</h3>
                    <div className="mt-4 space-y-3 text-sm">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Slug</span>
                        <span className="font-medium">{project.slug}</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Tech</span>
                        <span className="font-medium">{techCount} items</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-muted-foreground">Repo</span>
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium inline-flex items-center gap-1 hover:underline"
                        >
                          Open <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          <section id="demo" className="scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Demo</h2>
            <GlassCard>
              <div className="p-6 md:p-10">
                {project.demoUrl ? (
                  <div className="flex flex-col gap-4">
                    <p className="text-muted-foreground">Open the live demo in a new tab.</p>
                    <Link
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity"
                    >
                      Launch demo <ExternalLink className="h-4 w-4" />
                    </Link>
                  </div>
                ) : project.demoVideo || project.heroVideo ? (
                  <div className="grid gap-4">
                    <p className="text-muted-foreground">
                      Preview video. (Muted looping hero + playable demo.)
                    </p>
                    <div className="overflow-hidden rounded-2xl border bg-background/50">
                      <video
                        className="w-full h-auto"
                        src={withBasePath(project.demoVideo ?? project.heroVideo)}
                        controls
                        playsInline
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <p className="text-muted-foreground">No public demo yet. This page is ready—add a URL anytime.</p>
                    <p className="text-sm text-muted-foreground">Tip: set <span className="font-medium text-foreground/80">demoUrl</span> in <span className="font-medium text-foreground/80">lib/data.ts</span>.</p>
                  </div>
                )}
              </div>
            </GlassCard>
          </section>

          <section id="gallery" className="scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Gallery</h2>
            <p className="mt-3 text-muted-foreground">Screenshots, flows, and key moments.</p>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
              {(project.gallery && project.gallery.length > 0 ? project.gallery : ["", ""]).map((src, idx) => (
                <GlassCard key={`${src}-${idx}`}>
                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl">
                    {src ? (
                      // Intentionally not using next/image until you add real local assets.
                      // You can switch to <Image /> once you put images in /public.
                      <img src={withBasePath(src)} alt={`${project.title} screenshot ${idx + 1}`} className="h-full w-full object-cover" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-muted to-background flex items-center justify-center">
                        <div className="text-center px-6">
                          <p className="text-sm font-medium">Add screenshots</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Set <span className="font-medium text-foreground/80">gallery</span> in <span className="font-medium text-foreground/80">lib/data.ts</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </GlassCard>
              ))}
            </div>
          </section>

          <section id="tech" className="scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Tech</h2>
            <div className="mt-6 space-y-6">
              {techGroups.length > 0 ? (
                techGroups.map((group) => (
                  <GlassCard key={group.title}>
                    <div className="p-6 md:p-10">
                      <div className="flex items-center justify-between gap-4">
                        <h3 className="text-sm font-semibold tracking-wide text-foreground/80 uppercase">
                          {group.title}
                        </h3>
                        <span className="text-xs text-muted-foreground">{group.items.length} items</span>
                      </div>

                      <div className="mt-6 space-y-3">
                        {group.items.map((item) => (
                          <div
                            key={`${group.title}-${item.title}-${item.description ?? ""}`}
                            className="relative overflow-hidden rounded-xl border bg-background/40"
                          >
                            <div className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-primary/70 via-primary/30 to-transparent" />
                            <div className="p-4 pl-6">
                              <div className="text-sm font-semibold text-foreground">
                                {item.title}
                              </div>
                              {item.description ? (
                                <div className="mt-1 text-xs leading-relaxed text-muted-foreground">
                                  {item.description}
                                </div>
                              ) : null}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </GlassCard>
                ))
              ) : (
                <GlassCard>
                  <div className="p-6 md:p-10">
                    <p className="text-muted-foreground">No tech stack provided for this project yet.</p>
                  </div>
                </GlassCard>
              )}
            </div>
          </section>

          <section id="details" className="scroll-mt-32">
            <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Details</h2>
            <div className="grid gap-6 md:grid-cols-12">
              <div className="md:col-span-7">
                <GlassCard>
                  <div className="p-6 md:p-10">
                    <h3 className="text-sm font-semibold text-foreground/80">Project info</h3>
                    <div className="mt-6 space-y-4 text-sm">
                      <div className="flex items-start justify-between gap-6">
                        <span className="text-muted-foreground">Repository</span>
                        <Link
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium inline-flex items-center gap-1 hover:underline"
                        >
                          {project.github} <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>

                      {project.details &&
                        Object.entries(project.details).map(([k, v]) => (
                          <div key={k} className="flex items-start justify-between gap-6">
                            <span className="text-muted-foreground">{k}</span>
                            <span className="font-medium text-right">{v}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </GlassCard>
              </div>

              <div className="md:col-span-5">
                <GlassCard>
                  <div className="p-6 md:p-10">
                    <h3 className="text-sm font-semibold text-foreground/80">Next steps</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Enhance processing speed for real time use <span className="text-foreground/80 font-medium"></span></li>
                      <li>• Implement on embedded electronic system  <span className="text-foreground/80 font-medium"></span> </li>

                    </ul>
                  </div>
                </GlassCard>
              </div>
            </div>
          </section>

          <div className="pt-6">
            <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
              <ArrowLeft className="h-4 w-4" /> Back to projects
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
