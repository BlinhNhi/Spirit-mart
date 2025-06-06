import React, { useContext, useEffect, useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useFormik } from 'formik';
import myContext from '../../../Context/MyContext';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../../../Component/Loader/Loader';


const UpdateCategory = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { loading, setLoading, getAllCategoriesFunction } = context;
    // product state
    const [category, setCategory] = useState({
        name: "",
        namelink: "",

    });

    const getSingleCategoryFunction = async () => {
        setLoading(true);
        try {
            const categoryTemp = await getDoc(doc(fireDB, "category", id))
            const category = categoryTemp.data();
            setCategory({
                name: category?.name,
                namelink: category?.namelink,

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
            name: category?.name,
            namelink: category?.namelink,
        },
        onSubmit: async (values) => {
            if (!values.name.trim() || values.name.startsWith(" ")) {
                notification.error({
                    message: "Lỗi!",
                    description: "Vui lòng điền đầy đủ các ô. Và không để khoảng trắng!",
                });
                return;
            }

            try {
                setLoading(true);
                await setDoc(doc(fireDB, "category", id), values, { merge: true });
                notification.success({
                    message: "Thành Công",
                    description: "Cập nhật Danh Mục thành công!",
                });

                getAllCategoriesFunction();
                navigate("/admin/category-mng");
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


    useEffect(() => {
        getSingleCategoryFunction();
    }, []);

    if (loading || !category.name) {
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
            <h3 className="text-2xl">Cập Nhật Danh Mục:</h3>
            <div className='row'>
                <div className='col-12'>
                    <Form.Item
                        label="Tên Danh Mục"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập tên danh mục!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Item>

                    <Form.Item
                        label="Đường Dẫn Của Danh Mục"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Name Link is required!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="namelink" onChange={formik.handleChange} value={formik.values.namelink} />
                    </Form.Item>
                    <Form.Item label="Action">
                        <Button htmlType="submit">Cập nhật danh mục</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateCategory;