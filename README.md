# Starter Turborepo Personal Website

Proyek ini adalah monorepo Turborepo. Ini termasuk aplikasi frontend (admin dan profile) menggunakan Next.js dan app router, serta backend sederhana dengan Express dan SQLite, terdapat juga package shared untuk UI (MUI dan tailwind) dan form handling (react from-hook). Semua code menggunakan TypeScript untuk keamanan tipe data.

## Cara install and running

Run the following command:

```sh
cd personal-website
pnpm install #menggunakan pnpm ya agar lebih wush wush

#untuk running
pnpm dev:profile
pnpm dev:admin
pnpm dev:backend #untuk running backend

#untuk running sekaligus data menggunakan
pnpm run dev #jika backend tidak running maka manual
```

## What's inside?

- `admin`: terdapat login page dan dashboard
- `profile`: landing page profile / personal website
- `api`: sebagai backend `meskipun sebernarnya next sendiri dapat menjadi fullstack tanpa perlu backend`
- `@repo/ui`: berisikan reusable component agar dapat di akses secara global dan juga dapat menjamin design sistem
- `@repo/form`: `react-form-hook` berisikan functionality / hook terkait form mulai dari validaiton menggunakan `yup`

### Utilities

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Resourch

- [turborepo](https://turborepo.com/) monorepo Turborepo
- [mui](https://mui.com/) UI library
