import React, { Component } from "react";
import { connect } from "react-redux";
import { func, string, number } from "prop-types";

import { openFile } from "../../../../../actions/delegationExpenseFile.actions";
import { getToken } from "../../../../../selectors/user.selectors";
import AttachmentItem from "./AttachmentItem.component";

class AttachmentItemContainer extends Component {
  static propTypes = {
    attachmentId: number,
    delegationId: number,
    expenseId: number,
    openFile: func,
    title: string,
    token: string,
    type: string
  };

  downloadAttachment = () => {
    this.props.openFile(
      this.props.delegationId,
      this.props.expenseId,
      this.props.attachmentId,
      this.props.title,
      this.props.token
    );
  };

  render() {
    return <AttachmentItem type={this.props.type} title={this.props.title} onDownload={this.downloadAttachment} />;
  }
}

const mapDispatchToProps = { openFile };

const mapStateToProps = state => {
  return {
    token: getToken(state)
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttachmentItemContainer);
