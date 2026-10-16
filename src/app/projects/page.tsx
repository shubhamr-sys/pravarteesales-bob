import type { Metadata } from "next";
import { getProjects, selectMajorProjects } from "@/lib/getProjects";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Pravartee Sales",
  description:
    "Explore Pravartee Sales government IT projects across defence, municipal, state departments, and public sector undertakings.",
};

export default async function ProjectsPage() {
  const all = await getProjects();
  const projects = selectMajorProjects(all, 5);
  return <ProjectsContent projects={projects} />;
}
