const generateSort = (name, price, popular) => {
    const sort = {};
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
//# sourceMappingURL=generateSort.js.map