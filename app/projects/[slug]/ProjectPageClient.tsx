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

  const techGroups = useMemo(
    () => normalizeTechStack(project?.techStack),
    [project?.techStack]
  );
  const techItems = useMemo(() => techGroups.flatMap((g) => g.items), [techGroups]);
  const techCount = techItems.length;

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

  if (project.slug === "aerokpi-forge") {
    const paperUrl = withBasePath("/project%20assets/AeroKpi%20Forge/paper/rapport_walid_benmaarouf.pdf") ?? "/project%20assets/AeroKpi%20Forge/paper/rapport_walid_benmaarouf.pdf";
    const aeroNav = [
      { id: "overview", label: "Overview" },
      { id: "system", label: "System" },
      { id: "decisions", label: "Decisions" },
      { id: "evidence", label: "Evidence" },
      { id: "contribution", label: "Contribution" },
      { id: "stack", label: "Stack" },
    ];

    const processStages = [
      {
        title: "1. Ingest",
        text: "PDFs are parsed as a mix of native text, tables, charts, and scanned content, then consolidated into one document view with metadata and page context.",
      },
      {
        title: "2. Split by company and period",
        text: "Each report can contain multiple airlines and reporting windows; the pipeline isolates the relevant business unit before retrieval begins.",
      },
      {
        title: "3. Retrieve the missing variables",
        text: "The system combines semantic similarity with a signed symbolic representation to look for the fragments that can actually reconstruct a KPI.",
      },
      {
        title: "4. Reconstruct and validate",
        text: "A dependency graph exposes possible calculation paths, while deterministic rules and a correction agent check units, periods, and math consistency.",
      },
      {
        title: "5. Export and monitor",
        text: "Valid outputs are persisted as structured KPI records with traceable provenance, latency, throughput, and cost observability.",
      },
    ];

    return (
      <div>
        <section className="relative overflow-hidden border-b">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(148,163,184,0.18),_transparent_60%)]" />
          <div className="container mx-auto px-4 md:px-6">
            <div className="relative py-16 md:py-24 max-w-5xl">
              <Link href="/#projects" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="h-4 w-4" /> Back to projects
              </Link>

              <div className="mt-8 inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-foreground/70">
                AI engineering case study
              </div>

              <h1 className="mt-6 text-4xl md:text-6xl font-semibold tracking-tight">
                From airline financial reports to traceable KPI outputs.
              </h1>

              <p className="mt-5 max-w-3xl text-lg md:text-xl text-muted-foreground">
                AeroKpi Forge turns heterogeneous airline financial PDFs into structured KPI data with a workflow designed for document understanding, dependency-aware reconstruction, and operational traceability.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {['PDF ingestion', 'Hybrid retrieval', 'Dependency graph', 'Validation'].map((tag) => (
                  <span key={tag} className="inline-flex items-center rounded-full border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80">{tag}</span>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                  GitHub repository <Github className="h-4 w-4" />
                </Link>
                <Link href={paperUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                  Read the paper <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        <div className="sticky top-16 z-40 border-b bg-background/75 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex items-center gap-2 overflow-x-auto py-3">
              {aeroNav.map((tab) => (
                <Link key={tab.id} href={`#${tab.id}`} className="shrink-0 rounded-full px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors">{tab.label}</Link>
              ))}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 md:px-6">
          <div className="py-14 md:py-20 space-y-14 md:space-y-18">
            <section id="overview" className="scroll-mt-32">
              <div className="grid gap-8 md:grid-cols-[1.2fr_0.8fr]">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">Problem</p>
                  <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Financial reports are hard to turn into reliable KPI data.</h2>
                  <div className="mt-5 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      Airline financial documents are not clean tables: they mix native text, scanned pages, tables, and charts, and they often describe multiple airlines and multiple reporting periods in the same PDF.
                    </p>
                    <p>
                      A KPI is not always directly written in one place. In many cases it must be reconstructed from several related variables, each appearing in different sections of the report with different units, wording, or date context.
                    </p>
                  </div>
                </div>

                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Fast facts</h3>
                    <dl className="mt-5 space-y-4 text-sm">
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">Project type</dt>
                        <dd className="font-medium text-right">AI document pipeline</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">Inputs</dt>
                        <dd className="font-medium text-right">Heterogeneous PDF reports</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">Core approach</dt>
                        <dd className="font-medium text-right">Hybrid retrieval + dependency graph</dd>
                      </div>
                      <div className="flex items-start justify-between gap-4">
                        <dt className="text-muted-foreground">My role</dt>
                        <dd className="font-medium text-right">Design, implementation, industrialization</dd>
                      </div>
                    </dl>
                  </div>
                </GlassCard>
              </div>
            </section>

            <section id="system" className="scroll-mt-32">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">How it works</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">A modular pipeline turns raw documents into structured KPI evidence.</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-5">
                {processStages.map((stage) => (
                  <div key={stage.title} className="rounded-2xl border bg-background/60 p-5 md:p-6 h-full">
                    <div className="text-sm font-semibold text-foreground">{stage.title}</div>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{stage.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
                <GlassCard>
                  <div className="overflow-hidden rounded-2xl border bg-background/40">
                    <img src={withBasePath(project.gallery?.[0] ?? "/project%20assets/AeroKpi%20Forge/data_architecture/simplified_architecture.png")} alt="AeroKpi Forge architecture diagram showing multimodal ingestion, retrieval, dependency graph, validation, and KPI output." className="h-full w-full object-cover" />
                  </div>
                </GlassCard>

                <div className="space-y-4">
                  <GlassCard>
                    <div className="p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Why it matters</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        The system separates document understanding from numerical reasoning. LLMs handle contextual interpretation and planning; deterministic components handle the calculations, validations, and unit checks that must be auditable.
                      </p>
                    </div>
                  </GlassCard>

                  <GlassCard>
                    <div className="p-5">
                      <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Operational constraint</h3>
                      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                        The architecture preserves parallel processing while applying hierarchical token quotas, retries, observability, and export workflows to keep the pipeline usable in production.
                      </p>
                    </div>
                  </GlassCard>
                </div>
              </div>
            </section>

            <section id="decisions" className="scroll-mt-32">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">Decisions</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Two engineering choices made the system more reliable.</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <GlassCard>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">Challenge</p>
                    <h3 className="mt-3 text-2xl font-semibold">Semantic similarity was not enough.</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      A document fragment could be intuitively relevant without containing the information needed to compute a KPI. A retrieval system based only on vector similarity could miss the complementary variables required for reconstruction.
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Decision:</strong> use a hybrid approach combining semantic search with a signed symbolic representation of KPI dependencies.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Why it matters:</strong> the system searches not only for similar text, but for the information that can actually complete a valid calculation path.
                    </p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6 md:p-8">
                    <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">Challenge</p>
                    <h3 className="mt-3 text-2xl font-semibold">A single LLM pass was too brittle.</h3>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      The KPI task includes interpretation, multilingual/heterogeneous reporting language, and strict numerical consistency requirements. A probabilistic pass alone cannot safely control every arithmetic and unit check.
                    </p>
                    <p className="mt-4 text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Decision:</strong> separate symbolic extraction, dependency graph reasoning, deterministic math, and validation into explicit stages.
                    </p>
                    <p className="mt-2 text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Why it matters:</strong> this keeps the system auditable, limits silent failure, and allows targeted correction when a single semantic step goes wrong.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </section>

            <section id="evidence" className="scroll-mt-32">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">Results and evidence</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Measured results, not inflated claims.</h2>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <GlassCard>
                  <div className="p-6">
                    <div className="text-3xl font-semibold tracking-tight">4,725</div>
                    <p className="mt-2 text-sm text-muted-foreground">KPI checks evaluated across 525 company-period outputs derived from 300 reports.</p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6">
                    <div className="text-3xl font-semibold tracking-tight">99.08%–100%</div>
                    <p className="mt-2 text-sm text-muted-foreground">Measured accuracy on historical ground truth, depending on the company and configuration evaluated.</p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6">
                    <div className="text-3xl font-semibold tracking-tight">~5.6–13 min</div>
                    <p className="mt-2 text-sm text-muted-foreground">Average runtime per output; cost remained in the low single-digit dollar range per report path depending on complexity and model calls.</p>
                  </div>
                </GlassCard>
              </div>

              <div className="mt-8 rounded-2xl border bg-background/60 p-6 md:p-8">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/60">Comparison context</p>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  The previous external process was reported at roughly 95% accuracy, usually took one to two weeks, and cost around $30 per airline-period. The developed system improved both turnaround time and traceability while retaining deterministic checks on the outputs it generated.
                </p>
              </div>
            </section>

            <section id="contribution" className="scroll-mt-32">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">My contribution</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">I worked across the design, implementation, and productionization of the pipeline.</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <GlassCard>
                  <div className="p-6 md:p-8">
                    <p className="text-muted-foreground leading-relaxed">
                      I contributed to the multimodal ingestion and document understanding flow, the hybrid retrieval layer, the dependency-aware reconstruction logic, and the validation / observability mechanisms that turned the prototype into a deployable system.
                    </p>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6 md:p-8">
                    <p className="text-muted-foreground leading-relaxed">
                      I also helped shape the production pattern around asynchronous processing, token-budget regulation, metrics tracking, and structured export, which was critical for making the pipeline reliable in an industrial environment.
                    </p>
                  </div>
                </GlassCard>
              </div>
            </section>

            <section id="stack" className="scroll-mt-32">
              <div className="mb-8">
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-foreground/60">Stack and links</p>
                <h2 className="mt-3 text-3xl md:text-4xl font-semibold tracking-tight">Tools used where they mattered most.</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Document processing</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>• PDF parsing and OCR</li>
                      <li>• Table detection</li>
                      <li>• Vision-language analysis</li>
                      <li>• Metadata extraction</li>
                    </ul>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Retrieval and AI</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Embeddings and semantic search</li>
                      <li>• Signed symbolic retrieval</li>
                      <li>• LLM re-ranking and planning</li>
                      <li>• Dependency graph reasoning</li>
                    </ul>
                  </div>
                </GlassCard>

                <GlassCard>
                  <div className="p-6">
                    <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-foreground/70">Data and operations</h3>
                    <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                      <li>• Python</li>
                      <li>• AWS S3 and Bedrock</li>
                      <li>• Jenkins, Docker, CI/CD</li>
                      <li>• Redis, SQS, Spark, Scala</li>
                    </ul>
                  </div>
                </GlassCard>
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={project.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground hover:opacity-90 transition-opacity">
                  GitHub repository <Github className="h-4 w-4" />
                </Link>
                <Link href={paperUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full border bg-background/60 px-5 py-2.5 text-sm font-medium hover:bg-muted transition-colors">
                  Read the report <ExternalLink className="h-4 w-4" />
                </Link>
              </div>
            </section>

            <div className="pt-4">
              <Link href="/#projects" className="inline-flex items-center gap-2 text-sm font-medium hover:underline">
                <ArrowLeft className="h-4 w-4" /> Back to projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (project.slug === "data-quality") {
    const dataQualitySteps = [
      "S3 input",
      "Discover",
      "Validate",
      "Spark / Deequ",
      "Metrics + checks",
      "Missing? Retry later",
    ];

    return (
      <div className="bg-[#071a33] text-white">
        <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 lg:px-10">
          <div className="mb-10 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
            <span>10 — Data Quality</span>
          </div>

          <h1 className="text-4xl font-semibold tracking-tight md:text-7xl">
            <span className="text-cyan-300">[Air Rev]</span>
            <span className="mx-4 text-slate-300">—</span>
            <span className="text-white">Almatar Data Quality Pipeline</span>
          </h1>

          <p className="mt-7 max-w-6xl text-lg leading-relaxed text-slate-300 md:text-2xl">
            Almatar delivers booking benchmark fares to S3 periodically. The campaign integrates that dataset into the team&apos;s existing Data Quality framework, which verifies automatically that incoming data is complete, consistent and usable.
          </p>

          <div className="mt-10 overflow-hidden rounded-xl border border-cyan-400/40 bg-[#050d1e] shadow-[0_0_0_1px_rgba(34,211,238,0.08)]">
            <div className="grid gap-3 bg-[#070f1c] p-5 md:grid-cols-6 md:p-8">
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100 shadow-inner shadow-cyan-500/10">
                CSV / Parquet / JSON
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                File discovery and date filtering
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                Deequ analyzers
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                Metrics output
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                DQFailureEmailApp
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                YAML configuration
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                DataQualityApp
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                Spark DataFrame
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                Deequ constraints
              </div>
              <div className="flex min-h-[70px] items-center justify-center rounded-lg border border-cyan-400/40 bg-slate-900/40 px-4 text-center text-sm text-cyan-100">
                Checks output
              </div>
            </div>
          </div>

          <div className="mt-10 grid gap-5 border-t border-slate-700 pt-6 md:grid-cols-4">
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">Completeness</div>
              <div className="mt-2 text-2xl font-semibold text-white">Critical fields ≈ 98%</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">Format &amp; domain</div>
              <div className="mt-2 text-2xl font-semibold text-white">Dates, airports, airlines, cabins</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">Business consistency</div>
              <div className="mt-2 text-2xl font-semibold text-white">Non-negative durations and values</div>
            </div>
            <div>
              <div className="text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300">Delivery control</div>
              <div className="mt-2 text-2xl font-semibold text-white">Expected files; missing or late tracked</div>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-cyan-400/50 bg-[#0b1733] p-5 md:p-8">
            <div className="flex items-center gap-4 text-sm uppercase tracking-[0.2em] text-cyan-300">
              <span className="inline-flex rounded border border-cyan-400/50 px-2 py-1">Status</span>
              <span className="text-lg font-medium text-white">The Almatar campaign is under review as a pull request and runs successfully on the Jenkins test environment, with the output checked — awaiting approval to be deployed to production.</span>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-2 border-t border-slate-700 pt-6 text-slate-300 md:flex-row md:items-end md:justify-between">
            <div className="text-3xl font-semibold tracking-tight text-white">aMaDeus</div>
            <div className="text-sm uppercase tracking-[0.18em] text-cyan-300">Spark · Scala · Deequ · S3 · EMR · Jenkins</div>
            <div className="text-xs uppercase tracking-[0.2em] text-orange-300">Confidential</div>
          </div>

          <div className="mt-14 border-t border-slate-700 pt-10">
            <div className="mb-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.2em] text-cyan-300/90">
              <span>11 — Reliability</span>
            </div>

            <h2 className="text-4xl font-semibold tracking-tight text-white md:text-7xl">
              <span className="text-cyan-300">[Air Rev]</span>
              <span className="mx-4 text-slate-300">—</span>
              <span className="text-white">What it took to make it reliable to run</span>
            </h2>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              <div className="rounded-xl border border-slate-700 bg-[#0a1530] p-6">
                <div className="text-2xl font-medium text-cyan-300">01</div>
                <h3 className="mt-4 text-3xl font-semibold text-white">Missing or late files</h3>
                <p className="mt-4 text-lg text-slate-300">A dataset may not arrive when expected.</p>
                <p className="mt-3 text-lg text-slate-300">Missed dates are persisted and retried automatically.</p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#0a1530] p-6">
                <div className="text-2xl font-medium text-cyan-300">02</div>
                <h3 className="mt-4 text-3xl font-semibold text-white">Mixed files in one location</h3>
                <p className="mt-4 text-lg text-slate-300">The S3 path can hold other feeds.</p>
                <p className="mt-3 text-lg text-slate-300">Strict filename discovery — contributed back to the shared framework.</p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#0a1530] p-6">
                <div className="text-2xl font-medium text-cyan-300">03</div>
                <h3 className="mt-4 text-3xl font-semibold text-white">Automated execution</h3>
                <p className="mt-4 text-lg text-slate-300">The pipeline needs to run automatically.</p>
                <p className="mt-3 text-lg text-slate-300">Shell script prepares the run and launches the Data Quality job.</p>
              </div>

              <div className="rounded-xl border border-slate-700 bg-[#0a1530] p-6">
                <div className="text-2xl font-medium text-cyan-300">04</div>
                <h3 className="mt-4 text-3xl font-semibold text-white">End-to-end testing</h3>
                <p className="mt-4 text-lg text-slate-300">Changes must work with realistic Almatar data.</p>
                <p className="mt-3 text-lg text-slate-300">Integration test validates the complete pipeline.</p>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              {dataQualitySteps.map((step) => (
                <span key={step} className="inline-flex items-center rounded-lg border border-cyan-400/50 bg-[#0d1c39] px-4 py-2 text-base text-slate-200">
                  {step}
                </span>
              ))}
            </div>

            <p className="mt-10 text-4xl font-semibold leading-tight text-white md:text-6xl">
              Data quality is also about making delivery observable, recoverable and safe to operate — which is what makes Almatar ready to deploy.
            </p>
          </div>
        </div>
      </div>
    );
  }

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
                          href={withBasePath(href) ?? href}
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
