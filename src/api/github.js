export async function searchUsers(query) {
  const response = await fetch(
    `https://api.github.com/search/users?q=${encodeURIComponent(query)}`,
  );

  if (!response.ok) {
    throw new Error("Failed to fetch Users");
  }
  const data = await response.json();

  return data.items;
}
