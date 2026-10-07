import { useState } from "react";
import UsersList from "./components/UserList";
import Search from "./components/Search";
import { searchUsers } from "./api/github";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [usersData, setUsersData] = useState([]);

  async function handleSearch() {
    setLoading(true);
    setHasSearched(true);
    try {
      const results = await searchUsers(searchQuery);
      setUsersData(results);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
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
