"use client";

import { FormEvent, KeyboardEvent, useState } from "react";

export default function ConfirmPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [otp, setOtp] = useState<string[]>(new Array(6).fill(""));

  const handleChange = (
    element: KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (isNaN(Number(element.key))) return;

    const newOtp = [...otp];
    newOtp[index] = element.key;
    setOtp(newOtp);

    // To focus on the next input
    if (element.currentTarget.nextSibling && element.key) {
      (element.currentTarget.nextSibling as HTMLInputElement).focus();
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("Submitted OTP:", otp.join(""));
  };

  return (
    <div className="flex justify-center items-center mt-10 bg-base-100">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-white/10">
        <form onSubmit={handleSubmit} className="card-body gap-4">
          <h2 className="text-2xl font-bold">Confirm OTP</h2>
          <p className="text-sm">
            Check your email. An OTP is waiting for you there!
          </p>

          <div className="flex justify-center space-x-2 my-8">
            {otp.map((data, index) => (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength={1}
                className="input input-bordered w-12 h-12 text-center"
                value={data}
                onKeyDown={(e) => handleChange(e, index)}
                onFocus={(e) => e.target.select()}
                required
              />
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="loading loading-ball loading-md"></span>
            ) : (
              "Verify"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
