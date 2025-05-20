import { GiLotus } from "react-icons/gi";
function Loader() {
    return (
        <div className="absolute flex items-center justify-center gap-2">
            <div className="flex gap-2 justify-center items-center text-pink-200 animate-bounce ">
                <GiLotus className="text-4xl text-pink-500 font-extrabold" />
                <span className="text-gray-500 font-bold">Loading...</span>
            </div>
        </div>
    );
}

export default Loader;