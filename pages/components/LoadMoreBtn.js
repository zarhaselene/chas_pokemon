const LoadMoreBtn = () => {
  return (
    <button
      onClick={loadMore}
      className="p-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-xl ml-4 mb-4 duration-150 transition-all ease-in"
    >
      Load more Pokémons
    </button>
  );
};

export default LoadMoreBtn;
