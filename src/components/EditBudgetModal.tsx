"use client";

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { BudgetData } from "./BudgetCard";

const EditBudgetModal = ({
  currentBudgetData,
  isEditModalOpen,
  setIsEditModalOpen,
}: {
  currentBudgetData: BudgetData | null;
  isEditModalOpen: boolean;
  setIsEditModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [targetDate, setTargetDate] = useState("");
  const [targetValue, setTargetValue] = useState(10000);

  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState("");

  useEffect(() => {
    if (currentBudgetData) {
      setTitle(currentBudgetData.title);
      setTargetDate(
        currentBudgetData.targetDate?.toISOString().split("T")[0] || ""
      );
      setTargetValue(currentBudgetData.targetValue);
    }
  }, [currentBudgetData]);

  const handleEdit = async () => {
    if (!currentBudgetData) return;

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("budgets")
        .update({ title, target_date: targetDate, target_value: targetValue })
        .eq("id", currentBudgetData.id);

      if (error) {
        throw new Error(error.message);
      } else {
        setToastSuccessMessage(`Budget - '${title}' got updated.`);

        setTimeout(() => {
          setToastSuccessMessage("");

          // Close the modal
          document.getElementById("budget-edit-modal")?.close();
          setIsEditModalOpen(false);
          router.refresh();
        }, 1500);
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

  if (!isEditModalOpen) return;

  return (
    <dialog
      id="budget-edit-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setIsEditModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Edit Budget</h3>

        <form className="flex flex-col gap-4 my-6">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Title</span>
            </div>
            <input
              type="text"
              placeholder="Budget Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text">Target Date / Deadline</span>
            </div>
            <input
              type="date"
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <div className="label">
              <span className="label-text">Target Amount</span>
            </div>
            <input
              type="number"
              value={targetValue.toString()}
              onChange={(e) => setTargetValue(Number(e.target.value))}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="button"
              onClick={handleEdit}
              className="btn btn-primary"
              disabled={isLoading || !title || !targetValue}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Edit Budget"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsEditModalOpen(false)}>close</button>
      </form>

      {toastErrorMessage && (
        <div className="toast">
          <div className="alert alert-error rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastErrorMessage}</span>
          </div>
        </div>
      )}

      {toastSuccessMessage && (
        <div className="toast">
          <div className="alert alert-success rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastSuccessMessage}</span>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default EditBudgetModal;
