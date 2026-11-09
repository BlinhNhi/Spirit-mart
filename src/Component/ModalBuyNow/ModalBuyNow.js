import { Modal, Select, Input } from "antd";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    FaTruck,
    FaUser,
    FaPhoneAlt,
    FaMapMarkerAlt,
    FaHome,
    FaRegStickyNote,
    FaCheckCircle,
} from "react-icons/fa";
import Button from "../Button";

import {
    getProvincesAction,
    getDistrictsAction,
    getWardsAction,
    clearDistricts,
    clearWards,
} from "../../redux/actions/locationAction";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

// ---- style dùng chung (light + dark mode theo rule của bạn) ----
const modalCls =
    "[&_.ant-modal-content]:!p-0 [&_.ant-modal-content]:!overflow-hidden [&_.ant-modal-content]:!rounded-2xl " +
    "[&_.ant-modal-content]:!bg-gray-100 dark:[&_.ant-modal-content]:!bg-gray-900 " +
    "[&_.ant-modal-content]:!border [&_.ant-modal-content]:!border-primary/20 dark:[&_.ant-modal-content]:!border-orange-400/20 " +
    "[&_.ant-modal-content]:!shadow-2xl [&_.ant-modal-content]:!shadow-primary/20 " +
    "[&_.ant-modal-close]:!top-4 [&_.ant-modal-close]:!right-4 hover:[&_.ant-modal-close]:!bg-primary/20 dark:[&_.ant-modal-close]:!text-gray-300";

const inputCls =
    "!rounded-xl !border-gray-300 !bg-white hover:!border-primary focus-within:!border-primary " +
    "dark:!border-gray-700 dark:!bg-gray-800 [&_input]:!bg-transparent " +
    "dark:[&_input]:!text-gray-100 dark:[&_input::placeholder]:!text-gray-400";

const selectCls =
    "w-full [&_.ant-select-selector]:!rounded-xl [&_.ant-select-selector]:!border-gray-300 [&_.ant-select-selector]:!bg-white " +
    "hover:[&_.ant-select-selector]:!border-primary " +
    "dark:[&_.ant-select-selector]:!border-gray-700 dark:[&_.ant-select-selector]:!bg-gray-800 " +
    "dark:[&_.ant-select-selection-item]:!text-gray-100 dark:[&_.ant-select-selection-search-input]:!text-gray-100 " +
    "dark:[&_.ant-select-selection-placeholder]:!text-gray-400 dark:[&_.ant-select-arrow]:!text-gray-400 " +
    "[&.ant-select-disabled]:!opacity-60";

const popupCls =
    "!rounded-xl dark:!bg-gray-800 dark:[&_.ant-select-item]:!text-gray-100 " +
    "[&_.ant-select-item-option-active]:!bg-primary/10 dark:[&_.ant-select-item-option-active]:!bg-gray-700 " +
    "[&_.ant-select-item-option-selected]:!bg-primary/20 dark:[&_.ant-select-item-option-selected]:!bg-primary/30";

const editorCls =
    "overflow-hidden rounded-xl border border-gray-300 dark:border-gray-700 " +
    "[&_.ck-toolbar]:!border-0 [&_.ck-toolbar]:!border-b [&_.ck-toolbar]:!border-gray-200 " +
    "dark:[&_.ck-toolbar]:!border-gray-700 dark:[&_.ck-toolbar]:!bg-gray-800 " +
    "dark:[&_.ck-button]:!text-gray-200 dark:[&_.ck-button:hover]:!bg-gray-700 " +
    "[&_.ck-editor__editable]:!border-0 [&_.ck-editor__editable]:!shadow-none " +
    "dark:[&_.ck-editor__editable]:!bg-gray-800 dark:[&_.ck-editor__editable]:!text-gray-100";

const sectionTitleCls =
    "mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-300";
const stepCls =
    "flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-secondary text-xs font-bold text-white";

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
            <Button onClick={handleOpen} className="w-full !py-3 text-base">
                Mua Ngay
            </Button>

            <Modal
                open={open}
                onOk={handleOpen}
                onCancel={handleOpen}
                footer={null}
                centered
                width={580}
                className={modalCls}
                styles={{ mask: { backdropFilter: "blur(4px)" } }}
            >
                {/* ---------- đầu popup ---------- */}
                <div className="relative overflow-hidden">
                    <div className="h-1.5 w-full bg-gradient-to-r from-primary to-secondary" />
                    <div aria-hidden="true" className="pointer-events-none absolute -top-16 -right-16 h-44 w-44 rounded-full bg-primary/20 blur-3xl" />
                    <div className="relative flex items-center gap-4 px-6 pt-6 pb-2">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-xl text-white shadow-lg shadow-primary/30">
                            <FaTruck />
                        </span>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Thông tin giao hàng</h2>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Điền thông tin để ShopTamLinh giao hàng đến bạn</p>
                        </div>
                    </div>
                </div>

                {/* ---------- form ---------- */}
                <div className="max-h-[65vh] overflow-y-auto px-6 pb-2 pt-4">
                    <div className="mb-5 rounded-2xl border border-transparent bg-white p-4 shadow-sm dark:bg-gray-800/70">
                        <h3 className={sectionTitleCls}><span className={stepCls}>1</span>Người nhận</h3>
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Input
                                size="large"
                                name="name"
                                className={inputCls}
                                prefix={<FaUser className="text-primary" />}
                                value={addressInfo.name}
                                onChange={(e) => setAddressInfo({ ...addressInfo, name: e.target.value })}
                                placeholder="Vui lòng nhập tên của bạn"
                            />
                            <Input
                                size="large"
                                name="mobileNumber"
                                className={inputCls}
                                prefix={<FaPhoneAlt className="text-primary" />}
                                value={addressInfo.mobileNumber}
                                onChange={(e) => setAddressInfo({ ...addressInfo, mobileNumber: e.target.value })}
                                placeholder="Vui lòng nhập số điện thoại"
                            />
                        </div>
                    </div>

                    <div className="mb-5 rounded-2xl border border-transparent bg-white p-4 shadow-sm dark:bg-gray-800/70">
                        <h3 className={sectionTitleCls}><span className={stepCls}>2</span>Địa chỉ giao hàng</h3>
                        <div className="mb-3">
                            <Select
                                size="large"
                                showSearch
                                placeholder="Chọn Tỉnh/Thành phố"
                                optionFilterProp="children"
                                onChange={handleProvinceChange}
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().includes(input.toLowerCase())
                                }
                                className={selectCls}
                                popupClassName={popupCls}
                                value={provinces.find(p => p.name === addressInfo.province)?.id || undefined}
                            >
                                {provinces.map(province => (
                                    <Select.Option key={province.id} value={province.id}>
                                        {province.name}
                                    </Select.Option>
                                ))}
                            </Select>
                        </div>
                        <div className="mb-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                            <Select
                                size="large"
                                showSearch
                                placeholder="Chọn Quận/Huyện"
                                optionFilterProp="children"
                                onChange={handleDistrictChange}
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().includes(input.toLowerCase())
                                }
                                className={selectCls}
                                popupClassName={popupCls}
                                disabled={!districts.length}
                                value={districts.find(d => d.name === addressInfo.district)?.id || undefined}
                            >
                                {districts.map(district => (
                                    <Select.Option key={district.id} value={district.id}>
                                        {district.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            <Select
                                size="large"
                                showSearch
                                placeholder="Chọn Phường/Xã"
                                optionFilterProp="children"
                                onChange={handleWardChange}
                                filterOption={(input, option) =>
                                    option?.children?.toLowerCase().includes(input.toLowerCase())
                                }
                                className={selectCls}
                                popupClassName={popupCls}
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
                        <Input
                            size="large"
                            name="address"
                            className={inputCls}
                            prefix={<FaHome className="text-primary" />}
                            value={addressInfo.address}
                            onChange={(e) => setAddressInfo({ ...addressInfo, address: e.target.value })}
                            placeholder="Vui lòng nhập địa chỉ"
                        />
                    </div>

                    <div className="mb-3 rounded-2xl border border-transparent bg-white p-4 shadow-sm dark:bg-gray-800/70">
                        <h3 className={sectionTitleCls}><span className={stepCls}>3</span>Ghi chú</h3>
                        <div className={editorCls}>
                            <CKEditor
                                editor={ClassicEditor}
                                data={addressInfo.note || ""}
                                onChange={handleContentChange}
                                config={{ placeholder: "Nhập ghi chú cho đơn hàng nếu cần..." }}
                                onReady={(editor) => {
                                    editor.editing.view.change(writer => {
                                        writer.setStyle('height', '160px', editor.editing.view.document.getRoot());
                                    });
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* ---------- chân popup ---------- */}
                <div className="border-t border-gray-200 px-6 py-4 dark:border-gray-700">
                    <p className="mb-3 flex items-center justify-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <FaCheckCircle className="text-green-500" />
                        Thanh toán sau khi nhận hàng
                    </p>
                    <div className="flex items-center gap-3">
                        <button
                            type="button"
                            onClick={handleOpen}
                            className="rounded-full border border-gray-300 px-6 py-2 text-base font-medium text-gray-600 duration-200 hover:border-primary hover:text-primary dark:border-gray-600 dark:text-gray-300 dark:hover:border-orange-400 dark:hover:text-orange-300"
                        >
                            Hủy
                        </button>
                        <div className="flex-1">
                            <Button
                                onClick={() => {
                                    handleOpen();
                                    buyNowFunction();
                                }}
                                className="w-full text-base"
                            >
                                Mua Ngay
                            </Button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BuyNowModal;