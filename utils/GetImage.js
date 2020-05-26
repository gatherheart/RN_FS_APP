import { defaultPoster, imagePath } from "../constants/Urls";
import * as MediaLibrary from "expo-media-library";
import * as Permissions from "expo-permissions";
import { Dimensions, Platform, Image } from "react-native";
import * as FileSystem from "expo-file-system";
import axios from "axios";
import { ALBUM_NAME } from "../constants/Systems";

// Save Local Image file:// uri into gallery
export const saveToLibrary = async (fileUri) => {
  const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    try {
      return await MediaLibrary.saveToLibraryAsync(fileUri);
    } catch (error) {
      console.log(error);
      return false;
    }
  }
};
export const downloadAsync = async (source) => {
  console.log(source.slice(((source.lastIndexOf(".") - 1) >>> 0) + 2));
  const extension = await getExtension(source);
  const randomName = Math.floor(Math.random() * 16777215).toString(16);

  const ret = await FileSystem.downloadAsync(
    source,
    `${FileSystem.cacheDirectory}temp-${randomName}.${extension}`
  )
    .then(({ uri }) => {
      // load the local image
      return uri;
    })
    .catch((e) => {
      console.log("Image loading error:", e);
      // if the online download fails, load the local version
      return "";
    });
  return ret;
};

// This method is for getting extension of a file which doesn't have file name & type uri
export const getExtension = async (source) => {
  let contentType = "";
  const ret = await axios
    .get(source)
    .then((response) => {
      contentType = response.headers["content-type"];
      return contentType.slice(contentType.lastIndexOf("/") + 1);
    })
    .catch((error) => {
      console.log(error);
      return contentType;
    });
  return ret;
};

export const resizeImage = (source) => {
  Image.getSize(
    uri,
    (width, height) => {
      // once we have the original image dimensions, set the state to the relative ones
      return [
        Dimensions.get("window").width,
        (height / width) * Dimensions.get("window").width,
      ];
    },
    (e) => {
      // As always include an error fallback
      console.log("getSize error:", e);
      return [0, 0];
    }
  );
};

const getImage = (path) => {
  return path ? `${path}` : defaultPoster;
};

export default getImage;
