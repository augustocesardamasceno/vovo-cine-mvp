// src/env.d.ts ou types/env.d.ts
declare namespace NodeJS {
    interface ProcessEnv {
      DATABASE_URL: string;
      NEXTAUTH_JWT_SECRET: string;
      NEXTAUTH_SECRET: string;
      NEXTAUTH_URL: string; // Defina como string, sem a opção de undefined
      GITHUB_ID: string;
      GITHUB_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
    }
  }
  