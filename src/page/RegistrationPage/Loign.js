import { useContext } from "react";
import { Link } from "react-router-dom";
import { Form, Input, notification } from "antd";
import { doc, getDoc } from "firebase/firestore";
import { signInWithEmailAndPassword } from "firebase/auth";

import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import myContext from "../../Context/MyContext";

function Login() {
    const { setLoading } = useContext(myContext);
    const [form] = Form.useForm();

    const handleLogin = async (values) => {
        const { email, password } = values;
        setLoading(true);
        if (email?.trim() === "" || password?.trim() === "") {
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Vui lòng điền đầy đủ email, password
                        và không để trống đầu câu.</>
                ),
            })
            return;
        }
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            const userDocRef = doc(fireDB, "users", user.uid);
            const userSnapshot = await getDoc(userDocRef);
            if (userSnapshot.exists()) {
                const dataUser = userSnapshot.data();
                const userData = {
                    uid: user.uid,
                    email: user.email,
                    role: dataUser.role
                };
                localStorage.setItem('user', JSON.stringify(userData));
                notification.success({
                    message: "Đăng nhập thành công",
                });
                if (dataUser.role === 'admin') {
                    window.location.href = "/admin/category-mng";
                } else {
                    window.location.href = "/";
                }
                return;
            } else {
                throw new Error("Người dùng không tồn tại trong Firestore");
            }
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
                    <div className=" bg-orange-100 px-4 py-2 md:px-20 md:py-10 border border-orange-200 rounded-xl shadow-md w-full sm:w-2/3 lg:w-[45%]">
                        <div className="mb-5">
                            <h2 className='text-center text-2xl font-bold text-orange-500'>
                                Đăng Nhập
                            </h2>
                        </div>
                        <div className="">
                            <Form
                                form={form}
                                initialValues={{ remember: false }}
                                onFinish={handleLogin}
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
                                    <Input.Password
                                        placeholder="Mật Khẩu"
                                        className=" py-2 text-sm px-4 rounded-3xl w-full border-2 flex
                                    hover:border-orange-300 border-orange-200 outline-none focus:outline-none"
                                    />
                                </Form.Item>
                                <div className="flex justify-between items-center xl:flex-row flex-col">
                                    <button
                                        type="submit"
                                        // disabled={loading}
                                        className="font-semibold bg-orange-300 hover:bg-orange-400 py-1 px-2 mt-1 rounded-md text-white tetx-base sm:text-lg
                                        
                                    "
                                    >
                                        Đăng Nhập
                                    </button>
                                    <p className='text-black text-base'>
                                        Chưa có tài khoản?{" "}
                                        <Link className='text-primary font-bold text-base sm:text-lg hover:text-primary/80' to={'/signup'}>Đăng ký</Link>
                                    </p>
                                </div>
                            </Form>
                        </div>

                        <div className="mt-4 w-full">
                            <p className='text-black text-base'>
                                Quên mật khẩu?{" "}
                                <Link className='text-primary font-bold text-base sm:text-lg hover:text-primary/80' to={'/forgetpassword'}>Lấy lại mật khẩu</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
