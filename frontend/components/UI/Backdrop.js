const Backdrop = ({ onClose }) => {
  return (
    <div
      onClick={onClose}
      className='top-0 left-0 fixed bg-black/20 backdrop-blur-sm h-screen w-screen'></div>
  );
};
export default Backdrop;
