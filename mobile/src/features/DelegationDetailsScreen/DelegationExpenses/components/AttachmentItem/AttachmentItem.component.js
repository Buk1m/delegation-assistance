import React from "react";
import { View, Text } from "react-native";
import { func, string } from "prop-types";

import Button from "../../../../../components/Button/Button.component";
import PlatformIcon from "../../../../../components/PlatformIcon/PlatformIcon.component";
import { Icon } from "expo";

import styles from "./AttachmentItem.module.scss";
import colors from "../../../../../assets/styles/_colorPalette.scss";

const getFileTypeIconName = (type = "file") => {
  switch (type.toLowerCase()) {
    case "jpg":
    case "jpeg":
    case "png":
      return "file-image";
    case "pdf":
      return "file-pdf";
    case "docx":
    case "odt":
      return "file-word";
    case "xlsx":
    case "ods":
      return "file-excel";
    default:
      return "file";
  }
};

const fileTypeIconSize = 35;
const downloadIconSize = 26;

const AttachmentItem = props => {
  const { type, title, onDownload } = props;
  return (
    <View style={styles.attachment}>
      <Icon.MaterialCommunityIcons
        name={getFileTypeIconName(type)}
        size={fileTypeIconSize}
        color={colors.primaryTextColor}
      />
      <Text style={styles.title}>{title}</Text>
      <Button
        style={styles.downloadButton}
        icon={<PlatformIcon name="download" size={downloadIconSize} color={colors.primaryTextColor} />}
        iconStyle={styles.icon}
        onPress={onDownload}
      />
    </View>
  );
};

AttachmentItem.propTypes = {
  onDownload: func,
  title: string,
  type: string
};

export default AttachmentItem;
