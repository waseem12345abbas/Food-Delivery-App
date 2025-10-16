import React, {useState, useEffect} from 'react';
// import useSelector for select users from database 
import { useSelector , useDispatch} from 'react-redux';
import { fetchUsers } from '../../state_manage/features/users/users';
import { FaStar } from 'react-icons/fa';
// here are some dummy users 

const ManageUsers = () => {
  const dispatch = useDispatch();
  // states to manage pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10;
  // fetch users from the store
  useEffect(() => {
    dispatch(fetchUsers());
  },[])
  const users = useSelector((state) => state.users.users);
   // index of first item and index of last item and current pages
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentUsers = users?.slice(indexOfFirstItem, indexOfLastItem)
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
    <div className="w-full bg-green-50 min-h-screen bg-gradient-to-br from-black/50 to-black/100 p-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl text-center font-bold text-yellow-400 mb-6">Manage Users</h2>

        <div className="overflow-x-auto  rounded-lg shadow-md">
          <table className="min-w-full divide-y divide-gray-200 text-sm text-left">
            <thead className="bg-gradient-to-br from-white to-black/100 uppercase tracking-wide text-white">
              <tr>
                <th className="px-6 py-3 font-semibold uppercase">Name</th>
                <th className="px-6 py-3 font-semibold uppercase">Email</th>
                <th className="px-6 py-3 font-semibold uppercase">Contact</th>
                <th className="px-6 py-3 font-semibold uppercase">Address</th>
                <th className="px-6 py-3 font-semibold uppercase">Rank</th>
                <th className='px-6 py-3 font-semibold uppercase'>Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-white/70">
            {
                currentUsers.map((user)=>(
            <tr key={user._id} className="border-b border-gray-300">
                <td className="px-6 py-4">{user?.name}</td>
                <td className="px-6 py-4">{user?.email}</td>
                <td className="px-6 py-4">{user?.mobile}</td>
                <td className="px-6 py-4">{user?.address}</td>
                <td className="px-6 py-4 flex items-center gap-2 text-white/90">
                {user?.rank}</td>
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
      {/* pagination controlls */}
      <div className='flex items-center justify-center gap-2 mt-6'>
        {/* previous page */}
        <button
        disabled={currentPage===1}
        onClick={()=>setCurrentPage((prev)=>prev-1)}
         className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Previous
        </button>

        {/* page numbers */}
        {
          Array.from({ length: Math.ceil(users.length / itemsPerPage)}, (_, i) => (
            <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
             className={`px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === i+1 ? 'bg-yellow-600 text-white' : 'bg-yellow-200 text-gray-800'}`}
            >
              {i+1}
            </button>
          ))
        }
        {/* Next page */}
        <button 
        disabled={currentPage === Math.ceil(users.length / itemsPerPage)}
        onClick={()=>setCurrentPage((prev)=>prev+1)}
         className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === Math.ceil(users.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          Next
        </button>

      </div>

    </div>
  );
};

export default ManageUsers;
