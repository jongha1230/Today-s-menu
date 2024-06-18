import useModalStore from '../../../store/useModalStore';

const ProgressBar = () => {
  const { currentPage, totalPages } = useModalStore();
  const progress = ((currentPage + 1) / totalPages) * 100;

  return (
    <div className="w-10/12 bg-gray-200 rounded-2xl h-4">
      <div
        className="bg-green-500 h-full rounded-2xl"
        style={{ width: `${progress}%`, transition: 'width 0.3s ease-in-out' }}
      ></div>
    </div>
  );
};

export default ProgressBar;
