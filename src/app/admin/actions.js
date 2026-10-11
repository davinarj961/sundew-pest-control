"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function updateStatus(formData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");

  const id = formData.get("id");
  const status = formData.get("status");
  if (!["pending", "confirmed"].includes(status)) return;

  const update = { status };
  const scheduled = formData.get("scheduled_at"); // e.g. "2026-10-12T10:00"

  if (status === "confirmed" && scheduled) {
    update.scheduled_at = `${scheduled}:00+05:30`; // treat input as India time
  }
  if (status === "pending") {
    update.scheduled_at = null;
  }

  await supabase.from("enquiries").update(update).eq("id", id);
  revalidatePath("/admin");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}
