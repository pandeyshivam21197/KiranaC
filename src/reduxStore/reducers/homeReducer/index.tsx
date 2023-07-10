import { IReducerAction } from "../../../common/interfaces";
import { IHeadinesById, IHomeScreenState } from "./interfaces";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: IHomeScreenState = {
  pinnedHeadlineIds: [], //by id reducer
  displayedHealineIds: [],
  headinesById: {},
};

export const homeReducerSlice = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setHeadlinesById: (state, action: IReducerAction<IHeadinesById>) => {
      state.headinesById = {
        ...state.headinesById,
        ...action.payload,
      };
    },
    setDisplayedHeadlineIds: (state, action: IReducerAction<number[]>) => {
      if (!action.payload) {
        return state;
      }

      const updatedHeadlinesByIds = { ...state.headinesById };

      if (Object.keys(state.headinesById).length) {
        //remove displayed headlines
        action.payload.forEach((id: number) => {
          if (updatedHeadlinesByIds[id]) {
            delete updatedHeadlinesByIds[id];
          }
        });
      }

      //set new set of displayed headlines
      state.displayedHealineIds = action.payload as number[];
    },
    addHeadlineToPinnned: (state, action: IReducerAction<number>) => {
      //remove from by id headlines and
      //add headline id to pinned at top of []

      if (!action.payload) {
        return state;
      }

      const updatedDisplayedIds = state.displayedHealineIds.filter(
        (id) => id !== action.payload
      );

      const updatedPinnedHeadlineIds = [...state.pinnedHeadlineIds];
      updatedPinnedHeadlineIds.unshift(action.payload as number);

      state.pinnedHeadlineIds = updatedPinnedHeadlineIds;
      state.displayedHealineIds = updatedDisplayedIds;

      return state;
    },
    deleteHeadline: (state, action: IReducerAction<number>) => {
      const updatedHeadlinesById = { ...state.headinesById };

      if (!action.payload) {
        return state;
      }

      let updatedDisplayedIds = state.displayedHealineIds;
      let updatedPinnedIds = state.pinnedHeadlineIds;

      if (state.displayedHealineIds.includes(action.payload)) {
        updatedDisplayedIds = state.displayedHealineIds.filter(
          (id) => id !== action.payload
        );
      }

      if (state.pinnedHeadlineIds.includes(action.payload)) {
        updatedPinnedIds = state.pinnedHeadlineIds.filter(
          (id) => id !== action.payload
        );
      }

      delete updatedHeadlinesById[action.payload as number];

      state.headinesById = updatedHeadlinesById;
      state.displayedHealineIds = updatedDisplayedIds;
      state.pinnedHeadlineIds = updatedPinnedIds;

      return state;
      //remove headline from headinesById
    },
    removeHeadlineFromPinned: (state, action: IReducerAction<number>) => {
      //remove headline id from pinned
      if (!action.payload) {
        return state;
      }
      const updatedPinnedHeadlineIds: number[] = state.pinnedHeadlineIds.filter(
        (id: number) => id !== action.payload
      );

      state.pinnedHeadlineIds = updatedPinnedHeadlineIds;

      return state;
    },
  },
});

export const {
  setHeadlinesById,
  setDisplayedHeadlineIds,
  deleteHeadline,
  addHeadlineToPinnned,
  removeHeadlineFromPinned,
} = homeReducerSlice.actions;

export default homeReducerSlice.reducer;
