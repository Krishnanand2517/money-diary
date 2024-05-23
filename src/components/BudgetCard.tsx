export interface BudgetData {
  id: number;
  title: string;
  createdDate: Date;
  targetDate?: Date;
  currentValue: number;
  targetValue: number;
}

const dateStringOptions: Intl.DateTimeFormatOptions = {
  year: "numeric",
  month: "short",
  day: "numeric",
};

const BudgetCard = ({
  type,
  budgetData,
}: {
  type: "target" | "expense";
  budgetData: BudgetData;
}) => {
  return (
    <div
      className={`card w-80 bg-base-100 shadow-md shadow-base-content/50 hover:shadow-lg hover:shadow-base-content/90 transition-shadow border ${
        type === "target" ? "border-green-500" : "border-red-500 border-dashed"
      }`}
    >
      <div className="card-body">
        <h2 className="card-title font-bold justify-center">
          {budgetData.title}
        </h2>

        <div className="flex justify-between mt-2">
          <div className="text-center">
            <p>Created on</p>
            <p className="font-semibold">
              {budgetData.createdDate.toLocaleDateString(
                "en-IN",
                dateStringOptions
              )}
            </p>
          </div>
          <div className="text-center">
            {budgetData.targetDate && (
              <>
                <p>Target</p>
                <p className="font-semibold">
                  {budgetData.targetDate.toLocaleDateString(
                    "en-IN",
                    dateStringOptions
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        <div className="text-center mt-4">
          <progress
            className={`progress w-64 h-3 ${
              type === "target" ? "progress-primary" : "progress-secondary"
            }`}
            value={budgetData.currentValue}
            max={budgetData.targetValue}
          ></progress>

          <div className="flex justify-between">
            <p className="font-medium text-sm text-left">
              {budgetData.currentValue}
            </p>
            {type === "expense" && (
              <p className="font-medium text-xs">remaining out of</p>
            )}
            <p className="font-bold text-sm text-right">
              {budgetData.targetValue}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
