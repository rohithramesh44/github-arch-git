import { CircleX } from "lucide-react";

function Search({ searchQuery, setSearchQuery, onSearch, setUsersData }) {
  return (
    <div>
      <h1>current query: {searchQuery}</h1>
      <div className="flex justify-center my-6">
        <div className="w-1/3 flex border border-gray-200  ">
          <input
            type="text"
            placeholder="Search Users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 focus:outline-none rounded-md "
          />
          <div className="flex items-center justify-center p-2 ronunded-md cursor-pointer">
            <CircleX
              className="text-gray-300 hover:text-gray-500"
              onClick={() => {
                setSearchQuery("");
                setUsersData([]);
              }}
            />
          </div>
          <button
            className="p-2 bg-green-500 text-white capitalize hover:bg-green-600 cursor-pointer"
            onClick={onSearch}
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

export default Search;
