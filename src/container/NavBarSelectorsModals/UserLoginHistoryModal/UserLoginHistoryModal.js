import React from "react";
import styles from "./UserLoginHistory.module.css";
import { Modal } from "../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { ModalIsOpen } from "../../../store/ActionsSlicers/UIModalsActions";

const UserLoginHistoryModal = () => {
  const ModalReducer = useSelector((state) => state.modal);

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(ModalIsOpen(false));
  };
  return (
    <>
      <Modal
        show={ModalReducer.showModal}
        onHide={handleClose}
        closeButton={true}
        modalFooterClassName="d-block"
        modalHeaderClassName="d-block"
        centered
        size={"xl"}
      />
    </>
  );
};

export default UserLoginHistoryModal;
