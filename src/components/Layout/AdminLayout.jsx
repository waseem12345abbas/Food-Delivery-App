import React from 'react'
import { Outlet } from 'react-router-dom';
import AdminNavbar from '../admin/AdminNavbar';

const AdminLayout = () => {
  return (
    <div className='flex flex-col md:flex-row md:min-h-screen'>
      <AdminNavbar/>
      <main className='flex-grow bg-gray-100 p-6'>
        <Outlet/>
      </main>
    </div>
  )
}
export default AdminLayout
