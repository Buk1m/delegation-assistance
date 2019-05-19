import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import FileItem from "./FileItem.component";

import localStyles from "./FileListStyles.module.scss";
import colors from "../../../assets/styles/_colorPalette.scss";

const FileListComponent = ({ getImageFromCameraRoll, getImageFromCamera, getFile, deleteFile, attachments }) => {
  return (
    <View>
      <View style={localStyles.container}>
        <TouchableOpacity onPress={getImageFromCameraRoll}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-images" size={32} color={colors.primaryTextColor} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getImageFromCamera}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-camera" size={38} color={colors.primaryTextColor} />
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={getFile}>
          <Text style={localStyles.button}>
            <Ionicons name="ios-folder" size={32} color={colors.primaryTextColor} />
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
