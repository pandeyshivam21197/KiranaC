import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../atoms/text";
import Image from "../../atoms/image";
import Button from "../../atoms/button";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import { IHeadline } from "../../../reduxStore/reducers/homeReducer/interfaces";
import {
  addHeadlineToPinnned,
  deleteHeadline,
} from "../../../reduxStore/reducers/homeReducer";

export interface IHeadlineCardProps {
  id: number;
}

const HeadlineCard: FC<IHeadlineCardProps> = (props): React.ReactElement => {
  const { id } = props;

  const dispatch = useDispatch();

  const headline: IHeadline = useAppSelector((state) => {
    const headline = state.homeReducer.headlinesById[id];

    console.log(headline, "headline");

    return headline;
  }, shallowEqual);

  if (!headline) {
    return null;
  }

  const onPin = () => {
    dispatch(addHeadlineToPinnned(id));
  };

  const onDelete = () => {
    dispatch(deleteHeadline(id));
  };

  const { urlToImage, title, description, content } = headline;

  return (
    <View style={styles.container}>
      {urlToImage && (
        <Image style={styles.headlineImage} source={{ uri: urlToImage }} />
      )}
      <View style={styles.rowContainer}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.rowContainer}>
          <Button title="pin" onPress={onPin} />
          <Button title="delete" onPress={onDelete} />
        </View>
      </View>
      <Text>{description}</Text>
      <Text>{content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
  },
  headlineImage: {
    flex: 1,
    height: 200,
    width: "100%",
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginTop: 20,
  },
  title: {
    width: "70%",
  },
});

const headlineCard = React.memo(HeadlineCard);
export { headlineCard as HeadlineCard };
