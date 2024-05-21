import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "../../features/cabins/CreateCabinForm";
import CabinTable from "../../features/cabins/CabinTable ";

function AddCabin() {
  //COMPOUND COMPONENT PATTERN
  return (
    <Modal>
      <Modal.OpenBtn opens="cabin-form">
        {/* opens and nameprops are used to identify which modal window is currently active */}
        <Button>Add new cabin</Button>
      </Modal.OpenBtn>
      <Modal.ModalWindow name="cabin-form">
        <CreateCabinForm />
      </Modal.ModalWindow>

      {/* reused the same modal component to display diff content
      <Modal.OpenBtn opens="table">
        {/* opens and nameprops are used to identify which modal window is currently active */}
      {/* <Button>Show table</Button>
      </Modal.OpenBtn>
      <Modal.ModalWindow name="table">
        <CabinTable />
  </Modal.ModalWindow> */}
    </Modal>
  );
}

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);
//   return (
//     <div>
//       <Button onClick={() => setIsOpenModal((show) => !show)}>
//         Add new cabin
//       </Button>

//       {isOpenModal && (
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       )}
//     </div>
//   );
// }

export default AddCabin;
