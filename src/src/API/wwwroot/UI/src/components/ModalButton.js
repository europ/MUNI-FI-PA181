import React from "react";
import { compose, withState } from "recompose";

import { Modal, Button } from ".";

const ModalComponent = ({
  modalOpen,
  setModalOpen,
  content,
  modalProps,
  ...props
}) => (
  <>
    <Modal
      {...{
        ...modalProps,
        open: modalOpen,
        content,
        onClose: () => setModalOpen(false)
      }}
    />
    <Button
      {...{
        ...props,
        onClick: e => {
          e.stopPropagation();
          setModalOpen(true);
        }
      }}
    />
  </>
);

export default compose(withState("modalOpen", "setModalOpen", false))(
  ModalComponent
);
