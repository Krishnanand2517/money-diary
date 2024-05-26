import BudgetCard, { BudgetData } from "@/components/BudgetCard";
import BudgetModal from "@/components/BudgetModal";
import CreateBudgetBtn from "@/components/CreateBudgetBtn";
import { createClient } from "@/utils/supabase/server";

async function getBudgets() {
  const supabase = createClient();
  const { data, error } = await supabase.from("budgets").select();
  console.log(error);

  return data;
}

export default async function Dashboard() {
  // TODO: Find some better validation for this situation
  const allBudgets = (await getBudgets()) || [];

  // TODO: Add type validation instead of 'as'
  const targetBudgetData: BudgetData[] = allBudgets
    .filter((budget) => budget.budget_type === "target")
    .map((budget) => ({
      id: budget.id as number,
      title: budget.title as string,
      createdDate: new Date(budget.created_at),
      targetDate: budget.target_date ? new Date(budget.target_date) : undefined,
      currentValue: budget.current_value as number,
      targetValue: budget.target_value as number,
    }));

  const expenseBudgetData: BudgetData[] = allBudgets
    .filter((budget) => budget.budget_type === "expense")
    .map((budget) => ({
      id: budget.id as number,
      title: budget.title as string,
      createdDate: new Date(budget.created_at),
      targetDate: new Date(budget.target_date),
      currentValue: budget.current_value as number,
      targetValue: budget.target_value as number,
    }));

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
      <CreateBudgetBtn />

      {targetBudgetData.length > 0 && renderTargetBudgets()}
      {expenseBudgetData.length > 0 && renderExpenseBudgets()}

      {targetBudgetData.length === 0 && expenseBudgetData.length === 0 && (
        <>
          <p className="my-12 text-center px-4 font-medium text-lg">
            No budgets to show. Create one now!
          </p>
        </>
      )}

      <BudgetModal />
    </main>
  );
}
