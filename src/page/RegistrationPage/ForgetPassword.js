import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import { sendPasswordResetEmail } from "firebase/auth";

import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { auth } from "../../Firebase/FirebaseConfig";

function ForgetPassword() {
    const { loading, setLoading } = useContext(myContext);
    const navigate = useNavigate();
    const handleForgotPassword = async (values) => {
        const email = values.email;
        setLoading(true);
        try {
            await sendPasswordResetEmail(auth, email);
            notification.success({
                message: "Đã gửi email khôi phục",
                description: "Vui lòng kiểm tra hộp thư để đặt lại mật khẩu.",
            });
            navigate('/login');
        } catch (error) {
            notification.error({
                message: "Lỗi",
                description: error.message,
            });
        }
        setLoading(false);
    };
    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-20">
            <div className="container">
                <div className='flex items-center justify-center'>
                    <div className=" bg-orange-100 px-4 py-2 md:px-20 md:py-10 border border-orange-200 rounded-xl shadow-md w-full sm:w-2/3 lg:w-1/2">
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-bold text-orange-500'>
                                Quên Mật Khẩu
                            </h2>
                        </div>
                        <div>
                            <Form
                                initialValues={{ remember: false }}
                                onFinish={handleForgotPassword}
                                autoComplete="off"
                            >
                                <Form.Item
                                    name="email"
                                    rules={[
                                        { type: "email", message: "E-mail không hợp lệ!" },
                                        { required: true, message: "Vui lòng nhập email!" }
                                    ]}
                                >
                                    <Input
                                        placeholder="Nhập email của bạn..."
                                        className="block py-1 sm:py-2 text-sm px-4 rounded-3xl w-full border-2 
                                    hover:border-orange-300 border-orange-200 outline-none focus:outline-none"
                                    />
                                </Form.Item>

                                <p className="font-semibold text-primary text-base  mb-2">
                                    Mật khẩu mới sẽ được gửi đến địa chỉ email của bạn. Vui lòng kiểm tra email.
                                </p>
                                {
                                    loading ? <div className="flex justify-start items-start">
                                        <Loader></Loader>
                                    </div> : <button
                                        type="submit"
                                        disabled={loading}
                                        className="font-semibold bg-orange-300 hover:bg-orange-400 p-1 mt-1 rounded-md text-white tetx-base sm:text-lg w-2/3"
                                    >
                                        Lấy Lại Mật Khẩu.
                                    </button>
                                }

                            </Form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default ForgetPassword;