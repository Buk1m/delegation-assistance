import React, { Fragment } from "react";
import { array, object, oneOfType } from "prop-types";

import CardTask from "../../CardTask/CardTask.component";
import Input from "../../Input/Input.component";
import Textarea from "../../Textarea/Textarea.component";
import { validateRequired } from "../../../validators/Validators";

const RenderTasks = ({ fields }) => (
  <Fragment>
    {fields.map((task, index) => (
      <CardTask
        key={index}
        handleDelete={() =>
          fields.remove(index) & (fields.length !== 1 ? null : fields.push({ task: "", description: "" }))
        }
      >
        <Input name={`${task}.task`} label="Task name" validate={validateRequired} />
        <Textarea name={`${task}.description`} label="Task description" validate={validateRequired} />
      </CardTask>
    ))}
  </Fragment>
);

RenderTasks.propTypes = {
  fields: oneOfType([object, array])
};

export default RenderTasks;
