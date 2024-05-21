"use client";

import { useState } from "react";
import Link from "next/link";

import { signup } from "./actions";

import OAuthButton from "@/components/OAuthButton";

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const [toastMessageError, setToastMessageError] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async () => {
    setIsLoading(true);

    // Email to be used in OTP verification
    localStorage.removeItem("userEmail");
    localStorage.setItem("userEmail", email);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await signup(formData);
    } catch (error) {
      if (error instanceof Error) {
        setToastMessageError(error.message);

        setTimeout(() => {
          setToastMessageError("");
        }, 4000);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center mt-10 bg-base-100">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-white/10">
        <form className="card-body gap-4">
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>

            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="grow p-2 rounded-lg"
              placeholder="Email"
              required
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70"
            >
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>

            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="grow p-2 rounded-lg"
              placeholder="Password"
              required
            />
          </label>

          <div className="form-control mt-6 gap-6">
            <button
              onClick={handleSignup}
              className="btn btn-accent"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Create New Account"
              )}
            </button>
          </div>

          <Link href="/login">
            <label className="label text-center">
              <p className="label-text link link-hover">
                {"Already have an account? Login here"}
              </p>
            </label>
          </Link>

          <div className="divider divider-accent">OR Continue with</div>

          <div className="flex justify-evenly">
            <OAuthButton provider="google" />
            <OAuthButton provider="azure" />
            <OAuthButton provider="github" />
          </div>
        </form>
      </div>

      {toastMessageError && (
        <div className="toast">
          <div className="alert alert-error rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastMessageError}</span>
          </div>
        </div>
      )}
    </div>
  );
}
