import React from "react";

const LoadMoreButton = ({visible, total, onClick}) => {
  if (visible >= total) return null;
  return (
    <button
      onClick={onClick}
      className="inline-flex items-center my-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
    >
      Load more
    </button>
  );
};

export default LoadMoreButton;
