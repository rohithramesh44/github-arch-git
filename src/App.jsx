import { useState, useEffect, useMemo } from "react";
import useGithubSearch from "./hooks/useGithubSearch";
import { searchUsers } from "./api/github";

import UsersList from "./components/UserList";
import Search from "./components/Search";
import SearchResult from "./components/SearchResult";
import UserFilter from "./components/UserFilter";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterText, setFilterText] = useState("");

  const { users, loading, error, hasSearched, searchUsers, clearUsers } =
    useGithubSearch();

  function handleSearch() {
    searchUsers(searchQuery);
  }

  function onFilterChange(value) {
    setFilterText(value);
  }

  const filteredUsers = useMemo(() => {
    return users.filter((user) =>
      user.login.toLowerCase().includes(filterText.toLowerCase()),
    );
  }, [users, filterText]);

  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={handleSearch}
        clearUsers={clearUsers}
      />
      <SearchResult searchQuery={searchQuery} />
      {users.length > 0 ? (
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
      ) : users.length === 0 ? (
        <p>No user found in here</p>
      ) : (
        <div>
          <p style={{ color: "blue" }}>Search Complete successfully</p>
          <p>{users.length} users Found</p>

          <UsersList users={filteredUsers} />
        </div>
      )}
    </>
  );
}

export default App;
