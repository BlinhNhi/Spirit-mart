const posts = [
    {
        title: "Bí Mật Của Đá (Phần 7) - San Hô Đỏ",
        description: "Đá san hô đỏ ấm áp, dễ chịu và tuyệt đẹp! Viên đá mang một vẻ đẹp sang trọng, quy...",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    },
    {
        title: "Bí Mật Của Đá (Phần 6) - Citrine Thạch Anh Vàng",
        description: "Citrine là gì? Cùng VUS tìm hiểu về loại đá này nhé. Citrine giống như Vitamin C cho tâm h...",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    },
    {
        title: "Bí Mật Của Đá (Phần 5) - Aquamarine Hải Lam Ngọc",
        description: "Cùng VUS tìm hiểu về đá aquamarine hải lam ngọc thiên nhiên",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    },
    {
        title: "Bí Mật Của Đá (Phần 4) - Thạch anh tím",
        description: "Cùng VUS tìm hiểu về đá thạch anh tím huyền bí và đặc biệt.",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    },
    {
        title: "Bí Mật Của Đá (Phần 3) - Amazonite",
        description: "Cùng VUS tìm hiểu kỹ hơn về câu chuyện của Đá AMAZONITE",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    },
    {
        title: "Bí Mật Của Đá (Phần 1)",
        description: "Bông hoa đẹp vì vẻ mềm mại, mong manh và sớm lụi tàn. Viên đá đẹp vì sự mạnh mẽ, cứng...",
        image: "https://vouushop.com/uploads/images/2022/08/546x350-1660105707-single_news2-544x5441595224823multiproduct10p1013408copy.jpg"
    }
];

export default function Post() {
    return (
        <div
            data-aos="fade-up"
            className="container mx-auto  py-8">
            <p className="text-xl text-center font-medium text-gray-500 ">Bài Viết</p>
            <h1 className="text-2xl text-center font-bold text-primary mb-6">Bài Viết Mới Nhất</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post, index) => (
                    <a href="/">
                        <div key={index} className="bg-white rounded-lg shadow hover:shadow-lg transition duration-300 h-[300px]  overflow-hidden">
                            <img src={post.image} alt={post.title} className=" w-full h-48 object-cover rounded-t-lg transition-transform duration-300 transform hover:scale-105" />
                            <div className="p-4">
                                <h2 className="text-lg font-semibold mb-2">{post.title}</h2>
                                <p className="text-sm text-gray-600">{post.description}</p>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
        </div>
    );
}
