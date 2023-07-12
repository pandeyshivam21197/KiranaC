import { IReducerAction } from "../../../common/interfaces";
import { getRandomHeadlineIds } from "../../../utils/homeUtils";
import { IHeadlinesById, IHomeScreenState } from "./interfaces";
import { createSlice } from "@reduxjs/toolkit";

export const initialState: IHomeScreenState = {
  pinnedHeadlineIds: [], //by id reducer
  displayedHealineIds: [],
  headlinesById: {},
};

export const homeReducerSlice = createSlice({
  name: "homeReducer",
  initialState,
  reducers: {
    setHeadlinesById: (state, action: IReducerAction<IHeadlinesById>) => {
      const newHeadlinesById = {
        ...state.headlinesById,
        ...action.payload,
      };

      const headlineIds = Object.keys(newHeadlinesById);

      const randomHeadlineIds = getRandomHeadlineIds(headlineIds);

      state.headlinesById = newHeadlinesById;
      state.displayedHealineIds = randomHeadlineIds;

      return state;
    },
    setDisplayedHeadlineIds: (state) => {
      const updatedHeadlinesByIds = { ...state.headlinesById };

      if (
        Object.keys(state.headlinesById).length &&
        state.displayedHealineIds.length
      ) {
        //remove prev displayed headlines
        state.displayedHealineIds.forEach((id: string) => {
          if (updatedHeadlinesByIds[id]) {
            delete updatedHeadlinesByIds[id];
          }
        });
      }

      const updatedHeadlineIds = Object.keys(updatedHeadlinesByIds);

      const randomHeadlineIds = getRandomHeadlineIds(updatedHeadlineIds);

      //set new set of displayed headlines
      state.displayedHealineIds = randomHeadlineIds;
      state.headlinesById = updatedHeadlinesByIds;

      return state;
    },
    addHeadlineToPinnned: (state, action: IReducerAction<string>) => {
      //remove from by id headlines and
      //add headline id to pinned at top of []

      if (
        !action.payload ||
        (action.payload && state.pinnedHeadlineIds.includes(action.payload))
      ) {
        return state;
      }

      const updatedDisplayedIds = state.displayedHealineIds.filter(
        (id) => id !== action.payload
      );

      const updatedPinnedHeadlineIds = [...state.pinnedHeadlineIds];
      updatedPinnedHeadlineIds.unshift(action.payload as string);

      state.pinnedHeadlineIds = updatedPinnedHeadlineIds;
      state.displayedHealineIds = updatedDisplayedIds;

      return state;
    },
    deleteHeadline: (state, action: IReducerAction<string>) => {
      const updatedHeadlinesById = { ...state.headlinesById };

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

      delete updatedHeadlinesById[action.payload as string];

      state.headlinesById = updatedHeadlinesById;
      state.displayedHealineIds = updatedDisplayedIds;
      state.pinnedHeadlineIds = updatedPinnedIds;

      return state;
      //remove headline from headlinesById
    },
    removeHeadlineFromPinned: (state, action: IReducerAction<string>) => {
      //remove headline id from pinned
      if (!action.payload) {
        return state;
      }
      const updatedPinnedHeadlineIds: string[] = state.pinnedHeadlineIds.filter(
        (id: string) => id !== action.payload
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
