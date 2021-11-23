import React from "react";
import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  FlatList,
  Dimensions,
  Alert,
} from "react-native";
import styles from "./styles";
import { Button } from "react-native-paper";
import colors from "../../colors/variable";
import CustomIcon from "../../components/CustomIcon";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { connect } from "react-redux";
import {
  LocaleConfig,
  Calendar,
  CalendarList,
  Agenda,
} from "react-native-calendars";

LocaleConfig.locales["fr"] = {
  monthNames: [
    "Janvier",
    "Février",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juillet",
    "Août",
    "Septembre",
    "Octobre",
    "Novembre",
    "Décembre",
  ],
  monthNamesShort: [
    "Janv.",
    "Févr.",
    "Mars",
    "Avril",
    "Mai",
    "Juin",
    "Juil.",
    "Août",
    "Sept.",
    "Oct.",
    "Nov.",
    "Déc.",
  ],
  dayNames: [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ],
  dayNamesShort: ["Dim.", "Lun.", "Mar.", "Mer.", "Jeu.", "Ven.", "Sam."],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = "fr";

const { width, height } = Dimensions.get("screen");

const hauteur = height;
const largeur = width;

class Vue2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navigation: props.navigation,
      markedDates: {},
      daySelected: null,
    };
  }

  async componentDidMount() {
    if (this.props.route.params) {
      this.setState({ mileageId: this.props.route.params.mileageId });
    }

    var data = this.props.mileage;

    let highestId = data.slice().sort((a, b) => a.id - b.id)[
      data.length - 1
    ].id;

    this.setState({
      mileage_readings: data,
      highestId: highestId,
    });
  }

  componentWillUnmount() {}

  _addOrUpdateMileage(item) {
    const action = { type: "ADD_OR_UPDATE_MILEAGE", value: item };
    this.props.dispatch(action);
  }

  render() {
    var onDayPress = (day) => {
      var markPressed = {};

      markPressed[day.dateString] = {
        selected: true,
        selectedColor: colors.primary,
      };

      let mark = { ...markPressed };
      this.setState({
        markedDates: mark,
        daySelected: day,
      });
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
          <Calendar
            onDayPress={(day) => {
              onDayPress(day);
            }}
            firstDay={1}
            hideExtraDays={true}
            renderArrow={(direction) =>
              direction === "left" ? (
                <CustomIcon
                  name="Next"
                  fill={"black"}
                  style={{ transform: [{ rotateY: "180deg" }] }}
                  height="15"
                  width="15"
                  viewBox="0 0 15 15"
                />
              ) : (
                <CustomIcon
                  name="Next"
                  fill={"black"}
                  height="15"
                  width="15"
                  viewBox="0 0 15 15"
                />
              )
            }
            theme={{
              calendarBackground: "transparent",
              textDayFontSize: 14,
              textSectionTitleColor: "black",
              arrowStyle: { paddingHorizontal: 0 },
              "stylesheet.calendar.main": {
                container: {
                  paddingLeft: 0,
                  paddingRight: 0,
                },
                week: {
                  marginTop: 0,
                  marginBottom: 0,
                  flexDirection: "row",
                  justifyContent: "space-around",
                },
              },
              "stylesheet.calendar.header": {
                header: {
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                  marginTop: 0,
                },
                monthText: {
                  fontSize: 14,
                  marginHorizontal: 10,
                  color: colors.primary,
                },
              },
              "stylesheet.day.single": {
                base: {
                  width: 24,
                  height: 24,
                  alignItems: "center",
                },
                today: {
                  backgroundColor: colors.primary,
                },
                todayText: {
                  color: "white",
                },
              },
            }}
            markingType={"custom"}
            markedDates={this.state.markedDates}
            key={this.state.filtreDate}
          />

          <TextInput
            keyboardType="numeric"
            style={styles.textInput}
            clearTextOnFocus={false}
            value={this.state.itemValue}
            onChangeText={(text) =>
              this.setState({ itemValue: text.replace(/[^0-9]/g, "") })
            }
            placeholderTextColor={colors.primary}
            placeholder={"Valeur"}
          />

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
              left: 25,
              zIndex: 2,
            }}
            onPress={async () => {
              this.props.navigation.goBack();
            }}
          >
            <Text style={{ color: "white" }}>Retour</Text>
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
              bottom: hauteur - hauteur / 1.2,
              right: 25,
              zIndex: 2,
            }}
            onPress={async () => {
              if (!this.state.daySelected || !this.state.itemValue) {
                Alert.alert("Erreur", "Vous devez remplir tous les champs", [
                  {
                    text: "Ok",
                    onPress: () => console.log("Cancel"),
                    style: "cancel",
                  },
                ]);
              } else {
                let mileage = {};

                // Si modification :
                if (this.state.mileageId) {
                  mileage.id = this.state.mileageId;
                } else {
                  mileage.id = this.state.highestId + 1;
                }

                mileage.issued_on = this.state.daySelected.dateString;
                mileage.value = this.state.itemValue;
                console.log(mileage);

                await this._addOrUpdateMileage(mileage);

                this.props.navigation.navigate("Vue1");
              }
            }}
          >
            {this.state.mileageId ? (
              <Text style={{ color: "white" }}>Modifier</Text>
            ) : (
              <Text style={{ color: "white" }}>Ajouter</Text>
            )}
          </TouchableOpacity>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Vue2);
