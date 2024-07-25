import DeleteUserDataSection from "@/components/DeleteUserDataSection";
import { createClient } from "@/utils/supabase/server";

async function getCurrentUser() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();
  console.log(error);

  return data.user;
}

export default async function DeleteUserData() {
  const currentUser = await getCurrentUser();

  return (
    <main className="min-h-screen p-20">
      <h2 className="text-center font-bold text-2xl">Delete User Data</h2>

      <div className="p-6 my-8 mx-20 border border-red-300 border-dashed rounded-lg">
        <p>
          User Email:{" "}
          <span className="font-semibold text-red-400">
            {currentUser?.email}
          </span>
        </p>
        <p>
          Account created on:{" "}
          <span className="font-semibold text-red-400">
            {new Date(currentUser?.created_at).toLocaleString()}
          </span>
        </p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <p className="mx-36 mb-8">
          This action is dangerous! It will permanently delete your account and
          all of your budgets from Money Diary. Proceed carefully!
        </p>
        <DeleteUserDataSection currentUserEmail={currentUser?.email} />
      </div>
    </main>
  );
}
