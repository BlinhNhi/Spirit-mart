import { Form, Input, notification } from "antd";
import { useContext, useRef, useState } from "react";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";
import emailjs from 'emailjs-com';
import { Link, useNavigate } from "react-router-dom";
import { auth, fireDB } from "../../Firebase/FirebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import myContext from "../../Context/MyContext";
import Loader from "../../Component/Loader/Loader";

function SignUp() {
    // const [loading, setLoading] = useState(false);
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

    const onRegisterSuccess = async (values) => {
        const email = values.email;
        const plainPassword = generateRandomPassword();
        const hashedPassword = await bcrypt.hash(plainPassword, 10);
        const uuid = uuidv4();

        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, hashedPassword);

            await setDoc(doc(fireDB, "users", uuid), {
                id: uuid,
                email: email,
                password: hashedPassword,
                role: 'user'
            });
            await sendPasswordToEmail(email, hashedPassword);
            notification.success({
                message: 'Đăng Ký Thành Công',
                description: 'Mật khẩu được gửi về email bạn đăng ký. Vui lòng kiểm tra hộp thư!',
            });
            form.resetFields(["email"]);
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
        navigate('/signup')
    };

    return (
        <div className="bg-gray-100 dark:bg-gray-900 dark:text-white duration-200">
            <div className='flex justify-center items-center h-screen'>
                <div className="login_Form bg-orange-100 px-8 py-6 border border-orange-200 rounded-xl shadow-md">
                    <div className="mb-5">
                        <h2 className='text-center text-2xl font-bold text-orange-500'>
                            Đăng Ký
                        </h2>
                    </div>
                    <div>
                        <Form
                            form={form}
                            initialValues={{ remember: false }}
                            onFinish={onRegisterSuccess}
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

                            <p className="font-semibold text-primary text-base w-full mb-2">
                                Một mật khẩu sẽ được gửi đến địa chỉ email của bạn.
                            </p>
                            {
                                loading ? <div className="flex justify-start items-start">
                                    <Loader></Loader>
                                </div> : <button
                                    type="submit"
                                    disabled={loading}
                                    className="font-bold bg-orange-300 hover:bg-orange-400 p-1 mt-2 rounded-md text-white text-lg w-2/3"
                                >
                                    Đăng Ký
                                </button>
                            }

                        </Form>
                    </div>

                    <div className="mt-4">
                        <p className='text-black'>
                            Đã có tài khoản?{" "}
                            <Link className='text-pink-500 font-bold' to={'/login'}>Đăng nhập</Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SignUp;
