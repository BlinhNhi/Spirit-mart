import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rate }) => {
    // Làm tròn số sao để xác định từng loại
    const fullStars = Math.floor(rate); // sao vàng đầy
    const hasHalfStar = rate - fullStars >= 0.25 && rate - fullStars <= 0.75; // sao nửa
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0); // sao xám

    const stars = [];

    for (let i = 0; i < fullStars; i++) {
        stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
        stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    for (let i = 0; i < emptyStars; i++) {
        stars.push(<FaStar key={`empty-${i}`} className="text-gray-400" />);
    }

    return <div className="flex items-center text-base mb-4">{stars}</div>;
};

export default StarRating;