import React from "react";
import { func, object, oneOfType, array } from "prop-types";
import Icon from "react-icons-kit";
import { ic_delete } from "react-icons-kit/md/ic_delete";

import styles from "./CardTask.module.scss";

const CardTask = props => {
  const { handleDelete, children } = props;
  return (
    <div className={styles["card"]}>
      <div className={styles["card-content"]}>
        <button className={styles["card-delete"]} onClick={handleDelete} type="button">
          <Icon icon={ic_delete} className={styles["card-delete-icon"]} size={24} />
        </button>
        {children}
      </div>
    </div>
  );
};

CardTask.propTypes = {
  children: oneOfType([object, array]).isRequired,
  handleDelete: func.isRequired
};

export default CardTask;
