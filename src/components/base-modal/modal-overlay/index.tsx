type Props = {
  onClick: () => void;
};

function ModalOverlay({ onClick }: Props) {
  return <div className="overlay" onClick={onClick} data-testid="modal-overlay"/>;
}
export default ModalOverlay;
