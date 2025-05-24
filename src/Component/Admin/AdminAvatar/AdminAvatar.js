import { Button, Popover } from 'antd';
import { RiAdminFill } from "react-icons/ri";

export default function AdminAvatar(props) {
    const userLogin = {
        id: 1,
        role: 'Admin',
        name: 'MinhCoi',
        email: 'adminMinhCoi@gmail.com'
    }
    const content = (
        <div style={{ width: 200 }}>
            <Button type="text" href="/login" className='w-full text-left'
                onClick={() => {
                    localStorage.clear()
                    window.location.href = "/"
                }}
            >Logout</Button>
        </div>
    );

    return <Popover placement="bottomRight" title={userLogin?.email} content={content} trigger="click">
        <button className=''>
            <div className='hidden lg:flex xl:flex 2xl:flex items-center gap-2 py-2 rounded-md mt-4 hover:cursor-pointer '>
                <RiAdminFill className='w-[32px] h-[32px] text-lg border-2 p-1 text-gray-600 dark:text-gray-100 rounded-full' />
                <div className='flex flex-col items-start justify-between '>
                    <h1 className='font-serif text-sm text-gray-600'>{userLogin?.name}</h1>
                    <h3 className='font-normal text-sm text-gray-400'>{userLogin?.role}</h3>
                </div>
            </div>
            <div className='mt-5 block sm:block  md:block lg:hidden xl:hidden 2xl:hidden'>
                <RiAdminFill className='w-[32px] h-[32px] text-lg border-2 p-1 text-gray-600 dark:text-gray-100 rounded-full' />
            </div>
        </button>
    </Popover>
}