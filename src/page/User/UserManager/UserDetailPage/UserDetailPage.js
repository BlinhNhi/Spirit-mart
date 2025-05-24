import { Button, Checkbox, Form, Input, notification } from "antd";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
    doc,
    setDoc,
    collection,
    query,
    where,
    getDocs,
} from "firebase/firestore";
import {
    getAuth,
    reauthenticateWithCredential,
    updatePassword,
    EmailAuthProvider,
    sendEmailVerification,
} from "firebase/auth";
import myContext from "../../../../Context/MyContext";
import { fireDB } from "../../../../Firebase/FirebaseConfig";

function UserDetailPage() {
    const inforUser = JSON.parse(localStorage.getItem("user")) || null;

    const { loading, setLoading } = useContext(myContext);
    const [checked, setChecked] = useState(false);
    const auth = getAuth();

    const validate = (values) => {
        const errors = {};
        if (checked && (!values.password?.trim() || values.password.length < 10)) {
            errors.password = "Mật khẩu mới phải lớn hơn 10 ký tự!";
        }
        if (!values.currentPassword?.trim()) {
            errors.currentPassword = "Vui lòng nhập mật khẩu hiện tại!";
        }
        return errors;
    };

    const checkEmailExists = async (email) => {
        const q = query(collection(fireDB, "users"), where("email", "==", email));
        const snapshot = await getDocs(q);
        return !snapshot.empty && email !== inforUser.email;
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            email: inforUser?.email || "",
            password: "",
            currentPassword: "",
            role: "user",
        },
        validate,
        onSubmit: async (values) => {
            try {
                setLoading(true);

                if (!auth.currentUser) {
                    throw new Error("Người dùng chưa đăng nhập.");
                }

                if (await checkEmailExists(values.email)) {
                    notification.error({
                        message: "Lỗi!",
                        description: "Email đã được sử dụng bởi tài khoản khác!",
                    });
                    return;
                }

                const credential = EmailAuthProvider.credential(
                    auth.currentUser.email,
                    values.currentPassword
                );
                await reauthenticateWithCredential(auth.currentUser, credential);

                // Nếu đổi email
                if (values.email !== inforUser.email) {
                    await sendEmailVerification(auth.currentUser);
                    notification.info({
                        message: "Xác minh email!",
                        description: "Vui lòng kiểm tra hộp thư và xác minh email trước khi cập nhật.",
                        duration: 8,
                    });
                    return;
                }

                if (checked && values.password) {
                    if (values.password === values.currentPassword) {
                        notification.error({
                            message: "Lỗi!",
                            description: "Mật khẩu mới không được trùng mật khẩu cũ!",
                        });
                        return;
                    }
                    await updatePassword(auth.currentUser, values.password);
                }

                const { password, currentPassword, ...userData } = values;
                await setDoc(doc(fireDB, "users", auth.currentUser.uid), userData, {
                    merge: true,
                });

                localStorage.setItem(
                    "user",
                    JSON.stringify({ ...inforUser, email: values.email })
                );

                formik.resetForm({
                    values: {
                        email: values.email,
                        password: "",
                        currentPassword: "",
                        role: "user",
                    },
                });

                setChecked(false);

                notification.success({
                    message: "Thành công!",
                    description: "Thông tin tài khoản đã được cập nhật!",
                });
            } catch (error) {
                const code = error?.code || "";
                const message = error?.message || "";
                let errorMsg = "Cập nhật thất bại!";

                if (code === "auth/wrong-password" || code === "auth/invalid-credential") {
                    errorMsg = "Mật khẩu hiện tại không đúng!";
                } else if (code === "auth/requires-recent-login") {
                    errorMsg = "Vui lòng đăng nhập lại để thực hiện thay đổi.";
                } else if (message.includes("chưa đăng nhập")) {
                    errorMsg = "Bạn chưa đăng nhập!";
                }

                notification.error({
                    message: "Lỗi!",
                    description: errorMsg,
                });
            } finally {
                setLoading(false);
            }
        },
    });

    const onChangeCheck = (e) => setChecked(e.target.checked);


    if (!inforUser) {
        return <Navigate to="/login" replace />;
    }

    const hasChanges =
        formik.values.email !== inforUser.email ||
        (checked && formik.values.password.trim() !== "");

    return (
        <div className="p-4 max-w-2xl mx-auto">
            <h3 className="font-semibold text-xl text-gray-800 dark:text-white mb-2">
                Xin chào {inforUser.email}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 italic mb-6">
                Cập nhật thông tin cá nhân. Vui lòng xác thực bằng mật khẩu hiện tại.
            </p>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow">
                <Form layout="vertical" onSubmitCapture={formik.handleSubmit}>
                    <Form.Item
                        label="Email mới"
                        validateStatus={formik.errors.email && formik.touched.email ? "error" : ""}
                        help={formik.errors.email && formik.touched.email ? formik.errors.email : ""}
                    >
                        <Input
                            readOnly
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Nhập email mới"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Checkbox checked={checked} onChange={onChangeCheck}>
                            Có, tôi muốn đổi mật khẩu
                        </Checkbox>
                    </Form.Item>

                    {checked && (
                        <>
                            <Form.Item
                                label="Mật khẩu hiện tại"
                                validateStatus={
                                    formik.errors.currentPassword && formik.touched.currentPassword ? "error" : ""
                                }
                                help={
                                    formik.errors.currentPassword && formik.touched.currentPassword
                                        ? formik.errors.currentPassword
                                        : ""
                                }
                            >
                                <Input.Password
                                    name="currentPassword"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.currentPassword}
                                    placeholder="Nhập mật khẩu hiện tại"
                                />
                            </Form.Item>

                            <Form.Item
                                label="Mật khẩu mới"
                                validateStatus={formik.errors.password && formik.touched.password ? "error" : ""}
                                help={formik.errors.password && formik.touched.password ? formik.errors.password : ""}
                            >
                                <Input.Password
                                    name="password"
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    value={formik.values.password}
                                    placeholder="Nhập mật khẩu mới"
                                />
                            </Form.Item>
                        </>
                    )}

                    <Form.Item>
                        <button
                            type="submit"
                            className={`px-2 py-2  text-white font-medium transition duration-200 rounded-lg
        ${loading ? "bg-orange-300 cursor-not-allowed" : "bg-orange-400 hover:bg-orange-500 hover:cursor-pointer"}
    `}
                            disabled={!hasChanges || loading}
                        >
                            {loading ? "Đang cập nhật..." : "Cập Nhật Tài Khoản"}
                        </button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    );
}

export default UserDetailPage;
