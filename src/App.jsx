import { useState, useEffect } from "react";
import UsersList from "./components/UserList";
import Search from "./components/Search";
import { searchUsers } from "./api/github";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [query, setQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);

  function handleSearch() {
    setQuery(searchQuery);
  }

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
      {!hasSearched ? (
        <p>Enter a search query to find users.</p>
      ) : error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : usersData.length === 0 ? (
        <p>No user found in here</p>
      ) : (
        <UsersList users={usersData} />
      )}
    </>
  );
}

export default App;
