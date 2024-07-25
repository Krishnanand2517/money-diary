"use client";

import { createClient } from "@/utils/supabase/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const DeleteUserDataSection = ({
  currentUserEmail,
}: {
  currentUserEmail?: string;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [inputEmail, setInputEmail] = useState("");
  const [btnClicked, setBtnClicked] = useState(false);

  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const handleDeleteUser = async () => {
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase.rpc("delete_user");

      if (error) {
        throw new Error(error.message);
      }

      await supabase.auth.signOut({ scope: "global" });

      router.push("/");
    } catch (error) {
      if (error instanceof Error) {
        setToastErrorMessage(error.message);

        setTimeout(() => {
          setToastErrorMessage("");
        }, 4000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 justify-end items-center">
      <div className="form-control">
        <div className="label">
          <span className="label-text">Enter your email to confirm</span>
        </div>

        <input
          type="email"
          value={inputEmail}
          onChange={(e) => setInputEmail(e.target.value)}
          className="input input-bordered input-accent"
          required
        />
      </div>

      {!btnClicked ? (
        <button
          onClick={() => setBtnClicked(true)}
          className="btn btn-error"
          disabled={inputEmail !== currentUserEmail}
        >
          Delete User Data
        </button>
      ) : (
        <button
          onClick={handleDeleteUser}
          className="btn btn-error btn-wide"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="loading loading-ball loading-md"></span>
          ) : (
            "Confirm Deleting User Data"
          )}
        </button>
      )}

      {toastErrorMessage && (
        <div className="toast">
          <div className="alert alert-error rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastErrorMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default DeleteUserDataSection;
