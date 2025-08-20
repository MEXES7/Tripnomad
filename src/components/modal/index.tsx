// components/Modal.tsx
"use client";

import styles from "./styles.module.scss";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  className = "",
  style = {},
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={`${styles.modal} ${className}`}
        style={style}
        onClick={(e) => e.stopPropagation()} // prevent background click from closing it
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};

export default Modal;
