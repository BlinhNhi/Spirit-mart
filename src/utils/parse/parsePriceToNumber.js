export const parsePriceToNumber = (priceString) => {
    if (!priceString) return 0;
    return Number(priceString.toString().replace(/[^0-9]/g, ""));
};
