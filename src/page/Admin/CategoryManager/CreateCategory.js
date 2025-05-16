import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';

const CreateCategory = () => {
    const navigate = useNavigate();

    const handleSubmitCategory = async (values) => {
        console.log('Category Name: ', values?.name, 'Link Name', values?.namelink);
        if (values?.name?.trim() === "" || values?.linkname?.trim() === "") {
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và không để trống đầu câu!</>
                ),
            });
        }
        // setLoading(true);
        try {
            const categoryRef = collection(fireDB, 'category');
            await addDoc(categoryRef, {
                name: values.name,
                namelink: values.namelink
            });
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Thêm Danh Mục Thành Công!</>
                ),
            });
            navigate('/admin/category-mng')
            // setLoading(false)
        } catch (error) {
            console.log(error);
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Thêm Danh Mục Không Thành Công!</>
                ),
            });
        }

    }
    const formik = useFormik({
        initialValues: {
            name: '',
            namelink: ''
        },
        onSubmit: handleSubmitCategory
    })


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
            <h3 className="text-lg lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-2xl font-normal mb-4 dark:text-gray-200">Tạo Danh Mục Cho Sản Phẩm</h3>
            <div className='row'>
                <div className='col-8 dark:text-white'>
                    <Form.Item
                        className=''
                        label="Tên Danh Mục"
                        name="name"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Tên Danh Mục!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        className=''
                        label="Đường Dẫn Của Danh Mục"
                        name="namelink"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Đường Dẫn Của Danh Mục!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="namelink" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        <Button htmlType="submit" >Thêm Danh Mục </Button>
                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateCategory;