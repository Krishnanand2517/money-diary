import BudgetCard, { BudgetData } from "@/components/BudgetCard";

export default function Dashboard() {
  const targetBudgetData: BudgetData[] = [
    {
      id: 1,
      title: "Startup Fund",
      createdDate: new Date("23 May 2024"),
      targetDate: new Date("10 July 2024"),
      currentValue: 5000,
      targetValue: 80000,
    },
    {
      id: 2,
      title: "Travel Savings",
      createdDate: new Date("20 April 2024"),
      targetDate: new Date("30 June 2024"),
      currentValue: 2000,
      targetValue: 9000,
    },
  ];

  const expenseBudgetData: BudgetData[] = [
    {
      id: 1,
      title: "Petrol",
      createdDate: new Date("11 May 2024"),
      currentValue: 4500,
      targetValue: 5000,
    },
  ];

  const renderExpenseBudgets = () => {
    return (
      <>
        <h2 className="text-xl font-medium my-6">Expense Budgets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {expenseBudgetData.map((budget) => (
            <BudgetCard key={budget.id} type="expense" budgetData={budget} />
          ))}
        </div>
      </>
    );
  };

  const renderTargetBudgets = () => {
    return (
      <>
        <h2 className="text-xl font-medium my-6">Target Budgets</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
          {targetBudgetData.map((budget) => (
            <BudgetCard key={budget.id} type="target" budgetData={budget} />
          ))}
        </div>
      </>
    );
  };

  return (
    <main className="min-h-screen p-20">
      <button className="btn btn-primary mb-6">+ Create New Budget</button>

      {targetBudgetData.length > 0 && renderTargetBudgets()}
      {expenseBudgetData.length > 0 && renderExpenseBudgets()}

      {targetBudgetData.length === 0 && expenseBudgetData.length === 0 && (
        <>
          <p className="my-12 text-center px-4 font-medium text-lg">
            No budgets to show. Create one now!
          </p>
        </>
      )}
    </main>
  );
}
