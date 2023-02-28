import { useReducer } from "react";

import CartContext from "./cart-context";

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = function (state, action) {
  const updatedItems = [...state.items];
  let totalAmount = state.totalAmount;
  const mealIsInCart = updatedItems
    .map((item) => item.id)
    .includes(action.data.id);
  switch (action.type) {
    case "ADD":
      if (mealIsInCart) {
        updatedItems.find((item) => item.id === action.data.id).amount +=
          action.data.amount;
      } else {
        updatedItems.push(action.data);
      }
      totalAmount += action.data.price * action.data.amount;
      break;
    case "REMOVE":
      if (!mealIsInCart) break;
      const entryIndex = updatedItems.findIndex(
        (item) => item.id === action.data.id
      );
      const entry = updatedItems[entryIndex];
      totalAmount -= entry.price;
      entry.amount -= 1;
      if (entry.amount > 0) break;
      updatedItems.splice(entryIndex, 1);
      break;
    default:
      console.error("Unforeseen action");
  }
  return {
    items: updatedItems,
    totalAmount,
  };
};

const CartProvider = function (props) {
  const addItemHandler = function (item, amount) {
    dispatchCartState({
      type: "ADD",
      data: {
        ...item,
        amount,
      },
    });
  };
  const removeItemHandler = function (id) {
    dispatchCartState({
      type: "REMOVE",
      data: {
        id,
      },
    });
  };
  const [cartState, dispatchCartState] = useReducer(
    cartReducer,
    defaultCartState
  );

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
