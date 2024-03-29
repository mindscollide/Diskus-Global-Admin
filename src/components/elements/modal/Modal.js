import Modal from "react-bootstrap/Modal";
import "./Modal.css";

const CustomModal = ({
  ModalTitle,
  ModalBody,
  ModalFooter,
  show,
  setShow,
  onHide,
  size,
  backdrop,
  modalBodyClassName,
  modalParentClass,
  modalFooterClassName,
  modalHeaderClassName,
  className,
  closeButton,
  modalTitleClassName,
}) => {
  return (
    <>
      <div className={modalParentClass}>
        <Modal
          show={show}
          onHide={onHide}
          backdrop={backdrop}
          data-backdrop="false"
          size={size}
          centered={true}
          className={className}
        >
          <Modal.Header
            className={modalHeaderClassName}
            closeButton={closeButton}
          >
            <Modal.Title className={modalTitleClassName}>
              {ModalTitle}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body className={modalBodyClassName}>{ModalBody}</Modal.Body>
          <Modal.Footer className={modalFooterClassName}>
            {ModalFooter}
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
};

export default CustomModal;
