"use client";

import { useState } from "react";

type BudgetType = "target" | "expense";

const BudgetModal = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [budgetType, setBudgetType] = useState<BudgetType | undefined>();
  const [targetDate, setTargetDate] = useState("");
  const [currentValue, setCurrentValue] = useState(0);
  const [targetValue, setTargetValue] = useState(1000);

  const handleSubmit = () => {
    console.log({ title, budgetType, targetDate, currentValue, targetValue });
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

          <div className="form-control mt-4 mb-6">
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
    </dialog>
  );
};

export default BudgetModal;
