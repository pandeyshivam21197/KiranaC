import {IRadioButton} from '../../../components/atoms/radioButtonList';
import {IHomeScreenState, IUserInfo} from './interfaces';
import {createSlice} from '@reduxjs/toolkit';

const genderRadioButtons: IRadioButton[] = [
  {key: 'M', value: 'Male', isSelected: false},
  {key: 'F', value: 'Female', isSelected: false},
];

export const initialState: IHomeScreenState = {
  users: {}, //by id reducer
  userForAddOrUpdate: {},
  genderRadioButton: [...genderRadioButtons],
};

const setGenderRadioButton = (
  radioButtons: IRadioButton[],
  userDetails: IUserInfo,
) => {
  return radioButtons.map(radioButton => {
    if (radioButton?.key === userDetails.gender) {
      return {...radioButton, isSelected: true};
    }

    if (radioButton?.isSelected) {
      return {...radioButton, isSelected: false};
    }

    return radioButton;
  });
};

// type HomeActionPayloadTypes = IUserInfo | string;

export const homeReducerSlice = createSlice({
  name: 'homeReducer',
  initialState,
  reducers: {
    addUserAction: state => {
      if (!state.userForAddOrUpdate) {
        return state;
      }

      const uniqueId = Math.random() * 100;

      state.users[uniqueId] = {...state.userForAddOrUpdate, id: uniqueId};

      state.userForAddOrUpdate = undefined;
      state.genderRadioButton = initialState.genderRadioButton;

      return state;
    },
    updateUserDetails: (state, action) => {
      const userDetails: IUserInfo = action?.payload;

      const isOldUser = !!userDetails?.id;

      if (isOldUser) {
        state.users[userDetails?.id as number] = {
          ...userDetails,
        };

        state.genderRadioButton = setGenderRadioButton(
          state.genderRadioButton,
          userDetails,
        );
      }

      state.userForAddOrUpdate = userDetails;

      return state;
    },
    updateGenderRadioButtons: (state, action) => {
      const genderRadioButton: IRadioButton[] = action?.payload;

      state.genderRadioButton = genderRadioButton;

      return state;
    },
    resetGenderRadioButtons: state => {
      state.genderRadioButton = initialState.genderRadioButton;

      return state;
    },
  },
});

export const {
  addUserAction,
  updateUserDetails,
  updateGenderRadioButtons,
  resetGenderRadioButtons,
} = homeReducerSlice.actions;

export default homeReducerSlice.reducer;
