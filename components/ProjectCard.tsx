import Link from "next/link";
import { ArrowUpRight, Github } from "lucide-react";

interface ProjectCardProps {
  slug: string;
  title: string;
  description: string;
  tech: string[];
  github: string;
  viewOnGithubLabel?: string;
  viewDetailsLabel?: string;
}

export default function ProjectCard({ slug, title, description, tech, github, viewOnGithubLabel = "View on GitHub", viewDetailsLabel = "View details" }: ProjectCardProps) {
  return (
    <div className="group flex flex-col justify-between rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <h3 className="text-2xl font-semibold leading-none tracking-tight group-hover:text-primary transition-colors">
            {title}
          </h3>
          <div className="flex items-center gap-3">
            <Link
              href={`/projects/${slug}/`}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowUpRight className="h-5 w-5" />
              <span className="sr-only">{viewDetailsLabel}</span>
            </Link>
            <Link
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Github className="h-5 w-5" />
              <span className="sr-only">{viewOnGithubLabel}</span>
            </Link>
          </div>
        </div>
        <p className="text-muted-foreground">{description}</p>
      </div>
      
      <div className="p-6 pt-0 mt-auto">
        <div className="flex flex-wrap gap-2">
          {tech.map((t) => (
            <span
              key={t}
              className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary/10 text-primary hover:bg-primary/20"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
