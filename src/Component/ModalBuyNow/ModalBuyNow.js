import { Button, Modal, Select, Input } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    getProvincesAction,
    getDistrictsAction,
    getWardsAction,
    clearDistricts,
    clearWards,
} from "../../redux/actions/locationAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

const BuyNowModal = ({ addressInfo, setAddressInfo, buyNowFunction }) => {
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch();

    const {
        arrProvinces: provinces,
        arrDistricts: districts,
        arrWards: wards
    } = useSelector((state) => state.locationReducer);
    const handleOpen = () => setOpen(!open);

    useEffect(() => {
        dispatch(getProvincesAction());
    }, [dispatch]);

    const handleProvinceChange = (provinceId) => {
        console.log("Selected provinceId:", provinceId);
        const selectedProvince = provinces.find(p => p.id === provinceId);
        setAddressInfo({
            ...addressInfo,
            province: selectedProvince?.name || "",
            district: "",
            ward: ""
        });
        dispatch(clearDistricts());
        dispatch(getDistrictsAction(provinceId));
    };

    const handleDistrictChange = (districtId) => {
        console.log("Districts after load:", districts);
        const selectedDistrict = districts.find(d => d.id === districtId);
        setAddressInfo({
            ...addressInfo,
            district: selectedDistrict?.name || "",
            ward: ""
        });

        dispatch(clearWards());
        dispatch(getWardsAction(districtId));
    };

    const handleWardChange = (wardId) => {
        const selectedWard = wards.find(w => w.id === wardId);
        setAddressInfo({
            ...addressInfo,
            ward: selectedWard?.name || ""
        });
    };
    const handleContentChange = (event, editor) => {
        const data = editor.getData();
        console.log(data);
        setAddressInfo(prev => ({
            ...prev,
            note: data || ""
        }));
    };
    return (
        <div className="w-full">
            <Button
                block
                type="button"
                onClick={handleOpen}
                className="px-4 py-3 text-center text-gray-100 bg-orange-400 border border-transparent hover:border-orange-500 hover:text-orange-500 hover:bg-orange-100 rounded-xl"
            >
                Mua Ngay
            </Button>

            <Modal
                title="Thông tin giao hàng:"
                open={open}
                onOk={handleOpen}
                onCancel={handleOpen}
                footer={null}
            >
                <div className="w-11/12">
                    <div className="mb-3">
                        <Input
                            name="name"
                            value={addressInfo.name}
                            onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                            placeholder="Vui lòng nhập tên của bạn"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            name="address"
                            value={addressInfo.address}
                            onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                            placeholder="Vui lòng nhập địa chỉ"
                        />
                    </div>
                    <div className="mb-3">
                        <Input
                            name="mobileNumber"
                            value={addressInfo.mobileNumber}
                            onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                            placeholder="Vui lòng nhập số điện thoại"
                        />
                    </div>
                    <div className="mb-3">
                        <Select
                            showSearch
                            placeholder="Chọn Tỉnh/Thành phố"
                            optionFilterProp="children"
                            onChange={handleProvinceChange}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase())
                            }
                            className="w-full"
                            value={provinces.find(p => p.name === addressInfo.province)?.id || undefined}
                        >
                            {provinces.map(province => (
                                <Select.Option key={province.id} value={province.id}>
                                    {province.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-3">
                        <Select
                            showSearch
                            placeholder="Chọn Quận/Huyện"
                            optionFilterProp="children"
                            onChange={handleDistrictChange}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase())
                            }
                            className="w-full"
                            disabled={!districts.length}
                            value={districts.find(d => d.name === addressInfo.district)?.id || undefined}
                        >
                            {districts.map(district => (
                                <Select.Option key={district.id} value={district.id}>
                                    {district.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-3">
                        <Select
                            showSearch
                            placeholder="Chọn Phường/Xã"
                            optionFilterProp="children"
                            onChange={handleWardChange}
                            filterOption={(input, option) =>
                                option?.children?.toLowerCase().includes(input.toLowerCase())
                            }
                            className="w-full"
                            disabled={!wards.length}
                            value={wards.find(w => w.name === addressInfo.ward)?.id || undefined}
                        >
                            {wards.map(ward => (
                                <Select.Option key={ward.id} value={ward.id}>
                                    {ward.name}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div className="mb-3">
                        <CKEditor
                            editor={ClassicEditor}
                            data={addressInfo.note || ""}
                            onChange={handleContentChange}
                            config={{ placeholder: "Nhập ghi chú cho đơn hàng nếu cần..." }}
                            onReady={(editor) => {
                                editor.editing.view.change(writer => {
                                    writer.setStyle('height', '200px', editor.editing.view.document.getRoot());
                                });
                            }}
                        />
                    </div>
                    <div className="">
                        <Button
                            type="button"
                            onClick={() => {
                                handleOpen();
                                buyNowFunction();
                            }}
                            className="w-full px-4 py-3 text-center text-gray-100 bg-orange-600 border border-transparent rounded-lg"
                        >
                            Mua Ngay.
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BuyNowModal;
