import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FileItem from "./FileItem.component";
import localStyles from "./FileListStyles.module.scss";

const FileListComponent = ({
  getImageFromCameraRoll,
  getImageFromCamera,
  getFile,
  deleteFile,
  attachments
}) => {
  return (
    <View>
      <View style={localStyles.container}>
        <TouchableOpacity onPress={getImageFromCameraRoll}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-images" size={32} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getImageFromCamera}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-camera" size={38} color="white" />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getFile}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-folder" size={32} color="white" />
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {attachments.map((fileObject, i) => {
          return (
            <FileItem key={i} deleteFile={deleteFile}>
              {" "}
              {fileObject.fileName}{" "}
            </FileItem>
          );
        })}
      </View>
    </View>
  );
};

export default FileListComponent;
