import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import { RefreshControl, SectionList, StyleSheet } from "react-native";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import { HeadlineCard } from "../../molecules/headlineCard";
import { setDisplayedHeadlineIds } from "../../../reduxStore/reducers/homeReducer";
import Loader from "../../atoms/loader";
import Text from "../../atoms/text";
import { fetchFreshHeadlines } from "../../../reduxStore/actions/homeActions";

export const HeadlineCardList: FC<any> = () => {
  const dispatch = useDispatch();
  const refreshTimerRef = useRef<number>();

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

  const renderHeadline = ({ item }: { item: number }) => {
    return <HeadlineCard id={item} />;
  };

  const getKeyForExtractor = (item: number, index: number): string =>
    `${item || index}`;

  const onRefresh = () => {
    dispatch(setDisplayedHeadlineIds());
  };

  const onPullToRefresh = () => {
    if (refreshTimerRef.current) {
      clearInterval(refreshTimerRef.current);
    }

    onRefresh();

    refreshTimerRef.current = setInterval(() => {
      onRefresh();
    }, 10000);
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
      refreshTimerRef.current = setInterval(() => {
        onRefresh();
      }, 10000);

      return () => {
        if (refreshTimerRef.current) {
          clearInterval(refreshTimerRef.current as number);
        }
      };
    }
  }, [hasHeadlines]);

  if (!hasHeadlines) {
    return <Loader />;
  }

  const pinnedSection = {
    title: "Pinned Headlines:",
    data: pinnedHealineIds,
  };

  const randomSection = {
    title: "Random Headlines:",
    data: displayedHealineIds,
  };

  const sectionData = [];

  if (pinnedHealineIds && pinnedHealineIds?.length) {
    sectionData.push(pinnedSection);
  }

  if (displayedHealineIds && displayedHealineIds?.length) {
    sectionData.push(randomSection);
  }

  return (
    <SectionList
      sections={sectionData}
      keyExtractor={(item, index) => {
        return `${item} + ${index}`;
      }}
      refreshControl={
        <RefreshControl refreshing={laoding} onRefresh={onPullToRefresh} />
      }
      renderItem={renderHeadline}
      renderSectionHeader={({ section: { title } }) => {
        return <Text>{title}</Text>;
      }}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    // height: 12,
    // backgroundColor: "red",
  },
});
