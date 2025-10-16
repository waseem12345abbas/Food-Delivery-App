import { useState } from "react";

export function AdminAddMenuItem({onClose, onAdd}) {

  // store the initial data
  const [data, setData] = useState({
    id: "",
    name: "",
    price: "",
    category: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    if( !data.id || !data.name || !data.price || !data.category){
      alert("Please add new Item");
      return
    }
    onAdd(data)
    onClose()
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-black">
      <h2 className="text-xl text-white font-semibold mb-4">Add New Menu Item</h2>
      <form action="#" method="post" className="space-y-3">
        <input
          type="text"
          name="id"
          placeholder="ID"
          value={data.id}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={data.name}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <div className="flex justify-between">
           <button
          type="button"
          onClick={handleAdd}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
        >
          Add Item
        </button>
          <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
        </div>
      </form>
      </div>
     
    </div>
  );
}


export function AdminUpdateMenuItem({ targetItem ,onClose, onAdd}) {

  // store the initial data
  const [data, setData] = useState(targetItem);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAdd = () => {
    if( !data.id || !data.name || !data.price || !data.category){
      alert("Please add new Value");
      return
    }
    onAdd(data)
    onClose()
  };

  return (
    <div className="fixed inset-0 backdrop-blur-xs flex justify-center items-center z-50">
      <div className="bg-black p-6 rounded-md shadow-md w-[90%] max-w-md">
      <h2 className="text-xl text-white font-semibold mb-4">Update Menu Item</h2>
      <form action="#" method="post" className="space-y-3">
        <input
          type="text"
          name="name"
          placeholder="Item Name"
          value={data.name}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          className="w-full border p-2 rounded bg-white"
        />
        <div className="flex justify-between">
           <button
          type="button"
          onClick={handleAdd}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 cursor-pointer"
        >
          Update Item
        </button>
          <button
          type="button"
          onClick={onClose}
          className="text-gray-600 hover:text-white cursor-pointer"
        >
          Cancel
        </button>
        </div>
      </form>
      </div>
     
    </div>
  );
}

