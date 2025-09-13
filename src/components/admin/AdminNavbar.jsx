import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const links=[
    { to: '/admin', label:'Dashboard'},
    { to: '/admin/menu', label: 'Menu'},
    { to: '/admin/users', label: 'Users'},
    { to: '/admin/update', label: 'Update'}
]

const AdminNavbar = () => {
    const location=useLocation();
  return ( 
    <nav className='w-full md:max-w-64 bg-yellow-400 flex flex-col items-center md:items-start  gap-4  md:min-h-screen px-4 py-6'>
        <h2 className="text-2xl font-bold mb-4 md:mb-8 text-nowrap">Admin Panel</h2>
        <ul className="flex md:flex-col space-x-2 items-center md:items-start space-y-0 md:space-y-4">
            {
                links.map((link)=>(
                    <li key={link.to} className='md:w-30 bg-black text-white rounded-md font-semibold shadow-md shadow-neutral-500'>
                        <Link to={link.to}
                        className={`block px-3 py-2 text-base rounded-md
                            ${location.pathname === link.to ? 'bg-white text-black':'hover:bg-gray-900'}`}
                        >{link.label}</Link>
                    </li>
                ))
            }
        </ul>
    </nav>
  )
}

export default AdminNavbar
