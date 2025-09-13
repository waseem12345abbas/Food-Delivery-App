import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../../state_manage/features/products/productsSlice";
import { deleteProduct } from "../../state_manage/features/products/deleteProduct";
import { updateProduct } from "../../state_manage/features/products/updateProduct";
import AddNewItem from '../../components/admin/AddNewItem'
import UpdateMenuItem from '../../components/admin/UpdateMenuItem'

const ManageMenu = () => {
  // dispatch an actions to update data in the store
  const dispatch=useDispatch()
  useEffect(()=>{
    dispatch(fetchProducts())
  },[])
  // since data is updated after dispatch now we can get the data from the store
  const menuProducts = useSelector((state) => state.products.products);
  // state for update popup
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  // delete menu item
  const deleteMenuItem = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item."
    );
    if (confirmed) {
      console.log(`Deleting item with id: ${id}`);
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
    <div className="p-6 bg-white shadow rounded-md w-full overflow-x-auto relative">
      <div className="mb-10"><AddNewItem/></div>
      <div className="flex justify-center items-center mb-10">
        <h1 className="text-black text-center font-bold text-2xl">Manage Menu</h1>
      </div>
      
      {/* a table of menu list */}
      <div className="bg-gray-400">
      <table className="min-w-full text-left">
        <thead className="bg-black text-white">
          <tr>
            <th className="px-4 py-2">Item ID</th>
            <th className="px-4 py-2">Item Name</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Image</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {menuProducts.map((item) => (
            <tr key={item._id}>
              <td className="border-r px-4 py-2">{item._id}</td>
              <td className="border-r px-4 py-2">{item.name}</td>
              <td className="border-r px-4 py-2">${item.price}</td>
              <td className="border-r px-4 py-2">{item.category}</td>
              <td className="border-r px-4 py-2"> { item.image ? <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded"/>:'no image found'}</td>
              <td className="px-4 py-2 space-x-2 space-y-2 md:space-y-1">
                <button
                onClick={() => {
                  setSelectedItem(item);
                  setShowUpdatePopup(true);
                }}
                  className="bg-black px-4 py-1 rounded-xs text-white text-base shadow-xs shadow-white cursor-pointer"
                >
                  Edit
                </button>
                <button 
                 onClick={()=>deleteMenuItem(item._id)}
                className="bg-black px-4 py-1 rounded-xs text-red-700 text-base shadow-xs shadow-white cursor-pointer">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
