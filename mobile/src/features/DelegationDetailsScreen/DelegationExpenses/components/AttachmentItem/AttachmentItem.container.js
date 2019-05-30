import React, { Component } from "react";
import { connect } from "react-redux";
import { func, string, number } from "prop-types";

import { openFile } from "../../../../../actions/delegationExpenseFile.actions";
import AttachmentItem from "./AttachmentItem.component";

class AttachmentItemContainer extends Component {
  static propTypes = {
    attachmentId: number,
    delegationId: number,
    expenseId: number,
    openFile: func,
    title: string,
    type: string
  };

  downloadAttachment = () => {
    this.props.openFile(this.props.delegationId, this.props.expenseId, this.props.attachmentId).then(response => {
      const blob = new Blob([response.data]);

      if (global.window === undefined) {
        global.window = global;
      }
      const link = URL.createObjectURL(blob);
      console.log(link);
    });
  };

  render() {
    return <AttachmentItem type={this.props.type} title={this.props.title} onDownload={this.downloadAttachment} />;
  }
}

const mapDispatchToProps = { openFile };

export default connect(
  null,
  mapDispatchToProps
)(AttachmentItemContainer);
