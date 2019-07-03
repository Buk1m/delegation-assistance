import { Alert, PermissionsAndroid } from "react-native";
import RNFetchBlob from "rn-fetch-blob";

import { APIService } from "../services/data";
import { isAndroid, isIos } from "../helpers/platform";

const openFile = (delegationId, expenseId, fileId, title, token) => async dispatch => {
  const baseUrl = APIService.baseURL;
  const url = `${baseUrl}/delegations/${delegationId}/expenses/${expenseId}/files/${fileId}`;
  const headers = { Authorization: `Bearer ${token}` };
  if (isAndroid() && !((await requestExternalStoragePermission()) === PermissionsAndroid.RESULTS.GRANTED)) {
    return;
  }

  const { config, fs } = RNFetchBlob;
  const options = {
    fileCache: true,
    addAndroidDownloads: {
      useDownloadManager: true,
      notification: true,
      path: fs.dirs.PictureDir + "/" + title
    },
    path: fs.dirs.DocumentDir + "/" + title
  };
  config(options)
    .fetch("GET", url, headers)
    .then(res => {
      if (isIos()) {
        Alert.alert("File downloaded successfully");
      }
    });
};

const requestExternalStoragePermission = async () => {
  try {
    return await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
      title: "Write external storage permission",
      message: "This app needs access to your external storage",
      buttonNegative: "Cancel",
      buttonPositive: "OK"
    });
  } catch (err) {
    Alert.alert("Oopsie doopsie, something went wrong :<");
  }
};

export { openFile };
