import React, { FC, useEffect, useMemo } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import { screenDimension } from "../../../utils/dimensionUtils";
import { HeadlineCard, IHeadlineCardProps } from "../../molecules/headlineCard";
import { setDisplayedHeadlineIds } from "../../../reduxStore/reducers/homeReducer";

export const HeadlineCardList: FC<any> = () => {
  const dispatch = useDispatch();

  const headlineIds = useAppSelector((state) => {
    const headlineKeys = Object.keys(state.homeReducer.headinesById);

    return headlineKeys;
  }, shallowEqual);

  const pinnedHealineIds = useAppSelector((state) => {
    const pinnedKeys = state.homeReducer.pinnedHeadlineIds;

    return pinnedKeys;
  }, shallowEqual);

  const displayedHealineIds = useAppSelector((state) => {
    const displayedKeys = state.homeReducer.displayedHealineIds;

    return displayedKeys;
  }, shallowEqual);

  const pinnedAndDisplayedHealineIds = useMemo(
    () => [...pinnedHealineIds, ...displayedHealineIds],
    [pinnedHealineIds, displayedHealineIds]
  );

  const renderHeadline = ({ item }: { item: number }) => {
    return <HeadlineCard id={item} />;
  };

  const getKeyForExtractor = (item: number, index: number): string =>
    `${item || index}`;

  const getRandomHeadlineIds = () => {
    //TODO: Shivam get randorm ids from headlineIds
  };

  const onRefresh = () => {
    const randomHeadlineIds = getRandomHeadlineIds();

    dispatch(setDisplayedHeadlineIds(randomHeadlineIds));
  };

  useEffect(() => {
    //TODO: Fetch the data from api if not there else get from async storage
  }, []);

  return (
    <View style={styles.userList}>
      <FlatList
        data={pinnedAndDisplayedHealineIds}
        renderItem={renderHeadline}
        keyExtractor={getKeyForExtractor}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  userList: {
    height: screenDimension.height / 1.5,
  },
});
