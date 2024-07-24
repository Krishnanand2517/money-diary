"use client";

import { useState, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

import { createClient } from "@/utils/supabase/client";
import { BudgetData } from "./BudgetCard";

const SpendModal = ({
  currentBudgetData,
  isSpendModalOpen,
  setIsSpendModalOpen,
}: {
  currentBudgetData: BudgetData | null;
  isSpendModalOpen: boolean;
  setIsSpendModalOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [spendValue, setSpendValue] = useState(100);

  const [toastErrorMessage, setToastErrorMessage] = useState("");

  const handleSpend = async () => {
    if (!currentBudgetData) return;

    setIsLoading(true);

    try {
      const supabase = createClient();

      const { error } = await supabase
        .from("budgets")
        .update({ current_value: currentBudgetData.currentValue - spendValue })
        .eq("id", currentBudgetData.id);

      if (error) {
        throw new Error(error.message);
      } else {
        router.refresh();
        document.getElementById("spend-modal")?.close();
        resetState();
        setIsSpendModalOpen(false);
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
    setSpendValue(100);
  };

  if (!isSpendModalOpen) return;

  return (
    <dialog id="spend-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button
            onClick={() => setIsSpendModalOpen(false)}
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">{currentBudgetData?.title}</h3>

        <form className="flex flex-col gap-4 my-6">
          <div className="form-control">
            <div className="label">
              <span className="label-text">Spending Amount</span>
            </div>
            <input
              type="number"
              step="100"
              min="0"
              value={spendValue}
              onChange={(e) => setSpendValue(Number(e.target.value))}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              type="button"
              onClick={handleSpend}
              className="btn bg-red-400 text-white"
              disabled={isLoading || !spendValue}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Spend"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button onClick={() => setIsSpendModalOpen(false)}>close</button>
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

export default SpendModal;
