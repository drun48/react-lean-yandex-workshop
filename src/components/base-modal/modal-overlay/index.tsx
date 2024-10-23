type Props = {
  onClick: () => void;
};

function ModalOverlay({ onClick }: Props) {
  return <div className="overlay" onClick={onClick} />;
}
export default ModalOverlay;
