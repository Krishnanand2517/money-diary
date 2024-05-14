"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { createClient } from "@/utils/supabase/server";

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  // TODO: toast implementation for error
  if (error) {
    console.error("Logout failed:", error);
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
