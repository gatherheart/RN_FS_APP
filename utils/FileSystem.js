import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";
import * as MediaLibrary from "expo-media-library";
import * as Linking from "expo-linking";
import { Platform } from "react-native";
import * as Sharing from "expo-sharing";
import * as IntentLauncher from "expo-intent-launcher";

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
