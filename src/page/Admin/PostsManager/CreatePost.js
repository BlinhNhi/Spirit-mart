import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { apiUploadImages } from '../../../utils/generalAPI/apiCloudinary';
import { FaRegTrashAlt } from 'react-icons/fa';
import LoadingImage from '../../../Component/LoadingImage/LoadingImage';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreatePost = () => {
    const navigate = useNavigate();
    const [imagePreview, setImagePreview] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            title: '',
            content: '',
            imagePost: ''
        },
        onSubmit: async (values) => {
            if (!values.title.trim() || !values.content.trim()) {
                return notification.error({
                    message: 'Thiếu thông tin',
                    description: 'Vui lòng nhập đầy đủ tiêu đề và nội dung!',
                });
            }

            try {
                const postRef = collection(fireDB, 'posts');
                await addDoc(postRef, {
                    title: values.title,
                    content: values.content,
                    imagePost: values.imagePost,
                    createdAt: new Date().toISOString(),
                });
                notification.success({
                    message: 'Thành công',
                    description: 'Đăng bài viết thành công!',
                });
                navigate('/admin/post-mng');
            } catch (err) {
                console.error(err);
                notification.error({
                    message: 'Lỗi',
                    description: 'Không thể đăng bài viết!',
                });
            }
        }
    });

    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        formik.setFieldValue('content', data);
    };

    const handleFileUpload = async (e) => {
        e.stopPropagation();
        setIsLoading(true);

        const file = e.target.files[0];
        if (!file) {
            setIsLoading(false);
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

        setIsLoading(false);
    };

    const handleDeleteImage = () => {
        setImagePreview([]);
        formik.setFieldValue('imagePost', '');
    };

    // Fix ResizeObserver warning (do CKEditor)
    useEffect(() => {
        function hideError(e) {
            if (e.message === 'ResizeObserver loop completed with undelivered notifications.') {
                document.getElementById('webpack-dev-server-client-overlay')?.setAttribute('style', 'display: none');
            }
        }

        window.addEventListener('error', hideError);
        return () => window.removeEventListener('error', hideError);
    }, []);

    return (
        <Form
            onSubmitCapture={formik.handleSubmit}
            labelCol={{ span: 6 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
        >
            <h2 className="text-lg font-semibold mb-4 dark:text-white">Tạo Bài Viết Mới</h2>

            <Form.Item label="Tiêu đề" name="title" required>
                <Input name="title" onChange={formik.handleChange} value={formik.values.title} />
            </Form.Item>

            <Form.Item label="Nội dung" name="content">
                <CKEditor
                    editor={ClassicEditor}
                    onChange={handleContentChange}
                    config={{ placeholder: "Nhập nội dung bài viết..." }}
                    onReady={(editor) => {
                        editor.editing.view.change(writer => {
                            writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                        });
                    }}
                />
            </Form.Item>

            <Form.Item label="Ảnh Tiêu Đề">
                <input type="file" accept="image/*" onChange={handleFileUpload} />
                {isLoading && <LoadingImage />}
                {imagePreview.length > 0 && (
                    <div className="mt-2">
                        <img src={imagePreview[0]} alt="preview" className='w-[300px] h-[200px] rounded-md px-2' />
                        <Button
                            type="link"
                            danger
                            icon={<FaRegTrashAlt />}
                            onClick={handleDeleteImage}
                        >
                            Xoá ảnh
                        </Button>
                    </div>
                )}
            </Form.Item>

            <Form.Item label="Hành động">
                <Button htmlType="submit" type="primary">
                    Tạo Bài Viết
                </Button>
            </Form.Item>
        </Form>
    );
};

export default CreatePost;
