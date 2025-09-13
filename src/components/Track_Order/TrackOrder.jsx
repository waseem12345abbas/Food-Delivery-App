import React, { useState } from "react";

// Dummy order tracking data
const dummyOrderTrack = [
  {
    orderId: "ORD_1001",
    userId: "user1",
    orderStatus: "confirmed",
    stages: [
      {
        title: "Ingredients",
        type: "image",
        mediaUrl: [
          {
            img: "/dummy-orders/ingredients/burger/burger-bun.png",
            title: "Burger Bun",
          },
          {
            img: "/dummy-orders/ingredients/burger/cheese-sauce.png",
            title: "Cheese Sauce",
          },
          {
            img: "/dummy-orders/ingredients/burger/eggs.png",
            title: "Eggs",
          },
          {
            img: "/dummy-orders/ingredients/burger/ketchup.png",
            title: "Ketchup",
          },
          {
            img: "/dummy-orders/ingredients/burger/lettece.png",
            title: "Lettece",
          },
          {
            img: "/dummy-orders/ingredients/burger/onion.png",
            title: "Fresh Onion",
          },
          {
            img: "/dummy-orders/ingredients/burger/pickle.png",
            title: "Fresh Pickle",
          },
          {
            img: "/dummy-orders/ingredients/burger/tomato.png",
            title: "Fresh tomato",
          },
        ],
      },
      {
        title: "Baking",
        type: "video",
        mediaUrl: "/dummy-orders/preparation/burger-baking.mp4",
      },
      {
        title: "Rider Assigned",
        type: "text",
        riderName: "Rider Ali",
        riderLocation: "xyz",
      },
      {
        title: "Deliverd",
        type: "comment",
        userComment:
          "Excellent service, great pizza with lots of options, and delicious salads. Eric W.",
      },
    ],
  },
  {
    orderId: "ORD_1002",
    userId: "user2",
    orderStatus: "confirmed",
    stages: [
      {
        title: "Ingredients",
        type: "image",
        mediaUrl: [
          {
            img: "/dummy-orders/ingredients/burger/burger-bun.png",
            title: "Burger Bun",
          },
          {
            img: "/dummy-orders/ingredients/burger/cheese-sauce.png",
            title: "Cheese Sauce",
          },
          {
            img: "/dummy-orders/ingredients/burger/eggs.png",
            title: "Eggs",
          },
          {
            img: "/dummy-orders/ingredients/burger/ketchup.png",
            title: "Ketchup",
          },
          {
            img: "/dummy-orders/ingredients/burger/lettece.png",
            title: "Lettece",
          },
          {
            img: "/dummy-orders/ingredients/burger/onion.png",
            title: "Fresh Onion",
          },
          {
            img: "/dummy-orders/ingredients/burger/pickle.png",
            title: "Fresh Pickle",
          },
          {
            img: "/dummy-orders/ingredients/burger/tomato.png",
            title: "Fresh tomato",
          },
        ],
      },
      { title: "Baking", type: "video", mediaUrl: "/dummy-orders/preparation/burger-baking.mp4", },
      {
        title: "Rider Assigned",
        type: "text",
        riderName: "Rider Sana",
        riderLocation: "xyz",
      },
      {
        title: "On the Way",
        type: "comment",
        userComment:
          "Excellent service, great pizza with lots of options, and delicious salads. Eric W.",
      },
    ],
  },
  {
    orderId: "ORD_1003",
    userId: "user3",
    orderStatus: "rejected",
    stages: [
      {
        title: "Ingredients",
        type: "image",
        mediaUrl: [
          {
            img: "/dummy-orders/ingredients/burger/burger-bun.png",
            title: "Burger Bun",
          },
          {
            img: "/dummy-orders/ingredients/burger/cheese-sauce.png",
            title: "Cheese Sauce",
          },
          {
            img: "/dummy-orders/ingredients/burger/eggs.png",
            title: "Eggs",
          },
          {
            img: "/dummy-orders/ingredients/burger/ketchup.png",
            title: "Ketchup",
          },
          {
            img: "/dummy-orders/ingredients/burger/lettece.png",
            title: "Lettece",
          },
          {
            img: "/dummy-orders/ingredients/burger/onion.png",
            title: "Fresh Onion",
          },
          {
            img: "/dummy-orders/ingredients/burger/pickle.png",
            title: "Fresh Pickle",
          },
          {
            img: "/dummy-orders/ingredients/burger/tomato.png",
            title: "Fresh tomato",
          },
        ],
      },
      { title: "Baking", type: "video", mediaUrl: "/dummy-orders/preparation/burger-baking.mp4", },
      {
        title: "Rider Assigned",
        type: "text",
        riderName: "Rider Zain",
        riderLocation: "xyz",
      },
      {
        title: "Deliverd",
        type: "comment",
        userComment:
          "Excellent service, great pizza with lots of options, and delicious salads. Eric W.",
      },
    ],
  },
  {
    orderId: "ORD_1004",
    userId: "user4",
    orderStatus: "confirmed",
    stages: [
      {
        title: "Ingredients",
        type: "image",
        mediaUrl: [
          {
            img: "/dummy-orders/ingredients/burger/burger-bun.png",
            title: "Burger Bun",
          },
          {
            img: "/dummy-orders/ingredients/burger/cheese-sauce.png",
            title: "Cheese Sauce",
          },
          {
            img: "/dummy-orders/ingredients/burger/eggs.png",
            title: "Eggs",
          },
          {
            img: "/dummy-orders/ingredients/burger/ketchup.png",
            title: "Ketchup",
          },
          {
            img: "/dummy-orders/ingredients/burger/lettece.png",
            title: "Lettece",
          },
          {
            img: "/dummy-orders/ingredients/burger/onion.png",
            title: "Fresh Onion",
          },
          {
            img: "/dummy-orders/ingredients/burger/pickle.png",
            title: "Fresh Pickle",
          },
          {
            img: "/dummy-orders/ingredients/burger/tomato.png",
            title: "Fresh tomato",
          },
        ],
      },
      { title: "Baking", type: "video", mediaUrl: "/dummy-orders/preparation/burger-baking.mp4", },
      {
        title: "Rider Assigned",
        type: "text",
        riderName: "Rider Bilal",
        riderLocation: "xyz",
      },
      {
        title: "On the way",
        type: "comment",
        userComment:
          "Excellent service, great pizza with lots of options, and delicious salads. Eric W.",
      },
    ],
  },
  {
    orderId: "ORD_1005",
    userId: "user5",
    orderStatus: "rejected",
    stages: [
      {
        title: "Ingredients",
        type: "image",
        mediaUrl: [
          {
            img: "/dummy-orders/ingredients/burger/burger-bun.png",
            title: "Burger Bun",
          },
          {
            img: "/dummy-orders/ingredients/burger/cheese-sauce.png",
            title: "Cheese Sauce",
          },
          {
            img: "/dummy-orders/ingredients/burger/eggs.png",
            title: "Eggs",
          },
          {
            img: "/dummy-orders/ingredients/burger/ketchup.png",
            title: "Ketchup",
          },
          {
            img: "/dummy-orders/ingredients/burger/lettece.png",
            title: "Lettece",
          },
          {
            img: "/dummy-orders/ingredients/burger/onion.png",
            title: "Fresh Onion",
          },
          {
            img: "/dummy-orders/ingredients/burger/pickle.png",
            title: "Fresh Pickle",
          },
          {
            img: "/dummy-orders/ingredients/burger/tomato.png",
            title: "Fresh tomato",
          },
        ],
      },
      { title: "Baking", type: "video", mediaUrl: "/dummy-orders/preparation/burger-baking.mp4", },
      {
        title: "Rider Assigned",
        type: "text",
        riderName: "Rider Asim",
        riderLocation: "xyz",
      },
      {
        title: "Deliverd",
        type: "comment",
        userComment:
          "Excellent service, great pizza with lots of options, and delicious salads. Eric W.",
      },
    ],
  },
];

// Dummy orders (products)
const dummyOrders = [
  {
    orderId: "ORD_1001",
    userId: "Muneeb#123",
    orderImg: "/dummy-orders/big-mac-meal.png",
    orderDetails: "Big Mac Meal",
    total: 850,
    date: "2023-05-15T14:30:00Z",
  },
  {
    orderId: "ORD_1002",
    userId: "Ali#456",
    orderImg: "/dummy-orders/Double-Cheese-Burger-meal.png",
    orderDetails: "Double Cheese Burger Meal",
    total: 950,
    date: "2023-05-16T18:45:00Z",
  },
  {
    orderId: "ORD_1003",
    userId: "Sarah#789",
    orderImg: "/dummy-orders/double-mcchicken-meal.png",
    orderDetails: "Double McChicken Meal",
    total: 1200,
    date: "2023-05-17T12:15:00Z",
  },
  {
    orderId: "ORD_1004",
    userId: "John#321",
    orderImg: "/dummy-orders/Double-McCrispy-mccrispy-meal.png",
    orderDetails: "Double McCrispy Meal",
    total: 1600,
    date: "2023-05-18T19:20:00Z",
  },
];

const TrackOrder = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleTrack = (orderId) => {
    const order = dummyOrderTrack.find((o) => o.orderId === orderId);
    setSelectedOrder(order || null);
  };

  return (
    <div className="px-4 py-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Confirm Your Orders
      </h1>

      {/* Orders Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {dummyOrders.map((order) => (
          <div
            key={order.orderId}
            className="bg-white shadow-lg rounded-lg p-4 hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={order.orderImg}
              alt={order.orderDetails}
              className="w-full h-40 object-cover rounded-md mb-4"
            />
            <h3 className="text-lg font-semibold text-gray-700 mb-2 capitalize">
              {order.orderDetails}
            </h3>
            <p className="text-sm text-gray-500 mb-1">
              Order ID: {order.orderId}
            </p>
            <p className="text-sm text-gray-500 mb-3">User: {order.userId}</p>
            <button
              onClick={() => handleTrack(order.orderId)}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
            >
              Confirm Order
            </button>
          </div>
        ))}
      </div>

      {/* Track Section */}
      {selectedOrder ? (
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Tracking Order: {selectedOrder.orderId}
          </h2>
          {selectedOrder.orderStatus === "confirmed" ? (
            <div className="space-y-6">
              <div className="flex justify-center items-center gap-10">
                <p className="text-center text-black text-2xl my-2 font-bold">
                  Your Order is Confirmed.
                </p>
                <img
                  className="w-full h-full max-w-[200px] max-h-[200px] rounded-md"
                  src="/dummy-orders/emoji/order-confirmed.png"
                  alt="Sad Emoji"
                />
              </div>
              {selectedOrder.stages.map((stage, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-md border ${
                    index === selectedOrder.currentStageIndex
                      ? "border-green-500 bg-green-50"
                      : "border-gray-300"
                  }`}
                >
                  <h3 className="text-2xl text-center font-bold text-gray-700 mb-4">
                    {stage.title}
                  </h3>

                  {stage.type === "image" && (
                    <div className="flex flex-wrap item-center justify-center gap-10">
                      {Array.isArray(stage.mediaUrl) ? (
                        stage.mediaUrl.map((image, index) => (
                          <div key={index} className="mb-2 bg-gray-300">
                            <img
                              src={image.img}
                              alt={image.title}
                              className="w-full h-full max-w-[200px] max-h-[200px] rounded-md"
                            />
                            <p className="text-sm text-black mt-1 text-center my-2">
                              {image.title}
                            </p>
                          </div>
                        ))
                      ) : (
                        <img
                          src={stage.mediaUrl}
                          alt={stage.title}
                          className="w-full max-w-sm rounded"
                        />
                      )}
                    </div>
                  )}

                  <div className="flex items-center justify-center">
                    {stage.type === "video" && (
                      <video
                        src={stage.mediaUrl}
                        controls
                        className="w-full max-w-[500px] max-h-[500px]  rounded"
                      />
                    )}
                  </div>
                  {stage.type === "text" && (
                    <div>
                        <div className="flex flex-col gap-4 justify-between items-center">
                          <p className="text-gray-600">
                            <span className="mx-2 text-xl text-black font-semibold">Rider Name:</span>
                            <span>{stage.riderName}</span>
                            </p>
                          <p className="cursor-pointer">
                            <span className="mx-2 text-xl text-black font-semimbold">Rider Location:</span>
                            <span className="text-gray-500">{stage.riderLocation}</span>
                          </p>
                        </div>
                      </div>
                  )}

                  <div>
                    {stage.type === "comment" && (
                       <div className="flex flex-col gap-4 justify-between items-center">
                      <p className="text-gray-600">
                        <span className="mx-2 text-xl text-black font-semibold">
                          Status:
                        </span>
                        <span className="mx-2">{stage.title}</span>
                      </p>
                      <p className="cursor-pointer">
                        <span className="mx-2 text-xl text-black font-semibold">
                          User Comment:
                        </span>
                        <span className="text-gray-500">{stage.userComment}</span>
                      </p>
                    </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center gap-10">
              <p className="text-center text-black text-2xl my-2 font-bold">
                Your Order is rejected.
              </p>
              <img
                className="w-full h-full max-w-[200px] max-h-[200px] rounded-md"
                src="/dummy-orders/emoji/sad-emoji.png"
                alt="Sad Emoji"
              />
            </div>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-500">
          No order is being tracked currently.
        </p>
      )}
    </div>
  );
};

export default TrackOrder;
