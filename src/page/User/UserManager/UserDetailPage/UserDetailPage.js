import { notification } from "antd";
import { useFormik } from "formik";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import {
  FaEnvelope,
  FaLock,
  FaKey,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
  FaSave,
} from "react-icons/fa";
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
import Button from "../../../../Component/Button";

function PasswordField({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  error,
  Icon = FaLock,
}) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label
        htmlFor={name}
        className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-200"
      >
        {label}
      </label>
      <div className="group relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition-colors duration-200 group-focus-within:text-primary" />
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          className={`w-full rounded-xl border py-3 pl-11 pr-12 text-base
            text-gray-600 dark:text-gray-200 placeholder:text-gray-400
            bg-orange-50/50 dark:bg-[#0b0f1a]
            outline-none transition-all duration-200
            focus:border-primary focus:ring-4 focus:ring-primary/15
            ${
              error
                ? "border-red-500"
                : "border-orange-200 dark:border-white/10"
            }`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          aria-label={show ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary transition-colors duration-200"
        >
          {show ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
      {error && <p className="mt-1.5 text-sm text-red-500">{error}</p>}
    </div>
  );
}

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
          values.currentPassword,
        );
        await reauthenticateWithCredential(auth.currentUser, credential);

        // Nếu đổi email
        if (values.email !== inforUser.email) {
          await sendEmailVerification(auth.currentUser);
          notification.info({
            message: "Xác minh email!",
            description:
              "Vui lòng kiểm tra hộp thư và xác minh email trước khi cập nhật.",
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
          JSON.stringify({ ...inforUser, email: values.email }),
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

        if (
          code === "auth/wrong-password" ||
          code === "auth/invalid-credential"
        ) {
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

  if (!inforUser) {
    return <Navigate to="/login" replace />;
  }

  const hasChanges =
    formik.values.email !== inforUser.email ||
    (checked && formik.values.password.trim() !== "");

  // thanh độ dài mật khẩu mới
  const pwLen = formik.values.password.length;
  const pwPercent = Math.min(pwLen / 10, 1) * 100;
  const pwColor =
    pwLen === 0
      ? "bg-transparent"
      : pwLen < 5
        ? "bg-red-500"
        : pwLen < 10
          ? "bg-orange-400"
          : "bg-green-500";

  const cardClass =
    "rounded-2xl bg-white dark:bg-[#131a2a] border border-orange-200 dark:border-white/10 shadow-sm";

  return (
    <div className="max-w-3xl">
      <style>{`
        @keyframes profileFadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        style={{ animation: "profileFadeUp 0.45s ease-out both" }}
        className={`${cardClass} relative overflow-hidden p-5 sm:p-6 hover:shadow-xl hover:shadow-primary/10 transition-shadow duration-300`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-r from-primary/25 via-primary/10 to-transparent" />
        <div className="relative flex items-center gap-4 sm:gap-5">
          <div className="flex h-16 w-16 sm:h-20 sm:w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary text-white text-2xl sm:text-3xl font-bold uppercase shadow-lg shadow-primary/30 ring-4 ring-white dark:ring-[#131a2a]">
            {inforUser.email?.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="text-sm text-gray-500 dark:text-gray-400">Xin chào</p>
            <h3 className="truncate text-lg sm:text-xl font-bold text-gray-600 dark:text-gray-100">
              {inforUser.email}
            </h3>
            <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-semibold text-primary">
              <FaShieldAlt size={10} />
              Tài khoản người dùng
            </span>
          </div>
        </div>
        <p className="relative mt-4 text-sm italic text-gray-600 dark:text-gray-200 opacity-80">
          Cập nhật thông tin cá nhân. Vui lòng xác thực bằng mật khẩu hiện tại.
        </p>
      </div>

      <form onSubmit={formik.handleSubmit} className="mt-6 flex flex-col gap-6">
        {/* thông tin tài khoản */}
        <div
          style={{ animation: "profileFadeUp 0.45s ease-out 100ms both" }}
          className={`${cardClass} p-5 sm:p-6`}
        >
          <h4 className="mb-4 text-lg font-bold text-gray-600 dark:text-gray-100">
            Thông tin tài khoản
          </h4>

          <label
            htmlFor="email"
            className="mb-1.5 block text-sm font-medium text-gray-600 dark:text-gray-200"
          >
            Email
          </label>
          <div className="relative">
            <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              id="email"
              readOnly
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Nhập email"
              className="w-full cursor-not-allowed rounded-xl border border-orange-200 dark:border-white/10
                bg-gray-100 dark:bg-white/5 py-3 pl-11 pr-12 text-base
                text-gray-600 dark:text-gray-200 outline-none"
            />
            <FaLock
              size={13}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>
          {formik.errors.email && formik.touched.email && (
            <p className="mt-1.5 text-sm text-red-500">{formik.errors.email}</p>
          )}
        </div>

        {/* bảo mật */}
        <div
          style={{ animation: "profileFadeUp 0.45s ease-out 200ms both" }}
          className={`${cardClass} p-5 sm:p-6`}
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <h4 className="text-lg font-bold text-gray-600 dark:text-gray-100">
                Bảo mật
              </h4>
              <p className="text-sm text-gray-600 dark:text-gray-200 opacity-80">
                Có, tôi muốn đổi mật khẩu
              </p>
            </div>

            {/* công tắc gạt */}
            <label className="relative inline-flex cursor-pointer items-center">
              <input
                type="checkbox"
                checked={checked}
                onChange={(e) => setChecked(e.target.checked)}
                className="peer sr-only"
              />
              <div
                className="h-7 w-12 rounded-full bg-gray-300 dark:bg-white/15 transition-colors duration-300
                  peer-checked:bg-primary peer-focus-visible:ring-4 peer-focus-visible:ring-primary/30
                  after:content-[''] after:absolute after:left-1 after:top-1 after:h-5 after:w-5
                  after:rounded-full after:bg-white after:shadow after:transition-all after:duration-300
                  peer-checked:after:translate-x-5"
              />
            </label>
          </div>

          <div
            className={`grid transition-all duration-500 ease-out ${
              checked
                ? "visible grid-rows-[1fr] opacity-100 mt-5"
                : "invisible grid-rows-[0fr] opacity-0 mt-0"
            }`}
          >
            <div className="overflow-hidden">
              <div className="flex flex-col gap-5 border-t border-orange-200 dark:border-white/10 pt-5">
                <PasswordField
                  label="Mật khẩu hiện tại"
                  name="currentPassword"
                  value={formik.values.currentPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  placeholder="Nhập mật khẩu hiện tại"
                  Icon={FaLock}
                  error={
                    formik.touched.currentPassword &&
                    formik.errors.currentPassword
                  }
                />

                <div>
                  <PasswordField
                    label="Mật khẩu mới"
                    name="password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Nhập mật khẩu mới"
                    Icon={FaKey}
                    error={formik.touched.password && formik.errors.password}
                  />
                  <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${pwColor}`}
                      style={{ width: `${pwPercent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Mật khẩu mới cần từ 10 ký tự trở lên ({pwLen}/10).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          style={{ animation: "profileFadeUp 0.45s ease-out 300ms both" }}
          className="flex sm:justify-end"
        >
          <Button
            type="submit"
            disabled={!hasChanges || loading}
            className="w-full sm:w-auto !px-8 !py-3 text-base hover:-translate-y-0.5 disabled:hover:translate-y-0"
          >
            {loading ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Đang cập nhật...
              </>
            ) : (
              <div className="flex items-center gap-2">
                <FaSave />
                Cập Nhật Tài Khoản
              </div>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}

export default UserDetailPage;
