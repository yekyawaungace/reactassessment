export const getFavoritesAPI = async () => {
  const response = await fetch('http://localhost:9090/api/favorite');
  if (!response.ok) throw new Error('Failed to fetch favorites');
  return await response.json();
};

export const saveFavoriteAPI = async (place) => {
  await fetch('http://localhost:9090/api/favorite', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(place),
  });
};

export const deleteFavoriteAPI = async (id) => {
  await fetch(`http://localhost:9090/api/favorite/${id}`, {
    method: 'DELETE',
  });
};