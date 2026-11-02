
import { useNavigate } from "react-router-dom";
import { FaQuoteLeft, FaRegCommentDots } from "react-icons/fa";
import Button from "../Button";

function Comment() {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="relative overflow-hidden p-6 sm:p-10 bg-gray-200 dark:bg-gray-800/70 border border-primary/20 dark:border-orange-400/20 shadow-xl shadow-primary/10 dark:shadow-black/30 rounded-2xl">
      {/* vệt sáng trang trí ở góc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative">
        <h1 className="text-2xl text-center pb-3 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bình luận
        </h1>

        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />

        <div className="flex flex-col gap-1 pb-10">
          <h2 className="text-base text-center font-medium text-gray-600 dark:text-gray-300">
            Khách hàng nói gì về chúng tôi?
          </h2>
        </div>

        {/* Danh sách bình luận */}
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto py-2 px-3">
          {/* Bình luận 1 */}
          <div className="group relative z-0 hover:z-20 flex items-start gap-3 w-full">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220"
              alt="user"
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="relative flex flex-col flex-1 min-w-0 px-5 py-3 bg-white/80 dark:bg-gray-900/60 border border-transparent rounded-2xl rounded-tl-sm shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <FaQuoteLeft className="absolute top-3 right-4 text-xl text-primary/20 transition-colors duration-300 group-hover:text-primary/50" />

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                Nguyễn Văn B
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 pr-6">
                Sản phẩm chất lượng, giao hàng nhanh chóng! Tôi rất hài lòng với
                dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao
                hàng nhanh chóng. Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
              </p>
            </div>
          </div>

          {/* Bình luận 2 */}
          <div className="group relative z-0 hover:z-20 flex items-start gap-3 w-full">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220"
              alt="user"
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="relative flex flex-col flex-1 min-w-0 px-5 py-3 bg-white/80 dark:bg-gray-900/60 border border-transparent rounded-2xl rounded-tl-sm shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <FaQuoteLeft className="absolute top-3 right-4 text-xl text-primary/20 transition-colors duration-300 group-hover:text-primary/50" />

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                Nguyễn Văn B
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 pr-6">
                Sản phẩm chất lượng, giao hàng nhanh chóng! Tôi rất hài lòng với
                dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao
                hàng nhanh chóng. Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
              </p>
            </div>
          </div>

          {/* Bình luận 3 */}
          <div className="group relative z-0 hover:z-20 flex items-start gap-3 w-full">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220"
              alt="user"
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="relative flex flex-col flex-1 min-w-0 px-5 py-3 bg-white/80 dark:bg-gray-900/60 border border-transparent rounded-2xl rounded-tl-sm shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <FaQuoteLeft className="absolute top-3 right-4 text-xl text-primary/20 transition-colors duration-300 group-hover:text-primary/50" />

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                Nguyễn Văn B
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 pr-6">
                Sản phẩm chất lượng, giao hàng nhanh chóng! Tôi rất hài lòng với
                dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao
                hàng nhanh chóng. Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
              </p>
            </div>
          </div>

          {/* Bình luận 4 */}
          <div className="group relative z-0 hover:z-20 flex items-start gap-3 w-full">
            <img
              src="https://tse4.mm.bing.net/th?id=OIP.eGHa3HgHxIlTHmcvKNDs7AHaGe&pid=Api&P=0&h=220"
              alt="user"
              className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110"
            />

            <div className="relative flex flex-col flex-1 min-w-0 px-5 py-3 bg-white/80 dark:bg-gray-900/60 border border-transparent rounded-2xl rounded-tl-sm shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
              <FaQuoteLeft className="absolute top-3 right-4 text-xl text-primary/20 transition-colors duration-300 group-hover:text-primary/50" />

              <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                Nguyễn Văn B
              </h3>

              <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 pr-6">
                Sản phẩm chất lượng, giao hàng nhanh chóng! Tôi rất hài lòng với
                dịch vụ của ShopTamLinh. Sản phẩm đẹp, chất lượng tốt và giao
                hàng nhanh chóng. Tôi sẽ tiếp tục ủng hộ shop trong tương lai!
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-wrap items-center justify-between gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
          <p className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-300">
            <FaRegCommentDots className="text-primary" />
            Chia sẻ cảm nhận của bạn về ShopTamLinh
          </p>

          {userLogin ? (
            <Button className="!py-2.5">
              Thêm bình luận
            </Button>
          ) : (
            <Button
              onClick={() => navigate("/login")}
              className="!py-2.5 w-60"
            >
              Đăng nhập để bình luận
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Comment;
