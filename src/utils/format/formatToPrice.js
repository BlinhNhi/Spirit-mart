export const formatPrice = (value) => {
    if (!value) return "";
    const number = parseInt(value.toString().replace(/\D/g, ""), 10);
    return number.toLocaleString("vi-VN");
};