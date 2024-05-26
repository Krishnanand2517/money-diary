"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import DeleteIcon from "./DeleteIcon";

const DeleteBudgetButton = ({ budgetId }: { budgetId: number }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const handleDelete = async () => {
    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("budgets")
        .delete()
        .eq("id", budgetId);

      if (error) {
        console.log(error.message);

        throw new Error(error.message);
      } else {
        router.refresh();
      }
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
    <>
      <button
        onClick={handleDelete}
        className="btn btn-outline btn-error text-lg p-2 min-h-8 h-8 rounded-md"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="loading loading-spinner loading-sm"></span>
        ) : (
          <DeleteIcon />
        )}
      </button>

      {toastErrorMessage && (
        <div className="toast">
          <div className="alert alert-error rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastErrorMessage}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default DeleteBudgetButton;
