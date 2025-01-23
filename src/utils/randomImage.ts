import exhibition1 from "../assets/exhibition1.jpg";
import exhibition2 from "../assets/exhibition2.jpg";
import exhibition3 from "../assets/exhibition3.jpg";
import exhibition4 from "../assets/exhibition4.jpg";
import exhibition5 from "../assets/exhibition5.jpg";
import exhibition6 from "../assets/exhibition6.webp";
import exhibition7 from "../assets/exhibition7.webp";
import exhibition8 from "../assets/exhibition8.jpg";

const images = [
  exhibition1,
  exhibition2,
  exhibition3,
  exhibition4,
  exhibition5,
  exhibition6,
  exhibition7,
  exhibition8,
];

export const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex];
};
