import React from "react";
import ReactDOM from "react-dom";

import classes from "./Modal.module.css";

const Backdrop = function (props) {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const ModalOverlay = function (props) {
  return <div className={classes.modal}>{props.children}</div>;
};

const Modal = function (props) {
  const portalElem = document.getElementById("overlays");
  return (
    <React.Fragment>
      {ReactDOM.createPortal(<Backdrop onClick={props.onClick} />, portalElem)}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElem
      )}
    </React.Fragment>
  );
};

export default Modal;
