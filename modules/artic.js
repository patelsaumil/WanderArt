// modules/artic.js
import fetch from "node-fetch";

const BASE_URL = "https://api.artic.edu/api/v1";

async function getArtworks() {
  const res = await fetch(`${BASE_URL}/artworks?page=1&limit=6`);
  const data = await res.json();

  const imageBase = data.config.iiif_url;

  return data.data.map(item => ({
    title: item.title || "Untitled",
    artist: item.artist_title || "Unknown",
    image: item.image_id
      ? `${imageBase}/${item.image_id}/full/843,/0/default.jpg`
      : "https://via.placeholder.com/300x400?text=No+Image"
  }));
}

export default { getArtworks };
