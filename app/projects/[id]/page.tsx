import { supabase } from "@/lib/supabase";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ProjectPage({
  params,
}: PageProps) {
  const { id } = await params;

  const { data: project, error } = await supabase
    .from("projects")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !project) {
    return (
      <main className="p-10">
        <h1 className="text-2xl font-bold">
          Project tidak ditemukan
        </h1>
      </main>
    );
  }

  return (
    <main className="p-10 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          📁 {project.project_name}
        </h1>

        <p className="mt-2 text-gray-600">
          {project.description}
        </p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border rounded-lg p-4">
          <p className="font-semibold">
            Project Manager
          </p>

          <p>{project.project_manager}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="font-semibold">
            Status
          </p>

          <p>{project.status}</p>
        </div>

        <div className="border rounded-lg p-4">
          <p className="font-semibold">
            Project Duration
          </p>

          <p>
            {project.start_date} →{" "}
            {project.end_date}
          </p>
        </div>
      </div>
    </main>
  );
}