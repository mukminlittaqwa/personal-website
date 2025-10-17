"use client";

import Image from "next/image";
import { useState } from "react";
import { useContactForm } from "@repo/forms";
import { MuiButton } from "@repo/ui/MuiButton";
import { MuiTextField } from "@repo/ui/MuiTextField";

export default function Home() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useContactForm();

  const onSubmitContact = async (data: any) => {
    try {
      const res = await fetch("http://localhost:4000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) {
        alert("Pesan tersimpan boss");
        reset();
      }
    } catch (err) {
      alert("Error boss");
    }
  };

  return (
    <div className="font-sans min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100">
      <header className="relative overflow-hidden px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Image
            className="mx-auto dark:invert mb-8 rounded-full shadow-2xl"
            src="/kitty.png"
            alt="Profile Picture"
            width={120}
            height={120}
            priority
          />
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Halo, Saya Taqwa
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-600 dark:text-slate-300">
            Full-Stack Developer | Passionate about Building Cool Stuff with
            Next.js, Tailwind, and More.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="#contact"
              className="rounded-md bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Hubungi Saya
            </a>
            <a
              href="https://github.com/mukminlittaqwa17"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold leading-6 text-slate-900 dark:text-slate-100 hover:text-blue-600 transition-colors"
            >
              GitHub <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-t from-white/0 to-blue-100/20 dark:to-slate-800/20"></div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:px-8">
        <section className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center mb-24">
          <div>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
              Tentang Saya
            </h2>
            <p className="text-lg leading-7 text-slate-600 dark:text-slate-300">
              Saya seorang developer dengan pengalaman di web technologies. Suka
              eksperimen dengan Turborepo, MUI, dan node Stack.
            </p>
            <ul className="mt-6 space-y-2 text-slate-600 dark:text-slate-300">
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span> Next.js & React Expert
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span> Tailwind CSS for
                Styling and MUI
              </li>
              <li className="flex items-center gap-2">
                <span className="text-blue-600">✔</span> Backend with
                Express/Node, Python, golang
              </li>
            </ul>
          </div>
          <div className="flex justify-center">
            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 rounded-xl p-8 shadow-xl">
              <Image
                src="/window.svg"
                alt="Skills"
                width={300}
                height={200}
                className="dark:invert opacity-80"
              />
            </div>
          </div>
        </section>

        <section className="mb-24">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">
            Projects Saya
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="bg-gray-200 dark:bg-gray-700 rounded-md h-48 mb-4 flex items-center justify-center">
                  <span className="text-slate-500">Project Image {i}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2">Project {i}</h3>
                <p className="text-slate-600 dark:text-slate-300">
                  turbo repo for life and for project
                </p>
              </div>
            ))}
          </div>
        </section>

        <section
          id="contact"
          className="rounded-2xl bg-white dark:bg-slate-800 p-8 shadow-xl border border-slate-200 dark:border-slate-700"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-8 text-center">
            Kirim Pesan
          </h2>
          <form
            onSubmit={handleSubmit(onSubmitContact)}
            className="space-y-6 max-w-lg mx-auto"
          >
            <MuiTextField
              label="Nama"
              {...register("name")}
              error={!!errors.name}
              helperText={errors.name?.message}
              placeholder="Nama kamu"
            />
            <MuiTextField
              label="Email"
              type="email"
              {...register("email")}
              error={!!errors.email}
              helperText={errors.email?.message}
              placeholder="email@contoh.com"
            />
            <MuiTextField
              label="Pesan"
              multiline
              rows={5}
              {...register("message")}
              error={!!errors.message}
              helperText={errors.message?.message}
              placeholder="Tulis pesanmu di sini..."
            />
            <MuiButton type="submit" disabled={isSubmitting} fullWidth>
              {isSubmitting ? "Mengirim..." : "Kirim Pesan"}
            </MuiButton>
          </form>
        </section>
      </main>

      <footer className="bg-slate-100 dark:bg-slate-900 py-8 mt-16 border-t border-slate-200 dark:border-slate-700">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center text-sm text-slate-600 dark:text-slate-300">
          <p>
            © 2025 coding test taqwa. All rights reserved. Built with Next.js &
            Tailwind CSS.
          </p>
          <div className="flex justify-center gap-6 mt-4">
            <a href="#" className="hover:text-blue-600 transition-colors">
              Twitter
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              LinkedIn
            </a>
            <a href="#" className="hover:text-blue-600 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
