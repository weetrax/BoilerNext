import { IUser } from "./lib/database/models/User";

declare module "iron-session" {
  interface IronSessionData {
    user?: IUser;
  }
}

export type LanguageCode = "fr" | "en"

export type ResponseError = {
  message: string;
};