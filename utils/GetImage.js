import { defaultPoster, imagePath } from "../constants/Urls";
const getImage = (path) => {
  return path ? `${path}` : defaultPoster;
};

export default getImage;
