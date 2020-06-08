import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as ImagePicker from "expo-image-picker";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";
import { UPLOAD_SERVER } from "../constants/Urls";
import { useState } from "react";
import axios from "axios";

export const downloadFile = async () => {
  let remoteUrl = "http://www.soundczech.cz/temp/lorem-ipsum.pdf";
  let localPath = `${FileSystem.cacheDirectory}lorem-ipsum.pdf`;
  let url;

  await FileSystem.downloadAsync(remoteUrl, localPath).then(async ({ uri }) => {
    const ret = await FileSystem.getInfoAsync(uri, { size: true });

    if (Platform.OS === "android") {
      console.log(Platform.OS);
      await FileSystem.getContentUriAsync(uri).then((cUri) => {
        console.log(cUri);
        IntentLauncher.startActivityAsync("android.intent.action.VIEW", {
          data: cUri,
          flags: 1,
        });
      });
    } else if (Platform.OS === "ios") {
      console.log(Platform.OS);

      Sharing.shareAsync(uri);
    }
    console.log("RET", asset);
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

export const _pickImage = async () => {
  const { status: cameraRollPerm } = await Permissions.askAsync(
    Permissions.CAMERA_ROLL
  );

  // only if user allows permission to camera roll
  if (cameraRollPerm === "granted") {
    let pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      allowsEditing: false,
      aspect: [4, 3],
      base64: true,
    });

    _handleImagePicked(pickerResult);
  }
};

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

export const _handleImagePicked = async (pickerResult) => {
  let uploadResponse, uploadResult;
  try {
    //setUploading(true);
    const _format = pickerResult.uri.split(".").pop();
    const _name = pickerResult.uri.split("/").pop();
    pickerResult.format = _format;
    pickerResult.name = _name;
    console.log(_format, _name);
    if (!pickerResult.cancelled) {
      let imageUri = pickerResult
        ? `data:image/${_format};base64,${pickerResult.base64}`
        : null;

      uploadResponse = await _uploadImageAsync(pickerResult);
      //setImage(uploadResponse.location);
    }
  } catch (e) {
    console.log(e);

    alert("Upload failed, sorry :(");
  } finally {
    //setUploading(false);
  }
};

export const _uploadImageAsync = async (photo) => {
  const formData = new FormData();
  console.log(photo.uri);
  formData.append("file", {
    name: photo.name,
    type: photo.format,
    uri: photo.uri,
  });
  try {
    const { data } = await axios.post(UPLOAD_SERVER, formData, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    console.log(data);
    return data;
  } catch (e) {
    console.log(e);
    alert("Cant upload", "Try later");
  }
};
