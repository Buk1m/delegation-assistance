import get from "lodash/get";

const getAccommodations = state => get(state, "accommodations.accommodations", []);
const getAccommodationsFetching = state => get(state, "accommodations.fetching", false);
const getAccommodationsAdding = state => get(state, "accommodations.addingAccommodation", false);
const getAccommodationsSortOrder = state => get(state, "accommodations.sortOrder", "asc");

export { getAccommodations, getAccommodationsAdding, getAccommodationsFetching, getAccommodationsSortOrder };
