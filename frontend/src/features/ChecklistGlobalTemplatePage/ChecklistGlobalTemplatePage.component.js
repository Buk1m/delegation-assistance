import React, { Fragment } from "react";
import { array, bool, func, object } from "prop-types";

import LayoutMain from "../../components/layouts/LayoutMain";
import Button from "../../components/Button/Button.component";
import TaskModalForm from "./components/TaskModalForm";
import SortableContainer from "./components/SortableContainer/SortableContainer.component";
import SortableItem from "./components/SortableItem/SortableItem.component";

const ChecklistGlobalTemplatePage = props => {
  const {
    onSortEnd,
    changeMode,
    cancelEdit,
    handleUpdateModal,
    handleDeleteTask,
    itemForModal = null,
    isInEditMode = false,
    isFetching = false,
    globalTemplateItems = []
  } = props;
  return (
    <LayoutMain
      title="Checklist template"
      buttons={
        <Fragment>
          {isInEditMode ? (
            <>
              <Button text="cancel" className="warning" onClick={cancelEdit} submitting={isFetching} />
              <Button
                type="button"
                className="add"
                data-toggle="modal"
                data-target="#checklistModal"
                text="Add task"
                onClick={() => handleUpdateModal(-1)}
              />
            </>
          ) : null}
          <Button
            text={isInEditMode ? "save" : "edit"}
            onClick={changeMode}
            submitting={isFetching}
            disabled={isFetching}
          />
        </Fragment>
      }
    >
      <div>
        <SortableContainer onSortEnd={onSortEnd} useDragHandle lockAxis="y" lockToContainerEdges>
          {globalTemplateItems.map((item, index) => (
            <SortableItem
              key={`item-${index}`}
              index={index}
              item={item}
              isInEditMode={isInEditMode}
              handleUpdateModal={handleUpdateModal}
              handleDeleteTask={handleDeleteTask}
            />
          ))}
        </SortableContainer>
        {isInEditMode ? <TaskModalForm initialValues={itemForModal} /> : null}
      </div>
    </LayoutMain>
  );
};

ChecklistGlobalTemplatePage.propTypes = {
  cancelEdit: func,
  changeMode: func,
  globalTemplateItems: array,
  handleDeleteTask: func,
  handleUpdateModal: func,
  isFetching: bool,
  isInEditMode: bool,
  itemForModal: object,
  onSortEnd: func.isRequired
};

export default ChecklistGlobalTemplatePage;
