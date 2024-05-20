"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { changePassword } from "./actions";

export default function SetNewPasswordPage() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const [toastMessageError, setToastMessageError] = useState("");
  const [toastMessageSuccess, setToastMessageSuccess] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdate = async () => {
    setIsLoading(true);

    try {
      await changePassword(password);

      setToastMessageSuccess(
        "Password updated successfully! Redirecting to the dashboard."
      );

      setTimeout(() => {
        setToastMessageSuccess("");
        router.push("/dashboard");
      }, 2800);
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
          <h3 className="font-semibold my-4">
            Create a new password to proceed
          </h3>

          <div className="form-control">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`input input-bordered ${
                password === confirmPassword && password !== ""
                  ? "border-green-500 focus:outline-green-500"
                  : confirmPassword && "border-red-500 focus:outline-red-500"
              }`}
              required
            />
          </div>

          <div className="form-control mt-6">
            <button
              onClick={handleUpdate}
              className="btn btn-secondary"
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="loading loading-ball loading-md"></span>
              ) : (
                "Update Password"
              )}
            </button>
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

      {toastMessageSuccess && (
        <div className="toast">
          <div className="alert alert-success rounded-lg font-semibold text-sm text-opacity-70 animate-bounce">
            <span>{toastMessageSuccess}</span>
          </div>
        </div>
      )}
    </div>
  );
}
