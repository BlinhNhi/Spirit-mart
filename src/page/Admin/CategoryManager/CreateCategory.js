
import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { addDoc, collection } from 'firebase/firestore';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import RightModal from '../../../Component/Modal/ModalRight';
import ButtonCustom from '../../../Component/Button';


const CreateCategory = ({ open, onClose, onCreated }) => {
    const handleSubmitCategory = async (values) => {
        const name = values.name.trim();
        const namelink = values.namelink.trim();

        if (!name || !namelink) {
            notification.error({
                message: 'Lỗi',
                description: 'Vui lòng điền đầy đủ thông tin!',
            });
            return;
        }

        try {
            await addDoc(collection(fireDB, 'category'), {
                name,
                namelink,
            });

            notification.success({
                message: 'Thành Công',
                description: 'Thêm danh mục thành công!',
            });

            formik.resetForm();
            onClose();
            onCreated?.();
        } catch (error) {
            console.log(error);

            notification.error({
                message: 'Lỗi',
                description: 'Thêm danh mục không thành công!',
            });
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            namelink: '',
        },
        onSubmit: handleSubmitCategory,
    });

    return (
        <RightModal
            open={open}
            onClose={onClose}
            title="Tạo Danh Mục"
            description="Thêm danh mục mới cho sản phẩm"
            width={500}
            footer={
                <div className="flex items-center justify-end gap-3">
                    <ButtonCustom
                        onClick={onClose}
                       className="
    !h-10
    !bg-gray-200 !text-gray-700 w-1/3
    !border !border-gray-300
    hover:!bg-gray-300
    dark:!bg-gray-700
    dark:!text-gray-200
    dark:!border-gray-600
    dark:hover:!bg-gray-600
"
                    >
                        Hủy
                    </ButtonCustom>

                    <ButtonCustom
                        type="primary"
                        loading={formik.isSubmitting}
                        onClick={formik.handleSubmit}
                        className="
                           w-full
                        "
                    >
                        Thêm Danh Mục
                    </ButtonCustom>
                </div>
            }
        >
            <Form layout="vertical">
                <Form.Item
                    label={
                        <span className="text-sm font-medium dark:text-gray-200">
                            Tên Danh Mục
                        </span>
                    }
                >
                    <Input
    name="name"
    value={formik.values.name}
    onChange={formik.handleChange}
    placeholder="Nhập tên danh mục..."
    className="
        !h-11 !rounded-lg
        dark:!border-gray-600
        dark:!bg-gray-700
        dark:!text-gray-100
        dark:!placeholder-gray-400
    "
/>
                </Form.Item>

                <Form.Item
                    label={
                        <span className="text-sm font-medium dark:text-gray-200">
                            Đường Dẫn Của Danh Mục
                        </span>
                    }
                >
                   <Input
    name="namelink"
    value={formik.values.namelink}
    onChange={formik.handleChange}
    placeholder="Ví dụ: dien-thoai"
    className="
        !h-11 !rounded-lg
        dark:!border-gray-600
        dark:!bg-gray-700
        dark:!text-gray-100
        dark:!placeholder-gray-400
    "
/>
                </Form.Item>

                <div className="
                    rounded-lg border border-gray-200
                    bg-gray-50 p-4
                    dark:border-gray-700 dark:bg-gray-700/40
                ">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Lưu ý
                    </p>

                    <p className="mt-1 text-sm leading-6 text-gray-500 dark:text-gray-400">
                        Đường dẫn nên viết thường, không dấu và sử dụng dấu gạch ngang.
                    </p>
                </div>
            </Form>
        </RightModal>
);

};

export default CreateCategory;
