import { Text, View } from "react-native";
import React from "react";

import styles from "./DatePickerRendererStyles.module.scss";
import inactiveStyle from "./InactiveStyles.module.scss"
import activeStyle from "./ActiveStyles.module.scss"
import DatePicker from "react-native-datepicker";

const renderDateTimePicker = ({meta: {touched, error}, input: {onChange, value}}) => {
    return (
        <View>
            <DatePicker
                date={!value ? new Date() : new Date(value)}
                onDateChange={onChange}
                style={styles.datePicker}
                customStyles={value ? {...activeStyle} : {...inactiveStyle}}
            />
            {touched && (error && <Text style={styles.validationField}>{error}</Text>)}
        </View>
    );
};

export default renderDateTimePicker;
