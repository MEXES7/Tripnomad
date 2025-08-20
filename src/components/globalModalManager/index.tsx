"use client";

import PlanTrip from "@/features/planTrip";
import { useModalStore } from "@/store/modalStore";
import Modal from "../modal";

const GlobalModalManager = () => {
  const modalType = useModalStore((state) => state.modalType);
  const closeModal = useModalStore((state) => state.closeModal);

  if (!modalType) return null;

  const renderModalContent = () => {
    switch (modalType) {
      //   case "login":
      //     return <LoginModal />;
      //   case "signup":
      //     return <SignupModal />;
      case "planTrip":
        return <PlanTrip />;
      default:
        return null;
    }
  };

  const getModalStyle = (): React.CSSProperties => {
    switch (modalType) {
      case "planTrip":
        return { width: "", height: "" };
      default:
        return {};
    }
  };

  return (
    <Modal isOpen={!!modalType} onClose={closeModal} style={getModalStyle()}>
      {renderModalContent()}
    </Modal>
  );
};

export default GlobalModalManager;
