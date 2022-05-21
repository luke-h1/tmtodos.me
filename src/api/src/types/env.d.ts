declare global {
  namespace NodeJS {
    interface ProcessEnv {
      FRONTEND_URL: string;
      JWT_SECRET: string;
      PORT: string;
    }
  }
}

export {};
