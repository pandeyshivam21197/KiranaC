import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, RefreshControl, StyleSheet, View } from "react-native";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import { HeadlineCard, IHeadlineCardProps } from "../../molecules/headlineCard";
import { setDisplayedHeadlineIds } from "../../../reduxStore/reducers/homeReducer";
import Loader from "../../atoms/loader";
import { fetchFreshHeadlines } from "../../../reduxStore/actions/homeActions";

export const HeadlineCardList: FC<any> = () => {
  const dispatch = useDispatch();

  const page = useRef(1);

  const [laoding, setLoading] = useState(false);

  const headlineIds: string[] = useAppSelector((state) => {
    const headlineKeys = Object.keys(state.homeReducer.headlinesById);

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

  const onRefresh = () => {
    dispatch(setDisplayedHeadlineIds());
  };

  const hasHeadlines = headlineIds.length > 0;

  const isLessHeadlinesLeft = headlineIds.length <= 20;

  const fetchHeadlines = async () => {
    setLoading(true);

    const callback = () => {
      setLoading(false);

      page.current = page.current + 1;
    };

    //@ts-ignore
    dispatch(fetchFreshHeadlines(page.current, callback));
  };

  useEffect(() => {
    if (!hasHeadlines || isLessHeadlinesLeft) {
      //Due to dev account contraint can only access 100 records only.
      fetchHeadlines();
    }
  }, [isLessHeadlinesLeft]);

  useEffect(() => {
    if (hasHeadlines) {
      const intervalId: number = setInterval(() => {
        onRefresh();
      }, 10000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [hasHeadlines]);

  if (!hasHeadlines) {
    return <Loader />;
  }

  return (
    <FlatList
      data={pinnedAndDisplayedHealineIds}
      renderItem={renderHeadline}
      keyExtractor={getKeyForExtractor}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      refreshControl={
        <RefreshControl refreshing={laoding} onRefresh={onRefresh} />
      }
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 24,
  },
});
