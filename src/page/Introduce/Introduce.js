import introduce from '../../assest/website/introduce.jpg'
function Introduce() {
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 pt-10">
            <div
                data-aos="fade-up"
                className="container">
                <h1 class="text-3xl text-center pb-4 font-semibold text-gray-500 dark:text-gray-100">Giới Thiệu</h1>
                <div className="flex flex-col gap-1 pb-10">
                    <h2 className="text-lg font-medium text-gray-600 dark:text-gray-200">
                        ShopTamLinh xin kính chào Quý Khách Hàng!
                    </h2>
                    <p className="text-base font-normal text-gray-500 dark:text-gray-100">
                        ShopTamLinh là thương hiệu chuyên về các sản phẩm về tiên tượng, tôn tượng, thánh tượng của chư Thánh,
                        Chư Thần, Chư Tiên, Chư Phật. Ngoài ra, ShopTamLinh còn cung cấp các sản phẩm về đồ thờ cúng, dịch vụ thờ cúng, tâm linh...
                    </p>
                    <ul className="text-base font-normal text-gray-500 dark:text-gray-100 flex flex-col gap-1">
                        <li>ShopTamLinh luôn luôn dẫn đầu xu thế về mọi mặt hàng trong ngành đồ cúng.</li>
                        <li>Luôn cập nhật những sản phẩm mới nhất với giá thành cạnh tranh nhất đến với khách hàng</li>
                        <li>Luôn đặt sự hài lòng và thuận tiện của khách hàng lên trên hết với phương châm uy tín – chất lượng – giá cạnh tranh.</li>
                        <li>Hãy đến và hợp tác cùng chúng tôi ! Nơi bạn có thể tìm kiếm 1 shop đồ cúng uy tín.</li>
                    </ul>
                    <div className="flex items-center my-3 w-full">
                        <img
                            alt={introduce}
                            src={introduce}
                            className="w-[300px] h-[200px] object-cover rounded-md sm:w-[500px] sm:h-[500px]"
                        ></img>
                    </div>
                    <h1 className="text-base font-medium text-gray-500 dark:text-gray-100">Mọi chi tiết tại thocung.com vui lòng liên hệ với thông tin sau:</h1>
                    <h1 className="text-lg font-medium text-gray-600 dark:text-gray-200">CÔNG TY CỔ PHẦN THỜ CÚNG</h1>
                    <h3 className="text-base font-medium text-gray-700 dark:text-gray-300"> 37A Nguyễn Hữu Cảnh, Phường 22, Quận Bình Thạnh, Tp.HCM</h3>
                </div>
            </div>
        </div>
    );
}

export default Introduce;