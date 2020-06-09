import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import { UPLOAD_SERVER } from "../constants/Urls";
import axios from "axios";

export const downloadFile = async () => {
  let remoteUrl = "http://www.soundczech.cz/temp/lorem-ipsum.pdf";
  let localPath = `${FileSystem.cacheDirectory}lorem-ipsum.pdf`;
  let url;

  await FileSystem.downloadAsync(remoteUrl, localPath).then(async ({ uri }) => {
    const ret = await FileSystem.getInfoAsync(uri, { size: true });

    if (Platform.OS === "android") {
      await FileSystem.getContentUriAsync(uri).then((cUri) => {
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      });
    } else if (Platform.OS === "ios") {
      Sharing.shareAsync(uri);
    }
  });

  //await Linking.openURL(`${FileSystem.documentDirectory}`);

  /*
  
const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  if (status === "granted") {
    const file = await FileSystem.downloadAsync(
      "http://gahp.net/wp-content/uploads/2017/09/sample.pdf",
      FileSystem.cacheDirectory + "small.pdf"
    )
      .then(async ({ uri }) => {
        console.log("Finished downloading to ", uri);
        await Linking.openURL(uri);
      })
      .catch((error) => {
        console.error(error);
      });
  }*/
};

export const _pickDocument = async () => {
  let pickerResult;
  try {
    pickerResult = await DocumentPicker.getDocumentAsync({});
  } catch (e) {
    console.log(e);
    return;
  }
  if (pickerResult.type === "cancel") return null;

  const _format = pickerResult.uri.split(".").pop();
  const _name = pickerResult.uri.split("/").pop();
  pickerResult.format = _format;
  pickerResult.name = _name;
  await _uploadDocumentAsync([pickerResult, pickerResult]);

  return pickerResult;
  //_uploadDocumentAsync(pickerResult);
};

// Using ImagePicker instead of loading all images
export const _pickImage = async () => {
  const { status: cameraRollPerm } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );
  let pickerResult;
  // only if user allows permission to camera roll
  if (cameraRollPerm === "granted") {
    try {
      pickerResult = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        quality: 1,
        allowsEditing: false,
        aspect: [4, 3],
      });
    } catch (e) {
      console.log(e);
    }
    if (pickerResult.cancelled === true) return null;

    const _format = pickerResult.uri.split(".").pop();
    const _name = pickerResult.uri.split("/").pop();
    pickerResult.format = _format;
    pickerResult.name = _name;
    await _uploadImageAsync([pickerResult, pickerResult]);
    return pickerResult;
    //_handleImagePicked(pickerResult);
  }
};

const _handleImagePicked = async (pickerResult) => {
  try {
    uploadResponse = await _uploadImageAsync(pickerResult);
  } catch (e) {
    console.log(e);
    alert("Upload failed, sorry :(");
  } finally {
  }
};

// Get all photos for re-rendering ImagePicker
export const getPhotos = async () => {
  const { status: cameraRollPerm } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );

  // only if user allows permission to camera roll
  if (cameraRollPerm === "granted") {
    try {
      const { assets } = await MediaLibrary.getAssetsAsync();
      const [firstPhoto] = assets;
      console.log(assets);
    } catch (e) {
      console.log(e);
    } finally {
      //setLoading(false);
    }
  }

  //_handleImagePicked(pickerResult);
};

export const _uploadDocumentAsync = async (documents) => {
  if (!Array.isArray(documents)) return;

  const formData = new FormData();
  for (let i = 0; i < documents.length; i++) {
    formData.append("file", {
      name: documents[i].name,
      type: "application/" + documents[i].format,
      uri: documents[i].uri,
    });
  }

  try {
    const { data } = await axios.post(UPLOAD_SERVER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    alert("Cant upload", "Try later");
  }
};

/** FormData needs name, type, uri */
export const _uploadImageAsync = async (photos) => {
  if (!Array.isArray(photos)) return;

  const formData = new FormData();
  console.log("READ", photos);
  for (let i = 0; i < photos.length; i++) {
    formData.append("file", {
      name: photos[i].name,
      type: photos[i].type + "/" + photos[i].format,
      uri: photos[i].uri,
    });
  }

  try {
    const { data } = await axios.post(UPLOAD_SERVER, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log("RETURN", data);
    return data;
  } catch (e) {
    console.log(e);
    alert("Cant upload", "Try later");
  }
};
