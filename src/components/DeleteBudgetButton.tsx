"use client";

import DeleteIcon from "./DeleteIcon";

const DeleteBudgetButton = () => {
  return (
    <button
      onClick={() => console.log("clicked")}
      className="btn btn-outline btn-error text-lg p-2 min-h-8 h-8 rounded-md"
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteBudgetButton;
