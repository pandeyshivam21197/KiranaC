import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import { HeadlineCardList } from "../../components/organisms/headlineCardList";

const Home: FC<any> = (): React.ReactElement => {
  return (
    <View style={styles.container}>
      <HeadlineCardList />
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
export { home as Home };
