"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

type CreatePICModalProps = {
  projectId: string;
};

export default function CreateTeamModal({ projectId }: CreatePICModalProps) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [picName, setPicName] = useState("");

  async function handleAddPIC() {
    if (!picName) {
      alert("Nama PIC wajib diisi.");
      return;
    }

    const { error } = await supabase.from("project_pics").insert({
      project_id: projectId,
      pic_name: picName,
    });

    if (error) {
      alert(`Gagal menambahkan PIC: ${error.message}`);
      return;
    }

    alert("Team berhasil ditambahkan.");
    setOpen(false);
    setPicName("");
    router.refresh();
  }
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          + Add Team 
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />

        <Dialog.Content className="fixed top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white p-6 shadow-xl">
          <Dialog.Title className="text-2xl font-bold mb-6">
            Add Project PIC
          </Dialog.Title>

          <div>
            <label className="block mb-1">Team Name</label>

            <input
              value={picName}
              onChange={(e) => setPicName(e.target.value)}
              className="w-full border rounded-lg p-2"
            />
          </div>

          <div className="mt-6 flex justify-end gap-2">
            <Dialog.Close asChild>
              <button className="border px-4 py-2 rounded-lg">Cancel</button>
            </Dialog.Close>

            <button
              onClick={handleAddPIC}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Team 
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
