import { projectDataDetail } from "../share/data";
import { notFound } from "next/navigation";
import Section from "../../components/Section";

export default function ProjectDetailPage({
                                              params,
                                          }: {
    params: { slug: string };
}) {
    const project = projectDataDetail.find(p => p.slug === params.slug);
    if (!project) notFound();

    return (
        <main className="max-w-4xl mx-auto px-6 py-20">
            {/* Header */}
            <header className="mb-16">
                <h1 className="text-4xl font-bold text-white mb-4">
                    {project.title}
                </h1>

                <p className="text-gray-400 max-w-2xl mb-6">
                    {project.summary}
                </p>

                <div className="flex flex-wrap gap-3 text-sm text-gray-400">
          <span className="px-3 py-1 rounded-full bg-neutral-800">
            {project.context}
          </span>
                    <span>{project.duration}</span>
                </div>

                <div className="mt-4 text-sm text-emerald-400">
                    Tech: {project.tech.join(" · ")}
                </div>
            </header>

            <Section title="Overview">
                <p>{project.overview}</p>
            </Section>

            <Section title="My Role">
                <ul>
                    {project.role.map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </Section>

            <Section title="Key Challenges">
                <ul>
                    {project.challenges.map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </Section>

            <Section title="Solutions & Decisions">
                <ul>
                    {project.solutions.map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </Section>

            <Section title="Outcome">
                <ul>
                    {project.outcomes.map((item, i) => (
                        <li key={i}>• {item}</li>
                    ))}
                </ul>
            </Section>
        </main>
    );
}
