import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

import localStyles from "./FileListStyles.module.scss";

const FileItemComponent = ({ children, deleteFile }) => {
  return (
    <View style={localStyles["list-container"]}>
      <Text numberOfLines={1} ellipsizeMode="head" style={localStyles.input}>
        {children}
      </Text>
      <TouchableOpacity onPress={deleteFile} style={localStyles.trash}>
        <Text>
          <Ionicons style={localStyles.trash} name="ios-trash" size={26} />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default FileItemComponent;
