"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function CreateProjectModal() {
  const router = useRouter();
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("Active");
  async function handleCreateProject() {
    if (!projectName || !projectManager || !startDate || !endDate) {
      alert("Mohon lengkapi seluruh data project.");
      return;
    }
    const { error } = await supabase.from("projects").insert({
      project_name: projectName,
      description: description,
      project_manager: projectManager,
      start_date: startDate,
      end_date: endDate,
      status: status,
    });

    if (error) {
      alert(`Gagal membuat project: ${error.message}`);
      return;
    }

    alert("Project berhasil dibuat");

    window.location.reload();
  }
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          +
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-6">
            Create New Project
          </Dialog.Title>
          <div className="space-y-4">
            <div>
              <label className="block mb-1">Project Name</label>
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div>
              <label className="block mb-1">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border rounded-lg p-2"
                rows={3}
              />
            </div>
            <div>
              <label className="block mb-1">Project Manager</label>
              <input
                type="text"
                value={projectManager}
                onChange={(e) => setProjectManager(e.target.value)}
                className="w-full border rounded-lg p-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1">Start Date</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block mb-1">End Date</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full border rounded-lg p-2"
                />
              </div>
            </div>
            <div>
              <label className="block mb-1">Status</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg p-2"
              >
                <option value="Active">Active</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>
          </div>
          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="border px-4 py-2 rounded-lg">Cancel</button>
            </Dialog.Close>
            <button
              onClick={handleCreateProject}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Create Project
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
