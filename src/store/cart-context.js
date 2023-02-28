import React from "react";

const CartContext = React.createContext({
  items: [
    {
      id: "m1",
      name: "Sushi",
      description: "Finest fish and veggies",
      price: 22.99,
      amount: 2,
    },
  ],
  totalAmount: 0,
  addItem: function (item) {},
  removeItem: function (id) {},
});

export default CartContext;
