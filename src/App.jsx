import { useState, useEffect, useMemo } from "react";
import UsersList from "./components/UserList";
import Search from "./components/Search";
import { searchUsers } from "./api/github";
import SearchResult from "./components/SearchResult";
import UserFilter from "./components/UserFilter";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);
  const [filterText, setFilterText] = useState("");

  function handleSearch() {
    setQuery(searchQuery);
  }

  function onFilterChange(value) {
    setFilterText(value);
  }

  const filteredUsers = useMemo(() => {
    console.log("filtering users...");
    return usersData.filter((user) =>
      user.login.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [usersData, filterText]);

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();

    async function searchApi() {
      setUsersData([]);
      setError(null);

      setLoading(true);
      setHasSearched(true);

      try {
        const results = await searchUsers(query, controller.signal);
        console.log(results);
        setUsersData(results);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError("Something Went wrong");
      } finally {
        setLoading(false);
      }
    }

    searchApi();

    return () => {
      controller.abort();
    };
  }, [query]);

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        setUsersData={setUsersData}
      />
      <SearchResult searchQuery={searchQuery} />
      {usersData.length > 0 ? (
        <UserFilter filterText={filterText} onFilterChange={onFilterChange} />
      ) : (
        ""
      )}
      {!hasSearched ? (
        <p>Enter a search query to find users.</p>
      ) : error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : usersData.length === 0 ? (
        <p>No user found in here</p>
      ) : (
        <div>
          <p style={{ color: "blue" }}>Search Complete successfully</p>
          <p>{usersData.length} users Found</p>

          <UsersList users={filteredUsers} />
        </div>
      )}
    </>
  );
}

export default App;
