import { Artwork } from "../types/types";

export interface SortDirection {
  [key: string]: "asc" | "desc";
}

const parseDate = (date: string) => {
  const dateParts = date.split("-");
  const startYear = parseInt(dateParts[0], 10);
  return isNaN(startYear) ? 0 : startYear;
};


export const sortArtworks = (
  artworks: Artwork[],
  sortOption: string,
  sortDirection: SortDirection
) => {
  return [...artworks].sort((a, b) => {
    if (sortOption === "artist") {
      const artistA = a.artist_title || "";
      const artistB = b.artist_title || "";
      return sortDirection.artist === "asc"
        ? artistA.localeCompare(artistB)
        : artistB.localeCompare(artistA);
    } else if (sortOption === "title") {
      const titleA = a.title || "";
      const titleB = b.title || "";
      return sortDirection.title === "asc"
        ? titleA.localeCompare(titleB)
        : titleB.localeCompare(titleA);
    } else if (sortOption === "date") {
      const dateA = parseDate(a.date);
      const dateB = parseDate(b.date);
      return sortDirection.date === "asc" ? dateA - dateB : dateB - dateA;
    }
    return 0;
  });
};
