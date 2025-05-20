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


const UpdateProduct = () => {
    let { id } = useParams();
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllCategories, setLoading, getAllProductsFunction } = context;
    const [imagePreview, setImagePreview] = useState([]);
    const [loading, setIsLoading] = useState(false);

    // product state
    const [product, setProduct] = useState({
        category: "",
        name: "",
        price: "",
        quantity: "",
        rate: "",
        description: "",
    });

    const getSingleProductFunction = async () => {
        setLoading(true);
        try {
            const productTemp = await getDoc(doc(fireDB, "products", id))
            const product = productTemp.data();
            setProduct({
                category: product?.category,
                name: product?.name,
                price: product?.price,
                quantity: product?.quantity,
                rate: product?.rate,
                description: product?.description || 'Không Có',
                imagesProduct: product?.imagesProduct ? product?.imagesProduct : null
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
            category: product?.category,
            name: product?.name,
            price: product?.price,
            quantity: product?.quantity,
            rate: product?.rate,
            description: product?.description || 'Không Có',
            imagesProduct: product?.imagesProduct
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
                await setDoc(doc(fireDB, "products", id), values, { merge: true });
                notification.success({
                    message: "Thành Công",
                    description: "Cập nhật sản phẩm thành công!",
                });

                getAllProductsFunction();
                navigate("/admin/product-mng");
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
    const handleChangeInput = (e, editor, name) => {
        const data = editor.getData();
        formik.setFieldValue(name, data);
    };

    const handleChangeCategory = (value) => {
        formik.setFieldValue("category", value);
    };

    // Xử lý hình ảnh
    useEffect(() => {
        const images = product?.imagesProduct ? JSON.parse(product?.imagesProduct) : [];
        console.log(images);
        images && setImagePreview(images);
    }, [product?.imagesProduct])

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

        if (formik?.values?.imagesProduct !== null) {
            formik.setFieldValue("imagesProduct", JSON.stringify([...JSON.parse(formik?.values?.imagesProduct), ...images]));
        }
        else {
            formik.setFieldValue("imagesProduct", JSON.stringify([...images]));
        }
    };

    const handleDeleteImage = (image) => {
        // 20:14/64
        let a = formik?.values?.imagesProduct
        setImagePreview((pre) => pre?.filter((item) => item !== image));
        formik.setFieldValue("imagesProduct", JSON.stringify(JSON.parse((a))?.filter((item) => item !== image)));
    };
    //  lấy productdetail
    useEffect(() => {
        getSingleProductFunction();
    }, []);

    if (loading || !product.name) {
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
            <h3 className="text-2xl">Cập nhật sản phẩm:</h3>
            <div className='row'>
                <div className='col-12'>
                    <Form.Item
                        label="Danh Mục"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Danh Mục Không Được Để Trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Select value={formik.values.category} options={getAllCategories?.map((item, index) => ({ key: index, label: item.name, value: item.name }))} onChange={handleChangeCategory} />
                    </Form.Item>

                    <Form.Item
                        label="Tên Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Item>

                    <Form.Item
                        label="Giá tiền"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Giá tiền sản phẩm không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="price" onChange={formik.handleChange} value={formik.values.price} />
                    </Form.Item>

                    <Form.Item
                        label="Số Lượng Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Số lượng sản phẩm không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="quantity" onChange={formik.handleChange} value={formik.values.quantity} />
                    </Form.Item>

                    <Form.Item
                        label="Đánh Giá Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Đanh giá sản phẩm không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="rate" onChange={formik.handleChange} value={formik.values.rate} />
                    </Form.Item>

                    <Form.Item
                        label="Tên Sản Phẩm"
                        style={{ minWidth: '100%' }}
                        rules={[
                            {
                                required: true,
                                message: 'Tên sản phẩm không được để trống',
                                transform: (value) => value.trim(),
                            },
                        ]}
                    >
                        <Input name="name" onChange={formik.handleChange} value={formik.values.name} />
                    </Form.Item>
                    <Form.Item
                        label="Description"

                    >
                        <CKEditor
                            className="rounded-lg overflow-hidden"
                            data={formik?.values?.description}
                            name="description"
                            editor={ClassicEditor}
                            onChange={(event, editor) => {
                                handleChangeInput(event, editor, 'description')
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

                    <Form.Item label="Action">
                        <Button htmlType="submit">Cập nhật sản phẩm</Button>
                    </Form.Item>
                </div>
            </div>
        </Form>
    );
};

export default UpdateProduct;