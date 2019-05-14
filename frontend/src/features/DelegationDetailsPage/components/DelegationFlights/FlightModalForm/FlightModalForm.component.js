import React from "react";
import { bool, func } from "prop-types";
import { Form, reduxForm, reset } from "redux-form";

import Button from "../../../../../components/Button/Button.component";
import Input from "../../../../../components/Input/Input.component";
import { validateRequired, validateDepartureArrivalDate } from "../../../../../validators/Validators";

import styles from "./FlightModalForm.module.scss";

const FlightModalForm = props => {
  const { handleSubmit, initialize, invalid, pristine } = props;
  return (
    <Form onSubmit={handleSubmit}>
      <div
        className="modal fade"
        id="addFlightModal"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="addFlightModal"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content">
            <div className={["modal-body", styles["modal-overflow-scroll"]].join(" ")}>
              <div className={["container-fluid", styles["modal-responsive"]].join(" ")}>
                <div className="row">
                  <div className="col-8 col-lg-5">
                    <Input name="from" label="From location *" component="input" validate={[validateRequired]} />
                  </div>
                  <div className="col-lg-6 order-lg-2">
                    <Input
                      name="departureDate"
                      label="Departure date *"
                      component="datepicker"
                      validate={[validateRequired]}
                      classes="w-auto"
                      timeIntervals={5}
                    />
                  </div>
                  <div className="col-8 offset-lg-1 col-lg-5 order-lg-1">
                    <Input name="to" label="To location *" component="input" validate={[validateRequired]} />
                  </div>
                  <div className="col-lg-6 order-lg-3">
                    <Input
                      name="arrivalDate"
                      label="Arrival date *"
                      component="datepicker"
                      validate={[validateRequired, validateDepartureArrivalDate]}
                      classes="w-auto"
                      timeIntervals={5}
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

FlightModalForm.propTypes = {
  handleSubmit: func,
  initialize: func,
  invalid: bool,
  pristine: bool
};

export default reduxForm({
  form: "addFlightForm",
  enableReinitialize: true,
  onSubmitSuccess: (result, dispatch) => dispatch(reset("addFlightForm"))
})(FlightModalForm);
