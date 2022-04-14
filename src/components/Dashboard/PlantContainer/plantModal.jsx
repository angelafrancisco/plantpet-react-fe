import ReactModal from 'react-modal';

const PlantModal = (props) => {
    return (
        <ReactModal isOpen={props.isOpen} ariaHideApp={false} className="modal" overlayClassName="overlay-modal">
            {props.children}
        </ReactModal>
    );
}

export default PlantModal;