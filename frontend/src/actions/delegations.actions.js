import {APIService} from "../services/data";

export const ACTIONS = {
  POST_DELEGATION: "DELEGATIONS_POST_DELEGATION"
};

const addNewDelegation = (delegation) => dispatch => {
  delegation.startDate = delegation.startDate.toISOString();
  delegation.endDate = delegation.endDate.toISOString();
  return dispatch(
    APIService.post(ACTIONS.POST_DELEGATION, {
      url: '/delegations',
      //TODO: add authorization token from sessionStorage(?)
      headers: {
        "Content-type": "application/json",
        "Bearer": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJlbXBsb3llZSIsIm5iZiI6MTU1Mjg1Njg4NSwiaXNzIjoiaWRlbWlhIiwiZXhwIjoxNTUyODYwNDg1LCJpYXQiOjE1NTI4NTY4ODUsImF1dGhvcml0aWVzIjpbIlJPTEVfRU1QTE9ZRUUiXX0.PINY8fxa2TKFut7UBf-S08eKCZ7Yo2FolyU6AjwqpfzK3mSRIvlEHJUgejTq86lImFDhm_J5lb34KQbIhaHaEA"
      },
      needAuth: false,
      data: delegation
    })
  );
};

export {
  addNewDelegation
};
