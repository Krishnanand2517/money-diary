"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type BudgetType = "target" | "expense";

const BudgetModal = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [budgetType, setBudgetType] = useState<BudgetType | undefined>();
  const [targetDate, setTargetDate] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [targetValue, setTargetValue] = useState(1000);

  const [toastErrorMessage, setToastErrorMessage] = useState("");
  const [toastSuccessMessage, setToastSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setIsLoading(true);

    try {
      const supabase = createClient();

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (session) {
        const { data, error } = await supabase
          .from("budgets")
          .insert({
            title,
            user_id: session.user.id,
            budget_type: budgetType,
            target_date: targetDate === "" ? null : targetDate,
            current_value:
              budgetType === "expense" ? targetValue : currentValue,
            target_value: targetValue,
          })
          .select();

        if (error) {
          throw new Error(error.message);
        }

        if (data) {
          setToastSuccessMessage(`Budget '${title}' created.`);

          setTimeout(() => {
            setToastSuccessMessage("");

            // Close the modal
            document.getElementById("budget-modal")?.close();
            router.refresh();
          }, 1500);
        }
      }

      if (error) {
        throw new Error(error.message);
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

  const isBudgetType = (value: any): value is BudgetType => {
    return value === "target" || value === "expense";
  };

  const handleBudgetTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (isBudgetType(e.target.value)) {
      setBudgetType(e.target.value);
    }
  };

  return (
    <dialog id="budget-modal" className="modal modal-bottom sm:modal-middle">
      <div className="modal-box">
        <form method="dialog">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>
        </form>

        <h3 className="font-bold text-lg">Create New Budget</h3>

        <form className="flex flex-col gap-4 my-6">
          <div className="form-control">
            <input
              type="text"
              placeholder="Budget Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mt-4 mb-8">
            <select
              value={budgetType}
              onChange={handleBudgetTypeChange}
              className="select select-bordered"
            >
              <option disabled selected>
                Budget Type
              </option>
              <option value="target">Target</option>
              <option value="expense">Expense</option>
            </select>
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

          {budgetType === "target" && (
            <div className="form-control">
              <div className="label">
                <span className="label-text">Current Amount</span>
              </div>
              <input
                type="number"
                value={currentValue.toString()}
                onChange={(e) => setCurrentValue(Number(e.target.value))}
                className="input input-bordered"
                required
              />
            </div>
          )}

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
              onClick={handleSubmit}
              className="btn btn-primary"
              disabled={isLoading || !budgetType || !title || !targetValue}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Create Budget"
              )}
            </button>
          </div>
        </form>
      </div>

      <form method="dialog" className="modal-backdrop">
        <button>close</button>
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

export default BudgetModal;
