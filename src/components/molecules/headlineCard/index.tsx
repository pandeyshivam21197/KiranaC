import React, { FC } from "react";
import { StyleSheet, View } from "react-native";
import Text from "../../atoms/text";
import Image from "../../atoms/image";
import { useAppSelector } from "../../../reduxStore/hooks";
import { shallowEqual, useDispatch } from "react-redux";
import { IHeadline } from "../../../reduxStore/reducers/homeReducer/interfaces";
import {
  addHeadlineToPinnned,
  deleteHeadline,
} from "../../../reduxStore/reducers/homeReducer";
import { Card } from "../../HOC/card";
import { Icon, icons } from "../../atoms/Icon";

export interface IHeadlineCardProps {
  id: number;
}

const HeadlineCard: FC<IHeadlineCardProps> = (props): React.ReactElement => {
  const { id } = props;

  const dispatch = useDispatch();

  const headline: IHeadline = useAppSelector((state) => {
    const headline = state.homeReducer.headlinesById[id];

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

  const { urlToImage, title, description } = headline;

  return (
    <Card style={styles.container}>
      {urlToImage && (
        <Image style={styles.headlineImage} source={{ uri: urlToImage }} />
      )}
      <View style={styles.content}>
        <View style={[styles.rowContainer, styles.titleContainer]}>
          <Text style={styles.title}>{title}</Text>
        </View>
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
        <View style={[styles.rowContainer, styles.footer]}>
          <View style={[styles.button, styles.deleteButton]}>
            <Icon
              color={"#d11a2a"}
              onPress={onDelete}
              size={20}
              name={icons.delete}
            />
          </View>
          <View style={styles.button}>
            <Icon
              color={"#7dc67d"}
              onPress={onPin}
              size={20}
              name={icons.pin}
            />
          </View>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    margin: 4,
    backgroundColor: "white",
    borderRadius: 8,
  },
  headlineImage: {
    flex: 1,
    height: 200,
    width: "100%",
    borderRadius: 8,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "black",
  },
  content: {
    padding: 12,
  },
  titleContainer: {},
  description: {
    marginTop: 20,
    fontWeight: "400",
  },
  footer: {
    alignSelf: "flex-end",
    marginTop: 20,
  },
  deleteButton: {
    marginLeft: 12,
  },
  button: {
    alignItems: "flex-end",
    width: 40,
  },
});

const headlineCard = React.memo(HeadlineCard);
export { headlineCard as HeadlineCard };
