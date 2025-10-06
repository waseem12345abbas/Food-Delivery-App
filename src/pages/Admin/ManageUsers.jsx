import React, {useState, useEffect} from 'react';
// import useSelector for select users from database 
import { useSelector , useDispatch} from 'react-redux';
import { fetchUsers } from '../../state_manage/features/users/users';
// here are some dummy users 

const ManageUsers = () => {
  const dispatch = useDispatch();
  // fetch users from the store
  useEffect(() => {
    dispatch(fetchUsers());
  },[])
  const users = useSelector((state) => state.users.users);
  const [blocked, setBlocked]=useState(null)
  // block a user
  function handleBlock(user){
    const {name, _id}=user
      const confirm=window.confirm(`Are you want to block this user ${name} ?`)
      if(confirm){
        alert(`${name} you are blocked from this app.`)
        setBlocked(_id)
      }
  }
  return (
    <div className="w-full px-4 py-6 bg-green-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-center font-bold text-gray-800 mb-6">Manage Users</h2>

        <div className="overflow-x-auto bg-gray-500 rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 font-semibold uppercase">Name</th>
                <th className="px-6 py-3 font-semibold uppercase">Email</th>
                <th className="px-6 py-3 font-semibold uppercase">Contact</th>
                <th className="px-6 py-3 font-semibold uppercase">Address</th>
                <th className="px-6 py-3 font-semibold uppercase">Rank</th>
                <th className='px-6 py-3 font-semibold uppercase'>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-black">
              {
                users.map((user)=>(
            <tr key={user._id} className="border-b border-gray-300">
                <td className="px-6 py-4">{user?.name}</td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.mobile}</td>
                <td className="px-6 py-4">{user?.address}</td>
                <td className='px-6 py-4'>{user?.rank}</td>
                <td className='px-6 py-4'>
                <button
                onClick={()=>handleBlock(user)}
                className={`'border rounded ${blocked===user?._id? 'bg-black hover:cursor-not-allowed text-white':'bg-black cursor-pointer text-red-700'} px-3 py-2 `}>
                  {blocked === user?._id ? ' Blocked' : 'Block'}
                </button>
                </td>
            </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageUsers;
