"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { MuiButton } from "@repo/ui/MuiButton";
import { MuiTextField } from "@repo/ui/MuiTextField";

import { useLoginForm } from "@repo/forms";

export default function Home() {
  const [error, setError] = useState("");
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useLoginForm();

  useEffect(() => {
    const token = Cookies.get("admin-token");
    if (token) router.push("/dashboard");
  }, [router]);

  const onSubmit = async (data: any) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (json.token) {
        Cookies.set("admin-token", json.token, { expires: 1 });
        router.push("/dashboard");
      } else {
        setError("Credential salah!");
      }
    } catch (err) {
      setError("Server error");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 px-4">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
        <h1 className="text-2xl font-bold text-center mb-6 text-slate-900 dark:text-slate-100">
          Login Admin
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <MuiTextField
            label="Username"
            {...register("username")}
            error={!!errors.username}
            helperText={errors.username?.message}
            placeholder="Masukkan username"
          />
          <MuiTextField
            label="Password"
            type="password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            placeholder="Masukkan password"
          />
          <MuiButton type="submit" disabled={isSubmitting} fullWidth>
            {isSubmitting ? "Loading..." : "Login"}
          </MuiButton>
        </form>
        <p className="mt-4 text-xs text-center text-slate-600 dark:text-slate-400">
          Hint: admin / password123
        </p>
      </div>
    </div>
  );
}
