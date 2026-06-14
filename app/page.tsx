import Link from "next/link";
import { supabase } from "@/lib/supabase";
import CreateProjectModal from "@/components/CreateProjectModal";

export default async function Home() {
  const { data: projects, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <main className="p-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">PMIS Dashboard</h1>

        <CreateProjectModal />
      </div>

      <h2 className="text-xl font-semibold mb-4">Active Projects</h2>

      {error && <p className="text-red-500">Error: {error.message}</p>}

      {projects?.length === 0 && <p>Belum ada project.</p>}

      <div className="grid grid-cols-5 gap-4">
        {projects?.map((project) => (
          <Link key={project.id} href={`/projects/${project.id}`} prefetch={true}>
            <div className="border rounded-lg p-4 shadow hover:shadow-lg transition cursor-pointer">
              <h3 className="font-bold">📁 {project.project_name}</h3>
              <p>{project.description}</p>

              <p className="text-sm mt-2">PM: {project.project_manager}</p>

              <p className="text-sm">Status: {project.status}</p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
