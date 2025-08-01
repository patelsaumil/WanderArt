import fetch from "node-fetch";

const BASE_URL = "https://api.artic.edu/api/v1";

async function getArtworks() {
  const res = await fetch(`${BASE_URL}/artworks?page=1&limit=12&fields=id,title,artist_title,image_id,thumbnail`);
  const data = await res.json();

  const imageBase = data.config.iiif_url;

  return data.data.map(item => ({
    id: item.id,
    title: item.title || "Untitled",
    artist: item.artist_title || "Unknown",
    image: item.image_id
      ? `${imageBase}/${item.image_id}/full/843,/0/default.jpg`
      : (item.thumbnail?.lqip || "https://via.placeholder.com/300x400?text=No+Image")
  }));
}

export default { getArtworks };
