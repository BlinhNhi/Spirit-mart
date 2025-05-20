import React, { useContext } from 'react'
import { SearchOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table } from 'antd';
import { useRef, useState } from 'react';
import Highlighter from 'react-highlight-words';
import myContext from '../../../Context/MyContext';
import Loader from '../../../Component/Loader/Loader';
import NoImage from '../../../assest/no-image.jpeg'



export default function PostMng() {
    const { loading, getAllPosts, deletePostFunction } = useContext(myContext);

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
    const data = getAllPosts;

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
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
                        className="bg-primary"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && resetSearch(selectedKeys, confirm, dataIndex)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />
        ),
        filterDropdownProps: {
            onOpenChange: (visible) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
        },
        onFilter: (value, record) =>
            record[dataIndex]?.toString().toLowerCase().includes(value.toLowerCase()),
        render: (text, index) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    key={index}
                    highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
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
            title: 'Tiêu Đề Bài Viết',
            dataIndex: 'title',
            key: 'title',
            width: '10%',
            ...getColumnSearchProps('title'),
            sorter: (a, b) => a.title - b.title,
            sortDirections: ['descend', 'ascend'],
        },
        {
            title: 'Nội Dung Bài Viết',
            dataIndex: 'content',
            width: '20%',
            key: 'content',
            ...getColumnSearchProps('content'),
            sortDirections: ['descend', 'ascend'],
            render: (text, index) => { return <p key={index} className='text-ellipsis overflow-hidden line-clamp-2'>{text?.replace(/<[^>]+>/g, '')}</p> }

        },
        {
            title: "Hình Ảnh",
            dataIndex: "avatar",
            width: '15%',
            key: "avatar",
            render: (text, data, index) => {
                return data?.imagePost ? (
                    <div className='flex flex-col gap-1'>
                        <img
                            className='w-[50px] h-[50px] object-cover rounded-lg border border-gray-300'
                            src={data.imagePost}
                            alt="Ảnh bài viết"
                        />
                    </div>
                ) : (
                    <div className='flex flex-col'>
                        <img
                            key={index}
                            src={NoImage}
                            alt='no-image'
                            className='w-[50px] h-[50px] object-contain border-2 rounded-lg'
                        />
                    </div>
                );
            },
        },
        {
            title: 'Quản Lý',
            width: '15%',
            render: (text, post) => {
                return <>
                    <Button key={1} href={`/admin/post-mng/edit/${post.id}`} type="link" icon={<EditOutlined />}></Button>
                    <Button key={2} type="link" danger icon={<DeleteOutlined />} onClick={() => {
                        if (window.confirm('Bạn Muốn Xoá Bài Viết : ' + post.title + '?')) {
                            deletePostFunction(post?.id)
                        }
                    }
                    }></Button>
                </>

            }
        },
    ]

    if (loading || !getAllPosts) {
        return <Loader />;
    }
    return (
        <div className="text-gray-800 dark:text-gray-200">
            <div className='d-flex mb-4'>
                <h3 className='text-lg font-bold'>Quản Lý Bài Viết</h3>
                <Button href='/admin/post-mng/addpost' type="primary" className='ml-3 mt-3 small bg-blue-600'>+ Tạo Bài Viết</Button>
            </div>
            <Table columns={columns} dataSource={data} rowKey={'id'} scroll={{ x: 1000 }} />
        </div>
    )

}
