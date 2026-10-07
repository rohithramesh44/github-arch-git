import { useState } from "react";
import UsersList from "./components/UserList";
import Search from "./components/Search";
import { users } from "./data/userData";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResult searchQuery={searchQuery} />
      {!hasSearched ? (
        <p>Enter a search query to find users.</p>
      ) : error ? (
        <p>{error}</p>
      ) : loading ? (
        <p>Loading...</p>
      ) : users.length === 0 ? (
        <p>No user found</p>
      ) : (
        <UsersList users={users} />
      )}
    </>
  );
}

export default App;
