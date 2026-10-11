"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

async function requireUser(supabase) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect("/admin/login");
}

export async function setApproved(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  const id = formData.get("id");
  const approved = formData.get("approved") === "true";

  await supabase.from("reviews").update({ approved }).eq("id", id);
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}

export async function deleteReview(formData) {
  const supabase = await createClient();
  await requireUser(supabase);

  await supabase.from("reviews").delete().eq("id", formData.get("id"));
  revalidatePath("/admin/reviews");
  revalidatePath("/reviews");
}
