import { useState, useEffect } from "react";
import { searchUsers as fetchUsers } from "../api/github";

function useGithubSearch() {
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);

  function searchUsers(searchQuery) {
    const trimmedQuery = searchQuery.trim();

    if (!trimmedQuery) return;

    setQuery(trimmedQuery);
    setHasSearched(true);
  }

  function clearUsers() {
    setQuery("");
    setUsers([]);
    setError(null);
    setLoading(false);
    setHasSearched(false);
  }

  useEffect(() => {
    if (!query) return;
    const controller = new AbortController();
    async function searchApi() {
      setUsers([]);
      setError(null);
      setLoading(true);

      try {
        const results = await fetchUsers(query, controller.signal);
        setUsers(results);
      } catch (e) {
        if (e.name === "AbortError") return;
        setError("Somthing Went Wrong!!");
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }
    searchApi();
    return () => {
      controller.abort();
    };
  }, [query]);

  return { users, loading, error, hasSearched, searchUsers, clearUsers };
}

export default useGithubSearch;
