import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import { doc, getDoc } from "firebase/firestore";

import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";
import { signInWithEmailAndPassword } from "firebase/auth";

function Login() {
    const { loading, setLoading } = useContext(myContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();



    const onLoginSuccess = async (values) => {
        const { email, password } = values;
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userData = {
                uid: user.uid,
                email: user.email,
                // role: firestoreData.role // lấy từ Firestore bảng "users"
            };
            localStorage.setItem('user', JSON.stringify(userData));
            notification.success({
                message: "Đăng nhập thành công",
            });
            navigate("/");

        } catch (error) {
            console.error("Lỗi đăng nhập:", error);
            notification.error({
                message: "Đăng nhập thất bại",
                description: "Email hoặc mật khẩu không đúng.",
            });
        }
        setLoading(false);
    }


    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200 py-20">
            <div className="container">
                <div className='flex justify-center items-center'>
                    <div className=" bg-orange-100 px-4 py-2 md:px-20 md:py-10 border border-orange-200 rounded-xl shadow-md w-full sm:w-2/3 lg:w-1/2">
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-bold text-orange-500'>
                                Đăng Nhập
                            </h2>
                        </div>
                        <div className="">
                            <Form
                                form={form}
                                initialValues={{ remember: false }}
                                onFinish={onLoginSuccess}
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
                                        placeholder="Email"
                                        className="block py-2 text-sm px-4 rounded-3xl w-full border-2 
                                    hover:border-orange-300 border-orange-200 outline-none focus:outline-none"
                                    />
                                </Form.Item>

                                <Form.Item
                                    name="password"
                                    rules={[
                                        { type: "password" },
                                        { required: true, message: "Vui lòng nhập mật khẩu!" }
                                    ]}
                                >
                                    <Input
                                        placeholder="Mật Khẩu"
                                        className="block py-2 text-sm px-4 rounded-3xl w-full border-2 
                                    hover:border-orange-300 border-orange-200 outline-none focus:outline-none"
                                    />
                                </Form.Item>

                                <div className="">
                                    {
                                        loading ? <div className="flex justify-start items-start">
                                            <Loader></Loader>
                                        </div> : <button
                                            type="submit"
                                            disabled={loading}
                                            className="font-bold bg-orange-300 hover:bg-orange-400 p-1 mt-1 rounded-md text-white tetx-base sm:text-lg w-2/3"
                                        >
                                            Đăng Nhập
                                        </button>
                                    }
                                </div>

                            </Form>
                        </div>

                        <div className="mt-2 w-full">
                            <p className='text-black'>
                                Chưa có tài khoản?{" "}
                                <Link className='text-primary font-bold text-base sm:text-lg' to={'/signup'}>Đăng ký</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
