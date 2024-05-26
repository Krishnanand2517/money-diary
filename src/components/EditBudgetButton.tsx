"use client";

import EditIcon from "./EditIcon";

const EditBudgetButton = ({ onEditClick }: { onEditClick: () => void }) => {
  return (
    <button
      onClick={onEditClick}
      className="btn btn-outline btn-accent text-sm p-2 min-h-8 h-8 rounded-md"
    >
      <EditIcon />
    </button>
  );
};

export default EditBudgetButton;
