import { FaSearch } from "react-icons/fa";

export default function Search({ input, setInput }) {
  return (
    <div className="relative mt-3 md:w-[600px]">
      <FaSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-900 text-xl" />
      <input
        type="text"
        placeholder="Search by name or ID..."
        className="block max-w-3xl w-full pl-10 pr-3 text-black py-3 border border-transparent rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-red-600 sm:text-sm"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
    </div>
  );
}
