import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const hauteur = height;
const largeur = width;

const styles = StyleSheet.create({
  item: {
    height: 70,
    borderBottomWidth: 0.5,
  },
  itemBox: {
    height: "100%",
    padding: 10,
    justifyContent: "center",
  },
  itemInfos: {
    justifyContent: "center",
    flexDirection: "row",
  },

  itemTitle: {
    fontSize: 18,
    justifyContent: "center",
    alignSelf: "flex-start",
    width: "50%",
  },
  itemDate: {
    fontSize: 16,
    width: "50%",
  },

  actionsBox: {
    right: 0,
    position: "absolute",
    flexDirection: "row",
  },
});

export default styles;
