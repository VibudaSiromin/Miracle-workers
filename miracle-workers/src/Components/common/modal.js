import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalComponent = ({
  children,
  isShowModal,
  title,
  onCancel,
  onSubmit,
  saveButtonText
}) => {
  return (
    <Modal show={isShowModal}>
      <form onSubmit={onSubmit}>
      <Modal.Header closeButton onHide={onCancel}>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCancel}>
          Close
        </Button>
        <Button variant="primary" type="submit" onClick={onSubmit}>
          {saveButtonText}
        </Button>
      </Modal.Footer>
      </form>
    </Modal>
  );
};

export default ModalComponent;
