"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function changePassword(newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw new Error(error.message);
  }

  setTimeout(() => {
    revalidatePath("/", "layout");
    redirect("/dashboard");
  }, 3500);
}
