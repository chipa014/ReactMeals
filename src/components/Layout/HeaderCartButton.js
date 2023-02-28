import { useContext, useEffect, useState } from "react";

import CartContext from "../../store/cart-context";

import classes from "./HeaderCartButton.module.css";

import CartIcon from "../../assets/CartIcon";

const HeaderCartButton = function (props) {
  const cartCtx = useContext(CartContext);
  const numberOfItems = cartCtx.items.reduce(
    (acc, item) => acc + item.amount,
    0
  );
  const [bump, setBump] = useState(false);
  useEffect(
    function () {
      if (cartCtx.items.length === 0) return;
      setBump(true);
      const timer = setTimeout(setBump.bind(false), 300);
      return () => {
        clearTimeout(timer);
      };
    },
    [cartCtx.items]
  );

  const btnClasses = `${classes.button} ${bump && classes.bump}`;
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}>
        <CartIcon />
      </span>
      <span>Cart</span>
      <span className={classes.badge}>{numberOfItems}</span>
    </button>
  );
};

export default HeaderCartButton;
