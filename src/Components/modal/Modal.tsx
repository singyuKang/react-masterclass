import { FC, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingImage from "../loading/LoadingImage";

export interface Props {
  isOpen?: boolean;
  showDuration?: number;
  hideDuration?: number;
  children?: any;
}

// SideBarModal.js
const Background = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0);
  z-index: 0;
`;

const ModalContainer = styled.div`
  position: fixed;
  /* flex: 1; */
  left: 0;
  top: 0;

  /* transform: translate(-50%, -50%); */
  max-height: 100%;
  width: 100%;
  height: 100%;
  /* padding: 16px; */
  /* background: rgb(25, 31, 44); */
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  /* text-align: center; */
`;

const InnderModal = styled.div`
  width: 300px;
  height: 150px;
  background-color: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  z-index: 100;
`;

const Modal: FC<Props> = ({
  isOpen,
  showDuration = 200,
  hideDuration = 200,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  const openModal = () => {
    setVisible(true);
    // Animated.parallel([openOverlay]).start();
  };

  const closeModal = () => {
    setVisible(false);
    // Animated.parallel([closeOverlay]).start(() => {
    //   setVisible(false);
    // });
  };

  useEffect(() => {
    if (isOpen) {
      openModal();
    } else {
      closeModal();
    }
  }, [isOpen]);

  return visible ? (
    <ModalContainer>
      <LoadingImage />
    </ModalContainer>
  ) : null;
};

export default Modal;

export {};
