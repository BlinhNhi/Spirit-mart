
import React, { useContext, useRef, useState } from 'react';
import {
    SearchOutlined,
    EditOutlined,
    DeleteOutlined,
    PlusOutlined,
} from '@ant-design/icons';
import {  Button, Input, Space, Table } from 'antd';
import Highlighter from 'react-highlight-words';
import myContext from '../../../Context/MyContext';
import Loader from '../../../Component/Loader/Loader';
import CreateCategory from './CreateCategory';
import ButtonCustom from '../../../Component/Button';

export default function CategoryMng() {
    const {
        loading,
        getAllCategories,
        deleteCategoryFunction,
    } = useContext(myContext);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const [openCreateCategory, setOpenCreateCategory] = useState(false);

    const searchInput = useRef(null);

    // Search
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0] || '');
        setSearchedColumn(dataIndex);
    };

    // Reset Search
    const resetSearch = (clearFilters, confirm, dataIndex) => {
        clearFilters?.();
        confirm();
        setSearchText('');
        setSearchedColumn(dataIndex);
    };

    const data = getAllCategories || [];

    // Search Column
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
        }) => (
            <div
                style={{ padding: 8 }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0] || ''}
                    onChange={(e) =>
                        setSelectedKeys(
                            e.target.value ? [e.target.value] : []
                        )
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />

                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        className="bg-primary"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>

                    <Button
                        onClick={() =>
                            resetSearch(
                                clearFilters,
                                confirm,
                                dataIndex
                            )
                        }
                        size="small"
                        style={{ width: 90 }}
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

        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },

        onFilter: (value, record) =>
            record[dataIndex]
                ?.toString()
                .toLowerCase()
                .includes(value.toLowerCase()),

        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
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

    // Table Columns
    const columns = [
        {
            title: 'Mã Số',
            dataIndex: 'id',
            key: 'id',
            width: '10%',
            sorter: (a, b) => Number(a.id) - Number(b.id),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Danh Mục',
            dataIndex: 'name',
            key: 'name',
            width: '20%',
            ...getColumnSearchProps('name'),
            sorter: (a, b) =>
                (a.name || '').localeCompare(b.name || '', 'vi'),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Đường Dẫn Danh Mục',
            dataIndex: 'namelink',
            key: 'namelink',
            width: '20%',
            ...getColumnSearchProps('namelink'),
            sorter: (a, b) =>
                (a.namelink || '').localeCompare(b.namelink || ''),
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Quản Lý',
            key: 'action',
            width: '15%',
            render: (_, cat) => (
                <>
                    <Button
                        key="edit"
                        href={`/admin/category-mng/edit/${cat.id}`}
                        type="link"
                        icon={<EditOutlined />}
                    />

                    <Button
                        key="delete"
                        type="link"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => {
                            if (
                                window.confirm(
                                    'Bạn Muốn Xoá Danh Mục: ' +
                                    cat.name +
                                    '?'
                                )
                            ) {
                                deleteCategoryFunction(cat.id);
                            }
                        }}
                    />
                </>
            ),
        },
    ];

    if (loading || !getAllCategories) {
        return <Loader />;
    }

    return (
        <div className="text-gray-800 dark:text-gray-200">
            {/* Header */}
            <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <h3 className="text-lg font-bold">
                    Quản Lý Danh Mục
                </h3>

                <ButtonCustom
                    type="primary"
                
                    onClick={() => setOpenCreateCategory(true)}
                   
                >
                    Thêm Danh Mục
                </ButtonCustom>
            </div>

            <Table
                columns={columns}
                dataSource={data}
                rowKey="id"
                scroll={{ x: 1000 }}
            />

            <CreateCategory
                open={openCreateCategory}
                onClose={() => setOpenCreateCategory(false)}
            />
        </div>
    );
}
