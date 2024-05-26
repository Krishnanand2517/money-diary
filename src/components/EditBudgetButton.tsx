"use client";

import EditIcon from "./EditIcon";

const EditBudgetButton = () => {
  return (
    <button
      onClick={() => console.log("clicked")}
      className="btn btn-outline btn-accent text-sm p-2 min-h-8 h-8 rounded-md"
    >
      <EditIcon />
    </button>
  );
};

export default EditBudgetButton;
