import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';
import { useFormik } from 'formik';

import myContext from '../../../Context/MyContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { apiUploadImages } from '../../../utils/generalAPI/apiCloudinary';
import { FaCamera, FaRegTrashAlt } from 'react-icons/fa';
import LoadingImage from '../../../Component/LoadingImage/LoadingImage';
import Loader from '../../../Component/Loader/Loader';


const UpdatePost = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { setLoading, getAllPostsFunction } = context;
    const [imagePreview, setImagePreview] = useState([]);
    const [loading, setIsLoading] = useState(false);

    // product state
    const [post, setPost] = useState({
        title: "",
        content: "",
    });

    const getSinglePostFunction = async () => {
        setLoading(true);
        try {
            const postsTemp = await getDoc(doc(fireDB, "posts", id))
            const posts = postsTemp.data();
            setPost({
                title: posts?.title,
                content: posts?.content || 'Không Có',
                imagePost: posts?.imagePost ? posts?.imagePost : null
            })
            setLoading(false);

        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }
    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: post?.title,
            content: post?.content || 'Không Có',
            imagePost: post?.imagePost
        },
        onSubmit: async (values) => {
            if (!values.title.trim() || values.title.startsWith(" ")) {
                notification.error({
                    message: "Lỗi!",
                    description: "Vui lòng điền đầy đủ các ô. Và không để khoảng trắng!",
                });
                return;
            }

            try {
                setLoading(true);
                await setDoc(doc(fireDB, "posts", id), values, { merge: true });
                notification.success({
                    message: "Thành Công",
                    description: "Cập nhật bài viết thành công!",
                });

                getAllPostsFunction();
                navigate("/admin/post-mng");
            } catch (error) {
                console.error(error);
                notification.error({
                    message: "Lỗi!",
                    description: "Cập nhật thất bại!",
                });
            } finally {
                setLoading(false);
            }
        },
    });
    const handleChangeInput = (e, editor, content) => {
        const data = editor.getData();
        formik.setFieldValue(content, data);
    };



    // Xử lý hình ảnh
    useEffect(() => {
        if (!post?.imagePost) {
            setImagePreview([]);
            return;
        }

        try {
            const parsedImages = JSON.parse(post.imagePost);
            if (Array.isArray(parsedImages)) {
                setImagePreview(parsedImages);
            } else {
                setImagePreview([post.imagePost]);
            }
        } catch (e) {
            setImagePreview([post.imagePost]);
        }
    }, [post?.imagePost])

    const handleFileUpload = async (e) => {
        e.stopPropagation();
        // setIsLoading(true);
        const file = e.target.files[0];
        if (!file) {
            // setIsLoading(false);
            return;
        }
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'jzdubdw6');

        try {
            const response = await apiUploadImages(formData);
            if (response.status === 200) {
                const imageUrl = response.data.secure_url;
                setImagePreview([imageUrl]);
                formik.setFieldValue('imagePost', imageUrl);
            }
        } catch (err) {
            console.error(err);
            notification.error({
                message: 'Upload ảnh thất bại',
                description: 'Không thể tải ảnh lên Cloudinary!',
            });
        }

        // setIsLoading(false);
    };

    const handleDeleteImage = () => {
        setImagePreview([]);
        formik.setFieldValue('imagePost', '');
    };

    useEffect(() => {
        getSinglePostFunction();
    }, []);

    if (loading || !post.title) {
        return <Loader />;
    }

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{
                span: 6,
            }}
            wrapperCol={{
                span: 14,
            }}
            layout="horizontal"
        >
            <h3 className="text-2xl">Cập nhật bài viết:</h3>
            <div className='row'>
                <div className='col-12'>

                    <Form.Item
                        label="Tiêu Đề Bài Viết"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tiêu đề bài viết không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
                    </Form.Item>


                    <Form.Item
                        label="Nội dung bài biết"
                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik?.values?.content}
                            name="content"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'content')
                            }}
                            onReady={(editor) => {
                                editor.editing.view.change((writer) => {
                                    writer.setStyle(
                                        "height",
                                        "200px",
                                        editor.editing.view.document.getRoot()
                                    );
                                });
                            }}
                        ></CKEditor>
                    </Form.Item>

                    <Form.Item label="Image">
                        <div className="w-full mb-6">
                            {/* <h2 className="font-semibold text-xl py-2">Hình Ảnh</h2> */}
                            <p className="italic mt-1">
                                Cập Nhật Hình Ảnh Rõ Ràng
                            </p>
                            <div className="w-full md:w-[100%] sm:w-[100%] lg:w-[100%] 2xl:w-[70%] xl:w-[70%]">
                                <label
                                    className="w-full border-2  border-orange-400 hover:border-orange-500 text-3xl  text-gray-300 cursor-pointer
                                    flex-col gap-6  my-4 items-center justify-center h-[150px] flex rounded-md bg-gray-50 hover:bg-gray-100 
                                    dark:border-gray-50 dark:hover:border-gray-100 dark:bg-orange-100 dark:hover:bg-orange-200 dark:border-4
                                    "
                                    htmlFor="file"
                                >
                                    {loading ? (
                                        <LoadingImage></LoadingImage>
                                    ) : (
                                        <span className="flex flex-col items-center dark:text-primary  justify-center gap-2">
                                            <FaCamera></FaCamera>
                                            <div className="text-gray-500 font-medium dark:text-primary text-base">Thêm Ảnh</div>
                                        </span>
                                    )}
                                </label>
                                <input
                                    onChange={handleFileUpload}
                                    type="file"
                                    id="file"
                                    hidden
                                    multiple
                                ></input>
                                <h3 className="font-medium py-2 text-base">Ảnh Đã Chọn</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-items-center gap-2">
                                    <div className="space-x-4 relative" key={imagePreview}>
                                        <img
                                            key={imagePreview}
                                            alt="img-preview"
                                            src={imagePreview}
                                            className="w-80 h-54 object-contain bg-gray-200 dark:bg-orange-300 rounded-md"
                                        ></img>
                                        <span
                                            title="Xoá"
                                            className="top-1 text-sm bg-gray-500 hover:bg-slate-600 text-white rounded-[60%] cursor-pointer right-0 p-2 absolute "
                                            onClick={() => handleDeleteImage(imagePreview)}
                                        >
                                            <FaRegTrashAlt />
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </Form.Item>

                    <Form.Item label="Action">
                        <Button htmlType="submit">Cập Nhật Bài Viết</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdatePost;