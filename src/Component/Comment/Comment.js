import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useRef, useState, lazy, Suspense } from "react";
import {
  addDoc,
  collection,
  serverTimestamp,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import {
  FaQuoteLeft,
  FaRegCommentDots,
  FaEdit,
  FaTrash,
  FaRegSmile,
} from "react-icons/fa";
import { notification } from "antd";

import { fireDB } from "../../Firebase/FirebaseConfig";
import MyContext from "../../Context/MyContext";
import Button from "../Button";
import ConfirmModal from "../ConfirmModal";

// tải bảng emoji khi cần dùng, không làm nặng trang lúc mới vào
const EmojiPicker = lazy(() => import("emoji-picker-react"));

const QUICK_EMOJIS = ["👍", "❤️", "😍", "🙏", "🔥"];

function Comment() {
  const navigate = useNavigate();
  const userLogin = JSON.parse(localStorage.getItem("user"));
  const { getAllComments } = useContext(MyContext);

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [showInput, setShowInput] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedComment, setSelectedComment] = useState(null);
  const [showEmoji, setShowEmoji] = useState(false);
  const textareaRef = useRef(null);

  // Thêm bình luận
  const handleCreateComment = async () => {
    if (!content.trim()) {
      notification.error({
        message: "Lỗi",
        description: "Vui lòng nhập nội dung bình luận!",
      });
      return;
    }

    if (!userLogin) {
      navigate("/login");
      return;
    }

    try {
      setLoading(true);

      const commentRef = collection(fireDB, "comment");

      await addDoc(commentRef, {
        userId: userLogin.uid,
        userEmail: userLogin.email,
        userRole: userLogin.role,
        userName: userLogin.email.split("@")[0],
        userAvatar: "",
        content: content.trim(),
        createdAt: serverTimestamp(),
      });

      notification.success({
        message: "Thành công",
        description: "Thêm bình luận thành công!",
      });

      setContent("");
      setShowInput(false);
    } catch (error) {
      console.log(error);

      notification.error({
        message: "Lỗi",
        description: "Thêm bình luận không thành công!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Mở modal xác nhận xóa bình luận
  const handleDeleteComment = (item) => {
    if (!userLogin?.uid) {
      navigate("/login");
      return;
    }

    // Kiểm tra bình luận có tồn tại và đúng chủ sở hữu
    const comment = getAllComments.find((comment) => comment.id === item.id);

    if (!comment || comment.userId !== userLogin.uid) {
      notification.error({
        message: "Không có quyền",
        description: "Bạn không có quyền xóa bình luận này!",
      });
      return;
    }

    setSelectedComment(item);
    setShowDeleteModal(true);
  };

  // Xác nhận xóa bình luận
  const handleConfirmDelete = async () => {
    if (!selectedComment) return;

    try {
      setLoading(true);

      await deleteDoc(doc(fireDB, "comment", selectedComment.id));

      // Nếu đang chỉnh sửa bình luận vừa bị xóa thì đóng form
      if (editingCommentId === selectedComment.id) {
        setEditingCommentId(null);
        setContent("");
        setShowInput(false);
      }

      notification.success({
        message: "Thành công",
        description: "Xóa bình luận thành công!",
      });

      setShowDeleteModal(false);
      setSelectedComment(null);
    } catch (error) {
      console.log(error);

      notification.error({
        message: "Lỗi",
        description: "Xóa bình luận không thành công!",
      });
    } finally {
      setLoading(false);
    }
  };

  // Đóng modal xác nhận xóa
  const handleCancelDelete = () => {
    if (loading) return;

    setShowDeleteModal(false);
    setSelectedComment(null);
  };

  // Cập nhật bình luận
  const handleUpdateComment = async () => {
    if (!content.trim()) {
      notification.error({
        message: "Lỗi",
        description: "Nội dung bình luận không được để trống!",
      });
      return;
    }

    const comment = getAllComments.find((item) => item.id === editingCommentId);

    // Kiểm tra bình luận có tồn tại và đúng chủ sở hữu
    if (!comment || comment.userId !== userLogin?.uid) {
      notification.error({
        message: "Không có quyền",
        description: "Bạn không có quyền sửa bình luận này!",
      });
      return;
    }

    try {
      setLoading(true);

      await updateDoc(doc(fireDB, "comment", editingCommentId), {
        content: content.trim(),
        updatedAt: serverTimestamp(),
      });

      notification.success({
        message: "Thành công",
        description: "Cập nhật bình luận thành công!",
      });

      setContent("");
      setEditingCommentId(null);
      setShowInput(false);
    } catch (error) {
      console.log(error);

      notification.error({
        message: "Lỗi",
        description: "Cập nhật bình luận không thành công!",
      });
    } finally {
      setLoading(false);
    }
  };

  // đóng form thì đóng luôn bảng emoji
  useEffect(() => {
    if (!showInput) setShowEmoji(false);
  }, [showInput]);

  // chèn emoji tại vị trí con trỏ (hoặc thay thế đoạn đang bôi đen)
  const insertEmoji = (emoji) => {
    const el = textareaRef.current;
    if (!el) {
      setContent((c) => c + emoji);
      return;
    }
    const start = el.selectionStart ?? content.length;
    const end = el.selectionEnd ?? content.length;
    setContent(content.slice(0, start) + emoji + content.slice(end));

    // đặt lại con trỏ ngay sau emoji vừa chèn
    requestAnimationFrame(() => {
      el.focus();
      const pos = start + emoji.length;
      el.setSelectionRange(pos, pos);
    });
  };

  console.log("getAllComments: ", getAllComments);

  return (
    <div className="relative overflow-hidden p-6 sm:p-10 bg-gray-200 dark:bg-gray-800/70 border border-primary/20 dark:border-orange-400/20 shadow-xl shadow-primary/10 dark:shadow-black/30 rounded-2xl">
      {/* Vệt sáng trang trí ở góc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
      />

      <div className="relative">
        <h1 className="text-2xl text-center pb-3 font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Bình luận
        </h1>

        <div className="mx-auto mb-4 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary" />

        <div className="flex flex-col gap-1 pb-10">
          <h2 className="text-base text-center font-medium text-gray-600 dark:text-gray-300">
            Khách hàng nói gì về chúng tôi?
          </h2>
        </div>

        {/* Danh sách bình luận */}
        <div className="flex flex-col gap-4 max-h-96 overflow-y-auto py-2 px-3">
          {getAllComments.length > 0 ? (
            getAllComments.map((item) => (
              <div
                key={item.id}
                className="group relative z-0 hover:z-20 flex items-start gap-3 w-full"
              >
                {item.userAvatar ? (
                  <img
                    src={item.userAvatar}
                    alt={item.userName || "user"}
                    className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full object-cover ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110"
                  />
                ) : (
                  <div className="w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white font-bold text-lg uppercase ring-2 ring-primary/60 ring-offset-2 ring-offset-gray-200 dark:ring-offset-gray-800 transition-transform duration-300 ease-out group-hover:scale-110">
                    {item.userName?.trim()?.charAt(0) || "U"}
                  </div>
                )}

                <div className="relative flex flex-col flex-1 min-w-0 px-5 py-3 bg-white/80 dark:bg-gray-900/60 border border-transparent rounded-2xl rounded-tl-sm shadow-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10">
                  <FaQuoteLeft className="absolute top-3 right-4 text-xl text-primary/20 transition-colors duration-300 group-hover:text-primary/50" />

                  <h3 className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-100 group-hover:text-primary transition-colors duration-300">
                    {item.userName || "Khách hàng"}
                  </h3>

                  {/* Nội dung bình luận */}
                  <p className="text-xs sm:text-sm leading-relaxed text-gray-600 dark:text-gray-300 pr-6 break-words">
                    {item.content}
                  </p>

                  {/* Chân bình luận: ngày giờ + hành động */}
                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-gray-200 dark:border-gray-700 pt-3">
                    <span className="text-[11px] text-gray-400">
                      {item.createdAt?.toDate
                        ? item.createdAt.toDate().toLocaleString("vi-VN")
                        : "Vừa xong"}
                    </span>

                    {/* chỉ chủ sở hữu mới thấy */}
                    {userLogin?.uid === item.userId && (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          title="Cập nhật bình luận"
                          aria-label="Cập nhật bình luận"
                          disabled={loading || editingCommentId === item.id}
                          onClick={() => {
                            setEditingCommentId(item.id);
                            setContent(item.content);
                            setShowInput(true);
                          }}
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1.5
          text-xs font-semibold text-primary transition-all duration-300
          hover:-translate-y-0.5 hover:bg-primary hover:text-white hover:shadow-md hover:shadow-primary/30
          active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
          disabled:hover:translate-y-0 disabled:hover:bg-primary/10 disabled:hover:text-primary disabled:hover:shadow-none"
                        >
                          <FaEdit className="transition-transform duration-300 group-hover/btn:-rotate-12 group-hover/btn:scale-110" />
                          <span className="hidden sm:inline">
                            {editingCommentId === item.id
                              ? "Đang sửa"
                              : "Cập nhật"}
                          </span>
                        </button>

                        <button
                          type="button"
                          title="Xóa bình luận"
                          aria-label="Xóa bình luận"
                          disabled={loading}
                          onClick={() => handleDeleteComment(item)}
                          className="group/btn inline-flex items-center gap-1.5 rounded-full bg-red-500/10 px-3 py-1.5
          text-xs font-semibold text-red-500 transition-all duration-300
          hover:-translate-y-0.5 hover:bg-red-500 hover:text-white hover:shadow-md hover:shadow-red-500/30
          active:scale-95 disabled:cursor-not-allowed disabled:opacity-50
          disabled:hover:translate-y-0 disabled:hover:bg-red-500/10 disabled:hover:text-red-500 disabled:hover:shadow-none"
                        >
                          <FaTrash className="transition-transform duration-300 group-hover/btn:rotate-12 group-hover/btn:scale-110" />
                          <span className="hidden sm:inline">Xóa</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8">
              Chưa có bình luận nào!
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 mt-8 pt-6 border-t border-gray-300 dark:border-gray-700">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-2 text-base text-gray-600 dark:text-gray-300">
              <FaRegCommentDots className="text-primary" />
              Chia sẻ cảm nhận của bạn về ShopTamLinh
            </p>

            {/* Chỉ hiện nút Thêm bình luận khi form đang đóng */}
            {!showInput &&
              (userLogin ? (
                <Button
                  onClick={() => {
                    setEditingCommentId(null);
                    setContent("");
                    setShowInput(true);
                  }}
                  className="!py-2.5"
                >
                  Thêm bình luận
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/login")}
                  className="!py-2.5 w-60"
                >
                  Đăng nhập để bình luận
                </Button>
              ))}
          </div>

          {/* Form dùng chung cho thêm và cập nhật */}
          {showInput && userLogin && (
            <div className="flex flex-col gap-3 animate-fade-in">
              <textarea
                ref={textareaRef}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                onKeyDown={(e) => e.key === "Escape" && setShowEmoji(false)}
                placeholder={
                  editingCommentId
                    ? "Cập nhật nội dung bình luận..."
                    : "Chia sẻ cảm nhận của bạn..."
                }
                rows={4}
                className="w-full resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 p-4 text-sm text-gray-800 dark:text-gray-200 outline-none focus:border-primary transition-colors"
              />

              {/* bảng emoji: mở ra ngay dưới ô nhập */}
              <div
                className={`grid transition-all duration-500 ease-out ${
                  showEmoji
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0 pointer-events-none"
                }`}
              >
                <div className="overflow-hidden">
                  {showEmoji && (
                    <Suspense
                      fallback={
                        <p className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                          Đang tải emoji...
                        </p>
                      }
                    >
                      <EmojiPicker
                        onEmojiClick={(data) => insertEmoji(data.emoji)}
                        theme={
                          document.documentElement.classList.contains("dark")
                            ? "dark"
                            : "light"
                        }
                        width="100%"
                        height={340}
                        lazyLoadEmojis
                        skinTonesDisabled
                        searchPlaceholder="Tìm emoji..."
                        previewConfig={{ showPreview: false }}
                        categories={[
                          { category: "suggested", name: "Hay dùng" },
                          {
                            category: "smileys_people",
                            name: "Mặt cười & Con người",
                          },
                          {
                            category: "animals_nature",
                            name: "Động vật & Thiên nhiên",
                          },
                          { category: "food_drink", name: "Đồ ăn & Thức uống" },
                          {
                            category: "travel_places",
                            name: "Du lịch & Địa điểm",
                          },
                          { category: "activities", name: "Hoạt động" },
                          { category: "objects", name: "Đồ vật" },
                          { category: "symbols", name: "Biểu tượng" },
                        ]}
                      />
                    </Suspense>
                  )}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                {/* thanh công cụ emoji */}
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => setShowEmoji((o) => !o)}
                    aria-label="Chọn emoji"
                    aria-expanded={showEmoji}
                    title="Chọn emoji"
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-lg transition-all duration-300
            hover:-translate-y-0.5 active:scale-90
            ${
              showEmoji
                ? "bg-primary text-white shadow-md shadow-primary/30"
                : "bg-primary/10 text-primary hover:bg-primary hover:text-white"
            }`}
                  >
                    <FaRegSmile />
                  </button>

                  <span className="mx-1 hidden h-5 w-px bg-gray-300 dark:bg-gray-600 sm:block" />

                  {QUICK_EMOJIS.map((emoji) => (
                    <button
                      key={emoji}
                      type="button"
                      onClick={() => insertEmoji(emoji)}
                      className="flex h-9 w-9 items-center justify-center rounded-full text-lg
              transition-all duration-200 hover:-translate-y-1 hover:scale-125 hover:bg-primary/10 active:scale-90"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>

                <div className="flex justify-end gap-2">
                  <Button
                    disabled={loading}
                    onClick={() => {
                      setEditingCommentId(null);
                      setContent("");
                      setShowInput(false);
                    }}
                    className="!py-2.5"
                  >
                    Hủy
                  </Button>

                  <Button
                    onClick={
                      editingCommentId
                        ? handleUpdateComment
                        : handleCreateComment
                    }
                    disabled={loading}
                    className="!py-2.5"
                  >
                    {loading
                      ? editingCommentId
                        ? "Đang cập nhật..."
                        : "Đang gửi..."
                      : editingCommentId
                        ? "Cập nhật bình luận"
                        : "Gửi bình luận"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Xác nhận xóa bình luận?"
        message={`Bạn có chắc chắn muốn xóa bình luận của ${
          selectedComment?.userName || "khách hàng"
        } không? Hành động này không thể hoàn tác.`}
        type="danger"
        confirmText="Xóa bình luận"
        cancelText="Hủy"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
        loading={loading}
      />
    </div>
  );
}

export default Comment;
