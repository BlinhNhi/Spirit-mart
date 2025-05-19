import React, { useContext } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import myContext from '../../../Context/MyContext';


export default function ProductMng() {
    const { getAllCategories, deleteCategoryFunction } = useContext(myContext);

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


    const data = getAllCategories;

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
            width: '10%',
            sorter: (a, b) => a.id - b.id,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Danh Mục',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) => a.name - b.name,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Đường Dẫn Danh Mục',
            dataIndex: 'namelink',
            key: 'namelink',
            width: '20%',
            ...getColumnSearchProps('namelink'),
            sorter: (a, b) => a.namelink - b.namelink,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Quản Lý',
            width: '15%',
            render: (text, cat) => {
                return <>
                    <Button key={1} href={`/admin/category-mng/edit/${cat.id}`} type="link" icon={<EditOutlined />}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn Muốn Xoá Danh Mục : ' + cat.name + '?')) {
                            deleteCategoryFunction(cat?.id)
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
