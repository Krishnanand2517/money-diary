"use client";

const ContributeButton = ({
  onContributeClick,
}: {
  onContributeClick: () => void;
}) => {
  return (
    <button
      onClick={onContributeClick}
      className="btn btn-outline bg-green-300 text-black text-sm min-h-8 h-8 rounded-md"
    >
      + Add
    </button>
  );
};

export default ContributeButton;
