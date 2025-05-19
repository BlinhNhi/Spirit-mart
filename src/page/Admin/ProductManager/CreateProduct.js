import React, { useContext, useState } from 'react';
import { Form, Input, Button, notification, Select } from 'antd';

import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import { fireDB } from '../../../Firebase/FirebaseConfig';
import { addDoc, collection } from 'firebase/firestore';
import { apiUploadImages } from '../../../utils/generalAPI/apiCloudinary';
import { FaCamera, FaRegTrashAlt } from 'react-icons/fa';
import LoadingImage from '../../../Component/LoadingImage/LoadingImage';
import myContext from '../../../Context/MyContext';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

const CreateProduct = () => {
    const navigate = useNavigate();
    const [loading, setIsLoading] = useState(false);
    const [imagePreview, setImagePreview] = useState([]);
    const { getAllCategories } = useContext(myContext);

    const handleSubmitProduct = async (values) => {
        if (values?.name?.trim() === "" || values?.rate?.trim() === ""
            || values?.price?.trim() === "" || values?.quantity?.trim() === ""
        ) {
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Vui lòng điền đầy đủ thông tin và không để trống đầu câu!</>
                ),
            });
        }
        try {
            const categoryRef = collection(fireDB, 'products');
            console.log(values.imagesProduct);
            await addDoc(categoryRef, {
                name: values.name,
                rate: values.rate,
                description: values.description,
                price: values.price,
                quantity: values.quantity,
                category: values.category,
                imagesProduct: values.imagesProduct,
            });
            notification.success({
                closeIcon: true,
                message: 'Thành Công',
                description: (
                    <>Thêm Sản Phẩm Thành Công!</>
                ),
            });
            navigate('/admin/product-mng')
        } catch (error) {
            console.log(error);
            notification.error({
                closeIcon: true,
                message: 'Lỗi',
                description: (
                    <>Thêm Sản Phẩm Không Thành Công!</>
                ),
            });
        }

    }
    const formik = useFormik({
        initialValues: {
            name: '',
            rate: '',
            description: '',
            price: '',
            imagesProduct: "[]",
            quantity: '',
            category: ''
        },
        onSubmit: handleSubmitProduct
    })

    const handleChangeCategory = (value) => {
        console.log(value);
        formik.setFieldValue("category", value);
    };

    const handleFiles = async (e) => {
        e.stopPropagation();
        setIsLoading(true);
        let images = [];
        const files = e.target.files;

        const formData = new FormData();
        for (let i of files) {
            formData.append("file", i);
            formData.append(
                "upload_preset",
                "jzdubdw6"
            );
            const response = await apiUploadImages(formData);
            if (response.status === 200)
                images = [...images, response.data?.secure_url];
        }
        setIsLoading(false);
        setImagePreview((pre) => [...pre, ...images]);

        let imageCurrent = formik?.values?.imagesProduct;
        console.log(imageCurrent);
        if (imageCurrent === "") {
            formik?.setFieldValue("imagesProduct", JSON.stringify([...formik?.values?.imagesProduct, ...images]));
        }
        else {
            formik?.setFieldValue("imagesProduct", JSON.stringify([...JSON.parse(formik?.values?.imagesProduct), ...images]));
        }

    };

    const handleDeleteImage = (image) => {
        let a = formik?.values?.imagesProduct
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        formik.setFieldValue("imagesProduct", JSON.stringify(JSON.parse((a))?.filter((item) => item !== image)));
    };


    const handleChangeContent = (e, editor) => {
        const data = editor.getData();
        formik.setFieldValue("description", data);
    };
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
                                message: 'Bắt Buộc Nhập Tên Sản Phẩm!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        className=''
                        label="Đánh Giá"
                        name="rate"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Đánh Giá!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="rate" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        className="w-5/6 md:w-full lg:w-full xl:w-full 2xl:w-full"
                    >
                        <h2 className="font-bold text-xl text-gray-700 dark:text-gray-200 uppercase">
                            Mô Tả  Sản Phẩm
                        </h2>
                        <p className="font-medium text-base text-gray-700 dark:text-gray-200 mb-2">
                            Mô tả  sản phẩm.
                        </p>

                        <CKEditor
                            config={{

                                placeholder: " Mô tả  sản phẩm."
                            }}
                            name="noteUser"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeContent(event, editor);
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
                    <Form.Item
                        className=''
                        label="Giá Tiền"
                        name="price"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Giá Sản Phẩm!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="price" onChange={formik.handleChange} />
                    </Form.Item>
                    <Form.Item
                        className=''
                        label="Số Lượng Sản Phẩm"
                        name="quantity"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Bắt Buộc Nhập Số Lượng Sản Phẩm!',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="quantity" onChange={formik.handleChange} />
                    </Form.Item>

                    <Form.Item
                        label="Danh Mục"
                        name="category"
                        style={{ minWidth: "100%" }}
                        rules={[
                            {
                                required: true,
                                message: "Vui Lòng Chọn Danh Mục",
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select
                            rules={[{ required: true }]}

                            options={
                                getAllCategories
                                    ? getAllCategories?.map((item, index) => ({
                                        key: index,
                                        label: item.name,
                                        value: item.name,
                                    }))
                                    : ""
                            }
                            onChange={handleChangeCategory}
                        />
                    </Form.Item>

                    {/* image */}
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
                                    onChange={handleFiles}
                                    type="file"
                                    id="file"
                                    hidden
                                    multiple
                                ></input>
                                <h3 className="font-medium py-2 text-base">Ảnh Đã Chọn</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 place-items-center gap-2">
                                    {imagePreview?.map((item) => {
                                        return (
                                            <div className="space-x-4 relative" key={item}>
                                                <img
                                                    key={item}
                                                    alt="img-preview"
                                                    src={item}
                                                    className="w-80 h-54 object-contain bg-gray-200 dark:bg-orange-300 rounded-md"
                                                ></img>
                                                <span
                                                    title="Xoá"
                                                    className="top-1 text-sm bg-gray-500 hover:bg-slate-600 text-white rounded-[60%] cursor-pointer right-0 p-2 absolute "
                                                    onClick={() => handleDeleteImage(item)}
                                                >
                                                    <FaRegTrashAlt />
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    </Form.Item>
                    <Form.Item label="Tác Vụ">
                        {loading ? <p className='dark:text-gray-500 dark:bg-gray-100 text-base font-medium p-2 rounded-md w-32 text-center'>Vui lòng chờ</p> :
                            <Button
                                htmlType="submit"
                            > Thêm Sản Phẩm
                            </Button>}

                    </Form.Item>
                </div>
            </div>

        </Form>
    );
};

export default CreateProduct;