import { ISort } from "../interfaces/psychologistsInterfaces.js";

const generateSort = (
  name?: string,
  price?: string,
  popular?: string
): ISort => {
  const sort: ISort = {};
  if (name && (name === "asc" || name === "desc")) {
    sort.name = name === "desc" ? -1 : 1;
  }
  if (price && (price === "asc" || price === "desc")) {
    sort.price_per_hour = price === "desc" ? -1 : 1;
  }
  if (popular && (popular === "asc" || popular === "desc")) {
    sort.rating = popular === "desc" ? -1 : 1;
  }
  return sort;
};
export default generateSort;
