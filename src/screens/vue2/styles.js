import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("screen");

const hauteur = height;
const largeur = width;

const styles = StyleSheet.create({
  inputtext: {
    height: 50,
    fontSize: 16,
    alignSelf: "center",
    width: "85%",
    borderBottomWidth: 1,
    borderBottomColor: "white",
    color: "white",
    marginBottom: 30,
  },
  firstItem: {
    height: 70,
    borderBottomWidth: 1,
  },
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
  gamme: {
    fontSize: 18,
  },
  remove: {
    height: 50,
    width: 50,
    position: "absolute",
    top: 10,
    right: 10,
    justifyContent: "center",
  },
  Lineargradient: {
    height: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgBox: {
    marginLeft: 20,
    justifyContent: "center",
  },
  logo: {
    width: 35,
    resizeMode: "contain",
  },
  iconsBox: {
    backgroundColor: "red",
  },

  textInput: {
    height: 45,
    borderWidth: 2,
    borderRadius: 10,
    paddingLeft: 10,
    fontSize: 14,
    marginRight: 15,
  },
});

export default styles;
