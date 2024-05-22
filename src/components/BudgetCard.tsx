const BudgetCard = () => {
  return (
    <div className="card w-80 bg-base-100 shadow-xl border border-success">
      <div className="card-body">
        <h2 className="card-title font-bold justify-center">Startup Fund</h2>

        <div className="flex justify-between mt-2">
          <div className="text-center">
            <p>Created on</p>
            <p className="font-semibold">23/05/2024</p>
          </div>
          <div className="text-center">
            <p>Target</p>
            <p className="font-semibold">10/07/2024</p>
          </div>
        </div>

        <div className="text-center mt-4">
          <progress
            className="progress progress-primary w-64 h-3"
            value="40"
            max="100"
          ></progress>

          <div className="flex justify-between">
            <p className="font-medium text-sm text-left">5000</p>
            <p className="font-bold text-sm text-right">80000</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BudgetCard;
