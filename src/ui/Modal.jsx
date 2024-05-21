import {
  cloneElement,
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";
import { useOutsideClick } from "../hooks/useOutsideClick";

const StyledModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  transition: all 0.5s;
`;

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
`;

const Button = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  transform: translateX(0.8rem);
  transition: all 0.2s;
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    /* Sometimes we need both */
    /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
    color: var(--color-grey-500);
  }
`;

//COMPOUND COMPONENT PATTERN

//1)creating context
const ModalContext = createContext();

//2)Creating parent component
function Modal({ children }) {
  const [openName, setOpenName] = useState("");

  const closeModal = () => setOpenName("");
  const openModal = setOpenName;

  return (
    <ModalContext.Provider value={{ openName, closeModal, openModal }}>
      {children}
    </ModalContext.Provider>
  );
}

//3)creating childcomponent
function OpenBtn({ children, opens }) {
  const { openModal } = useContext(ModalContext);
  return cloneElement(children, { onClick: () => openModal(opens) });
}

function ModalWindow({ children, name }) {
  const { closeModal, openName } = useContext(ModalContext);
  //importing our custom hook toclosemodal when clicked outside of the modal window
  const ref = useOutsideClick(closeModal);

  //checking which window to open by comparing the window name with currently active state
  if (name !== openName) return null;

  return createPortal(
    <Overlay>
      <StyledModal ref={ref}>
        <div>{cloneElement(children, { onCloseModal: closeModal })}</div>
        <Button onClick={closeModal}>
          <HiXMark />
        </Button>
      </StyledModal>
    </Overlay>,
    document.body
  );
}
//4)adding the childcomponent as property to parent component
Modal.OpenBtn = OpenBtn;
Modal.ModalWindow = ModalWindow;

export default Modal;
