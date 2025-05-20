import React, { useContext } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import myContext from '../../../Context/MyContext';
import NoImage from '../../../assest/no-image.jpeg'


export default function ProductMng() {
    const { getAllProducts, deleteProductFunction } = useContext(myContext);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const resetSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0] = '');
        setSearchedColumn(dataIndex);
    };
    console.log(getAllProducts);

    const data = getAllProducts;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8, }} onKeyDown={(e) => e.stopPropagation()} >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        className='bg-primary'
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>

                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text, index) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    key={index}
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });
    const columns = [
        {
            title: 'Mã Số',
            dataIndex: 'id',
            key: 'id',
            width: '5%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Danh Mục',
            dataIndex: 'category',
            key: 'category',
            width: '5%',
            ...getColumnSearchProps('category'),
            sorter: (a, b) => a.category - b.category,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Tên Sản Phẩm',
            dataIndex: 'name',
            key: 'name',
            width: '10%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Giá Tiền',
            dataIndex: 'price',
            key: 'price',
            width: '10%',
            ...getColumnSearchProps('price'),
            sorter: (a, b) => a.price - b.price,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Số Lượng',
            dataIndex: 'quantity',
            key: 'quantity',
            width: '10%',
            ...getColumnSearchProps('quantity'),
            sorter: (a, b) => a.quantity - b.quantity,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Đánh Giá',
            dataIndex: 'rate',
            key: 'rate',
            width: '10%',
            ...getColumnSearchProps('rate'),
            sorter: (a, b) => a.rate - b.rate,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Mô Tả Sản Phẩn',
            dataIndex: 'description',
            width: '20%',
            key: 'description',
            ...getColumnSearchProps('description'),
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: "Hình Ảnh",
            dataIndex: "avatar",
            width: '15%',
            key: "avatar",
            render: (text, data, index) => {
                const images = JSON.parse(data?.imagesProduct);
                console.log(images);
                return data?.imagesProduct != null && images?.length > 0 ? (
                    <div className='flex flex-col  items-center gap-1'>
                        <img

                            className=' w-[50px] object-contain  rounded-lg border-solid border-gray-300 flex items-center h-[50px]'
                            src={images[0]}
                            alt="..." />
                        <p className='text-xl font-semibold '>... </p>

                    </div>
                ) : <div className='flex flex-col items-center'><img key={index} src={NoImage} alt='no-image' className='w-[50px] h-[50px] object-cover border-2 rounded-lg' /></div>
            },
        },
        {
            title: 'Quản Lý',
            width: '15%',
            render: (text, pro) => {
                return <>
                    <Button key={1} href={`/admin/product-mng/edit/${pro.id}`} type="link" icon={<EditOutlined />}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn Muốn Xoá Danh Mục : ' + pro.name + '?')) {
                            deleteProductFunction(pro?.id)
                        }
                    }
                    }></Button>
                </>

            }
        },
    ]
    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className='d-flex mb-4'>
                <h3 className='text-lg font-bold'>Quản Lý </h3>
                <Button href='/admin/product-mng/addproduct' type="primary" className='ml-3 mt-3 small bg-blue-600'>+ Thêm Sản Phẩm</Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey={'id'} scroll={{ x: 1000 }} />
        </div>
    )

}
