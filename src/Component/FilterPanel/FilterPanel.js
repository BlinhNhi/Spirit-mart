import React from "react";
import { Card, Radio } from "antd";

function FilterPanel({ sortType, onSortChange }) {
    return (
        <div className="w-7/8 lg:w-2/5 flex flex-row sm:flex-col md:px-10 lg:p-2 xl:w-1/5">
            <Card title="Lọc sản phẩm theo:">
                <Radio.Group onChange={onSortChange} value={sortType}>
                    <Radio value="">Trở về mặc định</Radio>
                    <Radio value="highest-price">Giá từ cao đến thấp</Radio>
                    <Radio value="low-price">Giá từ thấp đến cao</Radio>
                    <Radio value="highest-star">Sao từ cao đến thấp</Radio>
                    <Radio value="low-star">Sao từ thấp đến cao</Radio>
                </Radio.Group>
            </Card>
        </div>
    )
}
export default React.memo(FilterPanel);