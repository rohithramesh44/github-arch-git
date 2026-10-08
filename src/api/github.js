export async function searchUsers(query, signal) {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`,
    { signal },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Users");
  }
  const data = await response.json();

  return data.items;
}
