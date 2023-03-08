declare module "iron-session" {
  interface IronSessionData {
    user?: IUser;
  }
}

export interface IUser {
  username: string;
  email: string;
  password: string;
  country: ICountry;
  city: string;
  zipCode: string;
  tel: string;
  isAdmin: boolean;
  isVerified: boolean;
  createdAt: Date;
}

export interface ICountry {
  code: string;
  name: string;
}

export interface IAnnonce {
  title: string;
  description: string;
  photos: string[];
  price: number;
  acceptedCryptos: string;
  createdBy: string;
  createdAt: Date;
}

export type SelectCountryOption = {
  label: string;
  value: string;
  plainObject: ICountry;
};

export enum ThemeEnum {
  dark = "dark",
  light = "light"
}

export type ResponseError = {
  message: string;
};
