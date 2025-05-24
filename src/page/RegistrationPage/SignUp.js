import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Input, notification } from "antd";
import emailjs from 'emailjs-com';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";

function SignUp() {
    const { loading, setLoading } = useContext(myContext);
    const navigate = useNavigate();
    const [form] = Form.useForm();

    const generateRandomPassword = () => {
        return Math.random().toString(36).slice(-8);
    };

    const sendPasswordToEmail = async (email, password) => {
        const templateParams = {
            to_email: email,
            message: `Mật khẩu của bạn là: ${password}`,
        };

        await emailjs.send(
            "service_0rtfq7r",
            "template_zpvksbk",
            templateParams,
            "ZwzNxgtOmrwMthw9v"
        );
    };

    const handleRegister = async (values) => {
        const email = values.email;
        const plainPassword = generateRandomPassword();

        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, plainPassword);
            await sendPasswordToEmail(email, plainPassword);
            await setDoc(doc(fireDB, "users", userCredential.user.uid), {
                email: email,
                role: 'user',
                createdAt: new Date()
            });
            notification.success({
                message: 'Đăng Ký Thành Công',
                description: 'Mật khẩu được gửi về email bạn đăng ký. Vui lòng kiểm tra hộp thư!',
            });
            form.resetFields(["email"]);
            navigate('/login');
        } catch (err) {
            console.error(err);
            if (err.code === "auth/email-already-in-use") {
                notification.error({
                    message: 'Đăng Ký Thất Bại',
                    description: 'Mail này đã được đăng ký!',
                });
                form.resetFields(["email"]);
            } else {
                notification.error({
                    message: 'Đăng Ký Thất Bại',
                    description: `${err.message}`,
                });
            }
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
                                Đăng Ký
                            </h2>
                        </div>
                        <div>
                            <Form
                                form={form}
                                initialValues={{ remember: false }}
                                onFinish={handleRegister}
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
                                        className="block py-1 sm:py-2 text-sm px-4 rounded-3xl w-full border-2 
                                    hover:border-orange-300 border-orange-200 outline-none focus:outline-none"
                                    />
                                </Form.Item>

                                <p className="font-semibold text-primary text-base  mb-2">
                                    Mật khẩu sẽ được gửi đến địa chỉ email của bạn.
                                </p>
                                {
                                    loading ? <div className="flex justify-start items-start">
                                        <Loader></Loader>
                                    </div> : <button
                                        type="submit"
                                        disabled={loading}
                                        className="font-semibold bg-orange-300 hover:bg-orange-400 p-1 mt-1 rounded-md text-white tetx-base sm:text-lg w-2/3"
                                    >
                                        Đăng Ký
                                    </button>
                                }

                            </Form>
                        </div>

                        <div className="mt-2">
                            <p className='text-black'>
                                Đã có tài khoản?{" "}
                                <Link className='text-primary font-bold text-base sm:text-lg' to={'/login'}>Đăng nhập</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SignUp;
