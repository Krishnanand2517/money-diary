"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { logout } from "@/app/(auth)/logout/actions";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActionButton = () => {
  const pathname = usePathname();

  const [loggedInUser, setLoggedInUser] = useState<User | null>();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        console.log(session.user);

        setLoggedInUser(session.user);
      } else {
        console.log("Error fetching user", error);
      }
    };

    fetchUser();
  }, [pathname]);

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    await logout();
    setLoggedInUser(null);
  };

  if (loggedInUser) {
    return (
      <form onSubmit={handleLogout}>
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
