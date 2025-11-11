import {type RootState } from "../../store/store"; 

export const selectContactForm = (state: RootState) => state.query.form;
export const selectQueryLoading = (state: RootState) => state.query.loading;
export const selectQuerySuccess = (state: RootState) => state.query.success;
export const selectQueryError = (state: RootState) => state.query.error;
