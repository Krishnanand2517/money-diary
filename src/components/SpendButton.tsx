"use client";

const SpendButton = ({ onSpendClick }: { onSpendClick: () => void }) => {
  return (
    <button
      onClick={onSpendClick}
      className="btn btn-outline bg-red-300 text-black text-sm min-h-8 h-8 rounded-md"
    >
      - Spend
    </button>
  );
};

export default SpendButton;
