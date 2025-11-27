import type { RootState } from "../../../store/store";



export const selectQueryData = (state: RootState) => state.queryreducer.queryData;