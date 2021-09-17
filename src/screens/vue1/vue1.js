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

const { width, height } = Dimensions.get("screen");

const hauteur = height;
const largeur = width;

export default class Vue1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
    };
  }

  async componentDidMount() {


    var data = await AsyncStorage.getItem("data");
    if (!data) {
      var data = require("../../../assets/json/mileage_readings.json");
      await AsyncStorage.setItem("data", JSON.stringify(data.mileage_readings));
    } else {
      data = JSON.parse(data);
    }

    this.setState({ mileage_readings: data });
  }

  componentWillUnmount() {}

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
            height: "100%",
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
              bottom: hauteur - hauteur / 1.2,
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

          <View style={{ padding: 10 }}>
            <View style={styles.itemInfos}>
              <Text style={styles.itemTitle}>Date</Text>
              <Text style={styles.itemTitle}>Valeur</Text>
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
              height: "80%",
            }}
          />
        </View>
      </View>
    );
  }
}
