import React from "react";
import { array, bool, func, number } from "prop-types";
import { Form, reduxForm } from "redux-form";
import { Link } from "react-router-dom";

import LayoutMain from "../../components/layouts/LayoutMain";
import Input from "../../components/Input/Input.component";
import countryNotFoundImage from "../../assets/images/countryNotFound.png";
import getFlag from "../../config/flags";

export const ChecklistsPage = ({ countries, fetching, countriesLength, handleSubmit, handleSearch }) => {
  return (
    <LayoutMain title="All checklists">
      <div className="checklist-wrapper">
        <div className="checklist-search">
          <Form onSubmit={handleSubmit}>
            <Input name="search" onChange={(e, val) => handleSearch(val)} placeholder="Search country..." />
          </Form>
        </div>
        <hr />
        {fetching ? (
          <span>Loading available countries...</span>
        ) : countriesLength ? (
          <div className="checklist-countries">
            {countries.map(country => (
              <Link
                to={`/checklist/${country.countryCode}`}
                key={country.id}
                className="checklist-country"
                title={country.countryName}
              >
                <img
                  src={getFlag(country.countryCode)}
                  alt={country.countryName}
                  height={20}
                  className="checklist-country-flag"
                />
                {country.countryName}
              </Link>
            ))}
          </div>
        ) : (
          <div className="checklist-empty">
            <img src={countryNotFoundImage} alt="Country not found" className="mt-5 mb-3 img-fluid" height="400" />
          </div>
        )}
      </div>
    </LayoutMain>
  );
};

ChecklistsPage.propTypes = {
  countries: array,
  countriesLength: number,
  fetching: bool,
  handleSearch: func,
  handleSubmit: func
};

export default reduxForm({
  form: "checklistSearch"
})(ChecklistsPage);
