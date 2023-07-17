import { createIconSetFromIcoMoon } from "react-native-vector-icons";
import icoMoonConfig from "../../../assets/selection.json";

export const icons = {
  pin: "pin",
  delete: "delete",
};

export const Icon = createIconSetFromIcoMoon(icoMoonConfig);
