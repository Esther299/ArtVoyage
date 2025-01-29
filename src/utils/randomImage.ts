const exhibition1Url = new URL('../assets/exhibition1.jpg', import.meta.url).href;
const exhibition2Url = new URL('../assets/exhibition2.jpg', import.meta.url).href;
const exhibition3Url = new URL('../assets/exhibition3.jpg', import.meta.url).href;
const exhibition4Url = new URL('../assets/exhibition4.jpg', import.meta.url).href;
const exhibition5Url = new URL('../assets/exhibition5.jpg', import.meta.url).href;
const exhibition6Url = new URL('../assets/exhibition6.webp', import.meta.url).href;
const exhibition7Url = new URL('../assets/exhibition7.webp', import.meta.url).href;
const exhibition8Url = new URL('../assets/exhibition8.jpg', import.meta.url).href;

/*import exhibition1 from "../assets/exhibition1.jpg";
import exhibition2 from "../assets/exhibition2.jpg";
import exhibition3 from "../assets/exhibition3.jpg";
import exhibition4 from "../assets/exhibition4.jpg";
import exhibition5 from "../assets/exhibition5.jpg";
import exhibition6 from "../assets/exhibition6.webp";
import exhibition7 from "../assets/exhibition7.webp";
import exhibition8 from "../assets/exhibition8.jpg";*/

const images = [
  exhibition1Url,
  exhibition2Url,
  exhibition3Url,
  exhibition4Url,
  exhibition5Url,
  exhibition6Url,
  exhibition7Url,
  exhibition8Url,
];

export const getRandomImage = (): string => {
  const randomIndex = Math.floor(Math.random() * images.length);
  return images[randomIndex]
};
