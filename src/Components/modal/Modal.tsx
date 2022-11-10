import { FC, useState } from "react";

export interface Props {
  isOpen?: boolean;
  showDuration?: number;
  hideDuration?: number;
  children?: any;
}

const Modal: FC<Props> = ({
  isOpen,
  showDuration = 200,
  hideDuration = 200,
  children,
}) => {
  const [visible, setVisible] = useState(false);

  return visible ? <></> : null;
};

export default Modal;

export {};
