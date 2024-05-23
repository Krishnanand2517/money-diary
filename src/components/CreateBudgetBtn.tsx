"use client";

const CreateBudgetBtn = () => {
  return (
    <button
      className="btn btn-primary mb-6"
      onClick={() => document.getElementById("budget-modal")?.showModal()}
    >
      + Create New Budget
    </button>
  );
};

export default CreateBudgetBtn;
