"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { BudgetData } from "./BudgetCard";

const ContributeModal = ({
  currentBudgetData,
  isContributeModalOpen,
  setIsContributeModalOpen,
}: {
  currentBudgetData: BudgetData | null;
  isContributeModalOpen: boolean;
  setIsContributeModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [contributionValue, setContributionValue] = useState(100);

  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const handleContribute = async () => {
    if (!currentBudgetData) return;

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("budgets")
        .update({
          current_value: currentBudgetData.currentValue + contributionValue,
        })
        .eq("id", currentBudgetData.id);

      if (error) {
        throw new Error(error.message);
      } else {
        router.refresh();
        document.getElementById("contribute-modal")?.close();
        resetState();
        setIsContributeModalOpen(false);
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

  const resetState = () => {
    setContributionValue(100);
  };

  if (!isContributeModalOpen) return;

  return (
    <dialog
      id="contribute-modal"
      className="modal modal-bottom sm:modal-middle"
    >
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setIsContributeModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">{currentBudgetData?.title}</h3>

        <form className="flex flex-col gap-4 my-6">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Contribution Amount</span>
            </div>
            <input
              type="number"
              step="100"
              value={contributionValue}
              onChange={(e) => setContributionValue(Number(e.target.value))}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="button"
              onClick={handleContribute}
              className="btn btn-primary"
              disabled={isLoading || !contributionValue}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Contribute"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsContributeModalOpen(false)}>close</button>
      </form>

      {toastErrorMessage && (
        <div className="toast">
          <div className="alert alert-error rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastErrorMessage}</span>
          </div>
        </div>
      )}
    </dialog>
  );
};

export default ContributeModal;
