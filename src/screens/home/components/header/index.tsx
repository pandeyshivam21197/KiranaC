import React, {FC} from 'react';
import Button from '../../../../components/atoms/button';
import {shallowEqual} from 'react-redux';
import {IUserInfo} from '../../../../reduxStore/reducers/homeReducer/interfaces';
import {useAppDispatch, useAppSelector} from '../../../../reduxStore/hooks';
import {
  addUserAction,
  resetGenderRadioButtons,
  updateUserDetails,
} from '../../../../reduxStore/reducers/homeReducer';

export const Header: FC<any> = () => {
  const dispatch = useAppDispatch();

  const userToAddOrUpdate: IUserInfo | undefined = useAppSelector(state => {
    const user = state.homeReducer.userForAddOrUpdate;

    return user;
  }, shallowEqual);

  const onAddUpdateUserDetails = () => {
    const isNewUser = !userToAddOrUpdate?.id;

    if (isNewUser) {
      dispatch(addUserAction());
    } else {
      dispatch(updateUserDetails(undefined));
      dispatch(resetGenderRadioButtons());
    }
  };

  return (
    <Button
      title={userToAddOrUpdate?.id ? 'done editing' : 'add User'}
      onPress={onAddUpdateUserDetails}
    />
  );
};
