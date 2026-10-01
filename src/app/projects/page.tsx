import type { Metadata } from "next";
import ProjectsContent from "./ProjectsContent";

export const metadata: Metadata = {
  title: "Projects | Pravartee Sales",
  description:
    "Explore Pravartee Sales government IT projects across defence, municipal, state departments, and public sector undertakings.",
};

export default function ProjectsPage() {
  return <ProjectsContent />;
}
