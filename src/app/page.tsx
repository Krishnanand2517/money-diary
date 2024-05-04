import ThemeToggle from "@/components/ThemeToggle";

export default function Home() {
  return (
    <main className="min-h-screen p-24">
      <ThemeToggle />

      <div className="glass p-10">
        <button className="btn btn-primary">Hello daisyUI</button>
      </div>
    </main>
  );
}
