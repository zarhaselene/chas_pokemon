import {FaSearch} from "react-icons/fa";
// component for the search input field
export default function Search({input, setInput, width}) {
  return (
    <div className={`relative mt-3 w-full ${width}`}>
      <FaSearch className="ml-1 absolute left-2 top-1/2 transform -translate-y-1/2 text-red-700 text-xl" />
      <input
        type="text"
        placeholder="Search by name or ID..."
        className="block max-w-3xl w-full pl-10 pr-3 text-black py-3  border-red-600 border-2 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
