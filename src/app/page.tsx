import Image from "next/image";
import PiggyImage from "../../public/piggy.png";
import Link from "next/link";

export default function Home() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <Image
          src={PiggyImage}
          alt="Piggy Bank Illustration"
          width={384}
          height={384}
          className="max-w-sm rounded-lg"
        />
        <div>
          <h1 className="text-5xl font-bold">Save More. Live More.</h1>
          <p className="py-6">
            Track your spending, set budgets, and achieve financial freedom with
            our intuitive Money Diary app—your personal guide to smarter saving
            and better living.
          </p>
          <Link href="/login">
            <button className="btn btn-primary">Get Started</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
