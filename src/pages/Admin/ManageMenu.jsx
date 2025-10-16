import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_manage/features/products/productsSlice";
import { deleteProduct } from "../../state_manage/features/products/deleteProduct";
import { updateProduct } from "../../state_manage/features/products/updateProduct";
import AddNewItem from '../../components/admin/AddNewItem'
import UpdateMenuItem from '../../components/admin/UpdateMenuItem'
import { FaPenAlt, FaTrash, FaEye } from "react-icons/fa";
import MenuDetailsPage from "./components/MenuDetailsPage";

const ManageMenu = () => {
  // state for selected item of the menu
  const [selectedMenuItem, setSelectedMenuItem] = useState(null)
  // states to manage pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // dispatch an actions to update data in the store
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  // since data is updated after dispatch now we can get the data from the store
  const menuProducts = useSelector((state) => state.products.products);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - indexOfLastItem;
  const currentProducts = menuProducts?.slice(indexOfFirstItem, indexOfLastItem)
  // state for update popup
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // delete menu item
  const deleteMenuItem = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item."
    );
    if (confirmed) {
      dispatch(deleteProduct(id))
    }
  };

  // handle update menu item
  const handleUpdateItem = (updatedData) => {
    if (selectedItem) {
      dispatch(updateProduct({ id: selectedItem._id, updateData: updatedData }));
      setShowUpdatePopup(false);
      setSelectedItem(null);
    }
  };

  // close update popup
  const closeUpdatePopup = () => {
    setShowUpdatePopup(false);
    setSelectedItem(null);
  };
  return (
    <div className="bg-gradient-to-br from-black/50 to-black/100 shadow w-full overflow-x-auto relative">
      <div className="mb-10"><AddNewItem/></div>
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-yellow-400 text-center font-bold text-4xl">Manage Menu</h1>
      </div>

      {/* open details page when view details button is clicked */}
      {
        selectedMenuItem && (
          <MenuDetailsPage
          menuItem={selectedMenuItem}
          onClose={()=>setSelectedMenuItem(null)}
          />
        )
      }
      
      {/* a table of menu list */}
      <div className="">
      <table className="min-w-full bg-gradient-to-br from-black/50 to-black/100 text-left mx-5">
        <thead className=" text-white border-b border-gray-700">
          <tr className="uppercase bg-gradient-to-br from-white to-black/100 text-white tracking-wide rounded-t-lg">
            <th className="px-4 py-2">Details</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {currentProducts?.map((item) => (
            <tr key={item._id} className="text-white bg-gradient-to-br from-black to-white/5 border-b border-gray-700 hover:bg-gray-800">
              <td>
                <button onClick={()=>setSelectedMenuItem(item)}
                  
                  className="flex items-center gap-2 bg-gradient-to-br from-black to-white text-black px-4 py-2 mx-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300">
                  <FaEye className="text-white" />View Details
                </button>
              </td>
              <td className="px-4 py-2">{item.name}</td>
              <td className="px-4 py-2">RS {item.price}</td>
               <td className="px-6 py-3 flex flex-wrap gap-3">
                  {/* Edit Button */}
                  <button
                    onClick={() => {
                      setSelectedItem(item);
                      setShowUpdatePopup(true);
                    }}
                    className="bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-yellow-500/40 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-0.5"
                  >
                    <span><FaPenAlt/></span> Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteMenuItem(item._id)}
                    className="bg-gradient-to-r from-red-600 to-red-700 text-white font-semibold px-5 py-2 rounded-lg shadow-md hover:shadow-red-500/40 hover:scale-105 transition-all duration-300 text-nowrap flex items-center justify-center gap-0.5"
                  >
                    <span><FaTrash/></span> Delete
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      {/* pagination buttons */}
      <div  className='flex items-center justify-center gap-2 my-6'>
        {/* previous button */}
        <button
        disabled={currentPage===1}
        onClick={()=>setCurrentPage((prev)=>prev-1)}
        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Previous</button>
        {/* numbers between the buttons */}
        {
          Array.from({length: Math.ceil(menuProducts.length / itemsPerPage)}, (_, i)=>(
            <button
            key={i}
            onClick={()=>setCurrentPage(i+1)}
             className={`px-4 py-2 rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === i+1 ? 'bg-yellow-600 text-white' : 'bg-yellow-200 text-gray-800'}`}
            >{i+1}</button>
          ))

        }
        {/* next buttons */}
        <button
        disabled={currentPage===Math.ceil(menuProducts.length / itemsPerPage)}
        onClick={()=>setCurrentPage((prev)=>prev+1)}
        className={`px-4 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow-md hover:bg-yellow-600 hover:shadow-lg transition-all duration-300 ${currentPage === Math.ceil(menuProducts.length / itemsPerPage) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >Next</button>

      </div>

      {/* Update Popup */}
      {showUpdatePopup && selectedItem && (
        <UpdateMenuItem
          item={selectedItem}
          onClose={closeUpdatePopup}
          onUpdate={handleUpdateItem}
        />
      )}
    </div>
  );
};

export default ManageMenu;
