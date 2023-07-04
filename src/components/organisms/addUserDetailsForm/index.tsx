import React, {FC} from 'react';
import TextInput from '../../atoms/textInput';
import {StyleSheet, View} from 'react-native';
import {IRadioButton, RadioButtonList} from '../../atoms/radioButtonList';
import {IUserInfo} from '../../../reduxStore/reducers/homeReducer/interfaces';
import {useAppDispatch, useAppSelector} from '../../../reduxStore/hooks';
import {
  updateGenderRadioButtons,
  updateUserDetails,
} from '../../../reduxStore/reducers/homeReducer';

export const AddUserDetailsForm: FC<any> = () => {
  const userDetails =
    useAppSelector(state => state.homeReducer.userForAddOrUpdate) || {};
  const genderRadioButton = useAppSelector(
    state => state.homeReducer.genderRadioButton,
  );

  const {name = '', surname = ''} = userDetails;

  const dispatch = useAppDispatch();

  const onRadioButton = (selectedRadioButton: IRadioButton) => {
    const {key} = selectedRadioButton;

    const udpatedRadioButton: IRadioButton[] = genderRadioButton.map(
      radioButton => {
        if (radioButton?.key === key) {
          return {...radioButton, isSelected: true};
        }

        if (radioButton?.isSelected) {
          return {...radioButton, isSelected: false};
        }

        return radioButton;
      },
    );

    const newUserDetails: IUserInfo = {...userDetails, gender: key};

    dispatch(updateUserDetails({...newUserDetails}));
    dispatch(updateGenderRadioButtons(udpatedRadioButton));
  };

  const onNameChange = (newName: string) => {
    const newUserDetails: IUserInfo = {...userDetails, name: newName};

    dispatch(updateUserDetails({...newUserDetails}));
  };

  const onSurnameChange = (newSurname: string) => {
    const newUserDetails: IUserInfo = {...userDetails, surname: newSurname};

    dispatch(updateUserDetails({...newUserDetails}));
  };

  return (
    <View>
      <View style={styles.nameContainer}>
        <TextInput
          style={styles.inputBox}
          value={name}
          onChangeText={onNameChange}
          placeholder="Enter name"
        />
        <TextInput
          style={styles.inputBox}
          value={surname}
          onChangeText={onSurnameChange}
          placeholder="Enter surname"
        />
      </View>
      <RadioButtonList
        radioButtons={genderRadioButton}
        onButton={onRadioButton}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  inputBox: {
    borderWidth: 1,
    borderColor: 'black',
  },
});
