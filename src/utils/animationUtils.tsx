import { LayoutAnimation } from "react-native";

export const easeInEaseOutAnimation = (): void => {
  LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
};
