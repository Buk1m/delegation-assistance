import React from "react";
import { View, Text, FlatList } from "react-native";
import { bool, func, number, object } from "prop-types";
import Collapsible from "react-native-collapsible";

import AttachmentItem from "../AttachmentItem";
import AttachmentsButton from "../AttachmentsButton/AttachmentsButton.component";
import PaymentIcon from "../PaymentIcon/PaymentIcon.component";
import { extractKey } from "../../../../../helpers/extractors";

import styles from "./DelegationExpense.module.scss";

const isAttachmentsButtonDisabled = files => {
  return files.length === 0;
};

const renderAttachment = (delegationId, expenseId, attachment, navigate) => {
  const getFileExtension = fileName => {
    return fileName.split(".").pop();
  };

  return (
    <AttachmentItem
      navigate={navigate}
      type={getFileExtension(attachment.item.filename)}
      title={attachment.item.filename}
      delegationId={delegationId}
      expenseId={expenseId}
      attachmentId={attachment.item.id}
    />
  );
};

const DelegationExpense = props => {
  const { expense, delegationId, isCollapsed, action, navigate } = props;
  const { expenseDate, expenseCurrency, expenseName, expenseValue, id, files, paymentType } = expense;

  return (
    <View style={styles.expenseContainer}>
      <View style={styles.expense}>
        <PaymentIcon style={styles.paymentIcon} paymentType={paymentType} />
        <View style={styles.expenseTitleAndDate}>
          <Text style={styles.expenseTitle}>{expenseName}</Text>
          <Text style={styles.expenseDate}>{expenseDate}</Text>
        </View>
        <View style={styles.expensePriceAndFilesCount}>
          <Text style={styles.expensePrice}>
            {expenseValue.toFixed(2)}
            {expenseCurrency}
          </Text>
          <Text style={styles.expenseFilesCount}>{files.length} files attached</Text>
        </View>
        <AttachmentsButton
          style={styles.attachmentsButton}
          disabled={isAttachmentsButtonDisabled(files)}
          isCollapsed={isCollapsed}
          action={action}
        />
      </View>
      <Collapsible style={styles.collapsible} collapsed={!isCollapsed}>
        <FlatList
          data={files}
          keyExtractor={extractKey}
          renderItem={attachment => renderAttachment(delegationId, id, attachment, navigate)}
        />
      </Collapsible>
    </View>
  );
};

DelegationExpense.propTypes = {
  action: func,
  delegationId: number,
  expense: object,
  isCollapsed: bool
};

export default DelegationExpense;
