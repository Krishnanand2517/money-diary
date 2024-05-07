import Image from "next/image";
import PiggyImage from "../../public/piggy.png";

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
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Veritatis
            sint deleniti obcaecati dicta aut aliquid esse odit perferendis,
            molestias placeat eligendi sed quisquam aliquam exercitationem
            debitis ducimus numquam harum veniam.
          </p>
          <button className="btn btn-primary">Get Started</button>
        </div>
      </div>
    </div>
  );
}
