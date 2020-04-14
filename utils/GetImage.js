import { defaultPoster, imagePath } from "../constants/Urls";
const getImage = (path) => {
  return path ? `${imagePath}${path}` : defaultPoster;
};

export default getImage;
