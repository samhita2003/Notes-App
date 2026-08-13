import { FaSearch } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

function SearchBar({ onClick, value, onChange }) {

  return (
    <div className="flex items-center gap-2 bg-gray-300 border border-gray-200 rounded-sm p-2 w-full sm:w-auto sm:min-w-[250px] md:min-w-[300px]">

      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Search"
        className="outline-none bg-transparent w-full min-w-0"
      />

      {value && (
        <IoMdClose
          className="cursor-pointer shrink-0"
          onClick={onClick}
        />
      )}

      <FaSearch className="shrink-0" />

    </div>
  );
}

export default SearchBar;