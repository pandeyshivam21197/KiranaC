import React, {FC} from 'react';
import {StyleSheet, View} from 'react-native';
import {UserCardList} from '../../components/organisms/userCardList';
import {Header} from './components/header';
import {AddUserDetailsForm} from '../../components/organisms/addUserDetailsForm';

const Home: FC<any> = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <Header />
      <AddUserDetailsForm />
      <UserCardList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

const home = React.memo(Home);
export {home as Home};
