import BudgetCard from "@/components/BudgetCard";

export default function Dashboard() {
  return (
    <main className="min-h-screen p-20">
      <button className="btn btn-primary mb-6">+ Create New Budget</button>

      <h2 className="text-xl font-medium my-6">Target Budgets</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
        <BudgetCard />
      </div>
    </main>
  );
}
