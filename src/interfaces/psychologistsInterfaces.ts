import { Document } from "mongoose";

export interface ISort {
  [key: string]: 1 | -1;
}

export interface IPsychologistsDocument extends Document {
  name: string;
  avatar_url: string;
  experience: string;
  reviews: { [key: string]: string | number }[];
  price_per_hour: string;
  rating: number;
  license: string;
  specialization: string;
  initial_consultation: string;
  about: string;
  owner: string[];
}
