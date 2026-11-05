import {
  FaCheckCircle,
  FaMedal,
  FaGem,
  FaTags,
  FaBuilding,
  FaMapMarkerAlt,
  FaGlobe,
  FaPhoneAlt,
} from "react-icons/fa";
import introduce from "../../assest/website/introduce.jpg";
import Button from "../../Component/Button";

const cardClass =
  "rounded-2xl bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 shadow-sm";

const HIGHLIGHTS = [
  "ShopTamLinh luôn luôn dẫn đầu xu thế về mọi mặt hàng trong ngành đồ cúng.",
  "Luôn cập nhật những sản phẩm mới nhất với giá thành cạnh tranh nhất đến với khách hàng",
  "Luôn đặt sự hài lòng và thuận tiện của khách hàng lên trên hết với phương châm uy tín – chất lượng – giá cạnh tranh.",
  "Hãy đến và hợp tác cùng chúng tôi ! Nơi bạn có thể tìm kiếm 1 shop đồ cúng uy tín.",
];

const VALUES = [
  {
    Icon: FaMedal,
    title: "Uy tín",
    desc: "Đặt sự hài lòng của khách hàng lên trên hết",
  },
  {
    Icon: FaGem,
    title: "Chất lượng",
    desc: "Luôn cập nhật những sản phẩm mới nhất",
  },
  {
    Icon: FaTags,
    title: "Giá cạnh tranh",
    desc: "Giá thành tốt nhất đến với khách hàng",
  },
];

function Introduce() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-10 lg:py-14">
      <div className="container">
        {/* tiêu đề */}
        <div data-aos="fade-up" className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">
            Về chúng tôi
          </p>
          <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-gray-600 dark:text-gray-100">
            Giới Thiệu
          </h1>
          <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />
        </div>

        {/* nội dung + ảnh */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
          <div data-aos="fade-right" className="min-w-0">
            <h2 className="text-lh sm:text-2xl font-bold text-gray-600 dark:text-gray-100">
              ShopTamLinh xin kính chào Quý Khách Hàng!
            </h2>
            <p className="mt-4 text-base leading-relaxed font-normal text-gray-600 dark:text-gray-200">
              ShopTamLinh là thương hiệu chuyên về các sản phẩm về tiên tượng,
              tôn tượng, thánh tượng của chư Thánh, Chư Thần, Chư Tiên, Chư
              Phật. Ngoài ra, ShopTamLinh còn cung cấp các sản phẩm về đồ thờ
              cúng, dịch vụ thờ cúng, tâm linh...
            </p>

            <ul className="mt-6 flex flex-col gap-1">
              {HIGHLIGHTS.map((text) => (
                <li
                  key={text}
                  className="group flex items-start gap-3 rounded-xl p-3 transition-all duration-300
                    hover:bg-white dark:hover:bg-[#131a2a] hover:shadow-md hover:translate-x-1"
                >
                  <FaCheckCircle className="mt-1 shrink-0 text-primary transition-transform duration-300 group-hover:scale-125" />
                  <span className="text-base font-normal text-gray-600 dark:text-gray-200">
                    {text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* ảnh có khung lệch */}
          <div
            data-aos="fade-left"
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="absolute -bottom-4 -right-4 h-full w-full rounded-3xl border-2 border-primary/60" />
            <div className="absolute -left-3 -top-3 h-24 w-24 rounded-full bg-primary/20 blur-2xl" />
            <div className="group relative overflow-hidden rounded-3xl border border-orange-200 dark:border-white/10 shadow-xl shadow-primary/10">
              <img
                alt="ShopTamLinh"
                src={introduce}
                className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-4">
                <p className="text-sm font-semibold text-white">
                  Uy tín – Chất lượng – Giá cạnh tranh
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 3 giá trị */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-5">
          {VALUES.map(({ Icon, title, desc }, i) => (
            <div
              key={title}
              data-aos="fade-up"
              data-aos-delay={i * 100}
              className={`${cardClass} group p-6 text-center transition-all duration-300
                hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/10 hover:border-primary/60`}
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 text-primary text-xl transition-all duration-300 group-hover:bg-primary group-hover:text-white group-hover:scale-110">
                <Icon />
              </div>
              <h3 className="mt-4 text-lg font-bold text-gray-600 dark:text-gray-100">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-200 opacity-80">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* liên hệ */}
        <div
          data-aos="fade-up"
          className="mt-14 rounded-3xl p-6 sm:p-8 shadow-xl bg-gray-800 dark:bg-[#131a2a] border border-transparent dark:border-white/10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 lg:items-center">
            <div className="min-w-0">
              <p className="text-base font-medium text-gray-200 opacity-80">
                Mọi chi tiết tại thocung.com vui lòng liên hệ với thông tin sau:
              </p>
              <h3 className="mt-2 flex items-center gap-3 text-xl sm:text-xl font-extrabold text-gray-100">
                <FaBuilding className="shrink-0 text-primary" />
                CÔNG TY CỔ PHẦN THỜ CÚNG
              </h3>

              <div className="mt-4 flex flex-col gap-3 text-gray-200">
                <p className="flex items-start gap-3">
                  <FaMapMarkerAlt className="mt-1 shrink-0 text-primary" />
                  <span className="font-medium">
                    37A Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, Tp.HCM
                  </span>
                </p>
                <p className="flex items-center gap-3">
                  <FaGlobe className="shrink-0 text-primary" />
                  <span className="font-medium">thocung.com</span>
                </p>
              </div>
            </div>

            <a href="tel:0917023265" className="block w-full lg:w-auto">
              <Button className="w-full lg:w-64 !py-3 text-base flex items-center justify-center gap-2">
                <FaPhoneAlt size={14} />
                <span>Gọi: 0917023265</span>
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Introduce;
