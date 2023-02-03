declare namespace NodeJS {
  export interface ProcessEnv {
    HOST?: string;
    PORT?: number;
    DATABASE_HOST?: string;
    DATABASE_USERNAME?: string;
    DATABASE_PASSWORD?: string;
    DATABASE_NAME?: string;
    DATABASE_PORT?: number;
  }
}
