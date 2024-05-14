"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/logout/actions";
import Link from "next/link";

const ActionButton = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>();

  const fetchUser = async () => {
    const supabase = createClient();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (!error) {
      setLoggedInUser(user);
    } else {
      console.log("Error fetching user", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  if (loggedInUser) {
    return (
      <form action={logout}>
        <button type="submit" className="btn btn-ghost text-base px-6">
          Logout
        </button>
      </form>
    );
  }

  return (
    <Link href="/login" className="btn btn-ghost text-base px-6">
      Login
    </Link>
  );
};

export default ActionButton;
