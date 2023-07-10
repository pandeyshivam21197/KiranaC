import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../atoms/text";
import Image from "../../atoms/image";
import Button from "../../atoms/button";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual } from "react-redux";
import { IHeadline } from "../../../reduxStore/reducers/homeReducer/interfaces";

export interface IHeadlineCardProps {
  id: number;
}

const HeadlineCard: FC<IHeadlineCardProps> = (props): React.ReactElement => {
  const { id } = props;

  const headline: IHeadline = useAppSelector((state) => {
    const headline = state.homeReducer.headinesById[id];

    return headline;
  });

  const onPin = () => {
    //TODO: Shivam
  };

  const onDelete = () => {
    //TODO: Shivam
  };

  const { urlToImage, title, description, content } = headline;

  return (
    <View style={styles.container}>
      <Image style={styles.headlineImage} source={{ uri: urlToImage }} />
      <View style={styles.rowContainer}>
        <Text>{title}</Text>
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
    height: 400,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const headlineCard = React.memo(HeadlineCard);
export { headlineCard as HeadlineCard };
