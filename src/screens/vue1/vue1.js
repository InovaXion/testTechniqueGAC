import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import styles from "./styles";
import { Button } from "react-native-paper";
import colors from "../../colors/variable";
import CustomIcon from "../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { connect } from "react-redux";

const { width, height } = Dimensions.get("screen");
const window = Dimensions.get("window");

const hauteur = height;
const largeur = width;

class Vue1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
    };
  }

  async componentDidMount() {
    this.setState({ mileage_readings: this.props.mileage });
  }

  async componentDidUpdate() {
    await this.setState({ mileage_readings: this.props.mileage });
  }

  componentWillUnmount() {}

  _ReiniMileage() {
    const action = { type: "REINI_MILEAGE", value: null };
    this.props.dispatch(action);
  }

  _RemoveMileage(item) {
    console.log(item);
    const action = { type: "REMOVE_MILEAGE", value: item };
    this.props.dispatch(action);
  }

  emptyDatas = () => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          height: hauteur / 1.5,
          justifyContent: "center",
        }}
      >
        <Text
          style={{
            fontSize: 12,
            color: colors.bleuFonce,
            textAlign: "center",
          }}
        >
          Aucune données trouvées, veuillez mettre à jour l'application.
        </Text>
      </View>
    );
  };

  render() {
    const renderItem = ({ item, index }) => {
      function formatDate(input) {
        var datePart = input.match(/\d+/g),
          year = datePart[0].substring(0),
          month = datePart[1],
          day = datePart[2];

        return day + "/" + month + "/" + year;
      }

      const Item = ({ issued_on, id, value }) => (
        <View style={styles.item}>
          <View style={styles.itemBox}>
            <View style={styles.itemInfos}>
              <Text style={styles.itemDate}>{formatDate(issued_on)}</Text>
              <Text style={styles.itemDate}>{value}</Text>
              <View style={styles.actionsBox}>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.bleuFonce,
                    borderRadius: 65,
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    marginHorizontal: 5,
                  }}
                  onPress={async () => {
                    this.props.navigation.navigate("Vue2", {
                      mileageId: id,
                      mileageDate: issued_on,
                    });
                  }}
                >
                  <CustomIcon
                    name="Loupe"
                    fill={"white"}
                    height={30}
                    width={30}
                    viewBox="0 0 30 30"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    backgroundColor: colors.bleuFonce,
                    borderRadius: 65,
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 2,
                    marginHorizontal: 5,
                  }}
                  onPress={async () => {
                    let mileage = {};
                    mileage.id = item.id;
                    await this._RemoveMileage(mileage);
                  }}
                >
                  <CustomIcon
                    name="Close"
                    fill={"white"}
                    height={30}
                    width={30}
                    viewBox="0 0 30 30"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => {}}
              style={styles.remove}
            ></TouchableOpacity>
          </View>
        </View>
      );

      return (
        <Item issued_on={item.issued_on} id={item.id} value={item.value} />
      );
    };

    return (
      <View
        style={{
          height: "100%",
        }}
      >
        <View
          style={{
            height: "80%",
            width: "90%",
            alignSelf: "center",
            backgroundColor: "white",
            justifyContent: "column",
            top: "10%",
            justifyContent: "flex-start",
            paddingTop: 30,
            shadowColor: "#000",
            borderRadius: 25,
            paddingHorizontal: 25,
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}
        >
          <View style={{ padding: 10 }}>
            <Text
              style={{ alignSelf: "center", fontSize: 32, marginBottom: 30 }}
            >
              Relevés Kilométriques
            </Text>

            <View style={styles.itemInfos}>
              <Text style={styles.itemTitle}>Date</Text>
              <Text style={styles.itemTitle}>Valeur (kms)</Text>
            </View>
          </View>

          <FlatList
            data={this.state.mileage_readings}
            ListEmptyComponent={this.emptyDatas}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 50 }}
            keyExtractor={(item, index) => {
              return item.id;
            }}
            style={{
              width: "100%",
              height:
                window.height < 670
                  ? "42%"
                  : window.height < 870
                  ? "53%"
                  : window.height > 1000
                  ? "69%"
                  : "60%",
            }}
          />
        </View>

        <TouchableOpacity
          style={{
            backgroundColor: colors.bleuFonce,
            borderRadius: 65,
            width: 65,
            height: 65,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            position: "absolute",
            bottom: 10,
            right: 25,
            zIndex: 2,
          }}
          onPress={async () => {
            this.props.navigation.navigate("Vue2");
          }}
        >
          <CustomIcon
            name="Favoris"
            fill={"white"}
            height={50}
            width={50}
            viewBox="0 0 50 50"
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: colors.bleuFonce,
            borderRadius: 65,
            width: 65,
            height: 65,
            alignItems: "center",
            justifyContent: "center",
            marginTop: 25,
            position: "absolute",
            bottom: 10,

            left: 25,
            zIndex: 2,
          }}
          onPress={async () => {
            await this._ReiniMileage();
          }}
        >
          <Text style={{ color: "white" }}>Reinitiliser</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch: (action) => {
      dispatch(action);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Vue1);
