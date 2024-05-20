"use server";

import { createClient } from "@/utils/supabase/server";

export async function changePassword(newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({ password: newPassword });

  if (error) {
    throw new Error(error.message);
  }
}
