import React from "react";
import { sortableElement, sortableHandle } from "react-sortable-hoc";
import { ic_drag_handle, ic_mode_edit, ic_delete_forever } from "react-icons-kit/md";
import Icon from "react-icons-kit";

const DragHandle = sortableHandle(() => (
  <div className="chgt-drag-handle">
    <Icon icon={ic_drag_handle} size={24} />{" "}
  </div>
));

const SortableItem = sortableElement(({ index, item, isInEditMode, handleUpdateModal, handleDeleteTask }) => (
  <li className="chgt-list-item">
    {isInEditMode ? (
      <div className="d-flex justify-content-between">
        <DragHandle />
        <h3 className="chgt-title">{item.task}</h3>
        <div className="d-flex">
          <span
            onClick={() => handleUpdateModal(index)}
            className="chgt-edit"
            data-toggle="modal"
            data-target="#checklistModal"
          >
            <Icon icon={ic_mode_edit} size={24} />
          </span>
          <span onClick={() => handleDeleteTask(index)} className="chgt-delete">
            <Icon icon={ic_delete_forever} size={24} />
          </span>
        </div>
      </div>
    ) : (
      <h3 className="chgt-title">{item.task}</h3>
    )}
    {item.description}
  </li>
));

export default SortableItem;
