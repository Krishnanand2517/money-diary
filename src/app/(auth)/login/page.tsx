"use client";

import { useState } from "react";

import { login, signup } from "./actions";

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    setIsLoading(true);
    setIsLoggingIn(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      await login(formData);
    } catch (error) {
      if (error instanceof Error) {
        setToastMessage(error.message);
      }
    } finally {
      setIsLoading(false);
      setIsLoggingIn(false);
    }
  };

  const handleSignup = async () => {};

  return (
    <div className="flex justify-center items-center mt-10 bg-base-100">
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 border border-white/10">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />
            <label className="label">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6 gap-6">
            <button
              // formAction={login}
              onClick={handleLogin}
              className="btn btn-primary btn-outline"
              disabled={isLoading}
            >
              {isLoggingIn ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Login"
              )}
            </button>
            <button
              // formAction={signup}
              onClick={handleSignup}
              className="btn btn-accent"
              disabled={isLoading}
            >
              {isSigningUp ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Create New Account"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
