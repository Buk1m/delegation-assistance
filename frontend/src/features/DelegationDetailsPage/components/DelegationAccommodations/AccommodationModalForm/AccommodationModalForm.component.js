import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, reset } from "redux-form";

import Button from "../../../../../components/Button/Button.component";
import Input from "../../../../../components/Input/Input.component";
import { validateRequired, validateCheckInOutDate } from "../../../../../validators/Validators";

import styles from "./AccommodationModalForm.module.scss";

const AccommodationModalForm = props => {
  const { handleSubmit, initialize, invalid, pristine } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addAccommodationModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addAccommodationModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className={["modal-body", styles["modal-overflow-scroll"]].join(" ")}>
              <div className={["container-fluid", styles["modal-responsive"]].join(" ")}>
                <div className="row">
                  <div className="col">
                    <Input name="hotelsName" label="Hotel Name *" component="input" validate={[validateRequired]} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <Input
                      name="checkInDate"
                      label="Check in date *"
                      component="datepicker"
                      validate={[validateRequired]}
                      classes="w-auto"
                      timeIntervals={10}
                    />
                  </div>
                  <div className="col-lg-6">
                    <Input
                      name="checkOutDate"
                      label="Check out date *"
                      component="datepicker"
                      validate={[validateRequired, validateCheckInOutDate]}
                      classes="w-auto"
                      timeIntervals={10}
                    />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <Button
                  className="cancel"
                  data-dismiss="modal"
                  text="Cancel"
                  onClick={() => {
                    initialize();
                  }}
                />
                <Button
                  type="submit"
                  text="save"
                  data-dismiss={pristine || invalid ? "" : "modal"}
                  onClick={e => handleSubmit() && e}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Form>
  );
};

AccommodationModalForm.propTypes = {
  handleSubmit: func,
  initialize: func,
  invalid: bool,
  pristine: bool
};

export default reduxForm({
  form: "addAccommodationForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) => dispatch(reset("addAccommodationForm"))
})(AccommodationModalForm);
