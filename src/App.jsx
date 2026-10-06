import { useState } from "react";
import UsersList from "./components/UserList";
import Search from "./components/Search";
import { users } from "./data/userData";
import SearchResult from "./components/SearchResult";

function App() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <SearchResult searchQuery={searchQuery} />
      <UsersList users={users} />
    </>
  );
}

export default App;
