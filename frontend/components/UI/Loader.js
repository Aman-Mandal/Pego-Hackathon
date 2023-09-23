const Loader = ({ inComp = false }) => {
  return (
    <div
      className={`flex justify-center items-center py-4 mt-4 ${
        inComp ? 'max-h-screen' : 'h-screen'
      }`}>
      <div className='animate-spin rounded-full h-24 w-24 border-b-2 border-purple-700' />
    </div>
  );
};

export default Loader;
