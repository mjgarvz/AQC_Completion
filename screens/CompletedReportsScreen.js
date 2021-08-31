import React from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Clipboard,
  ToastAndroid,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OpenMapDirections } from "react-native-navigation-directions";
import { showLocation } from "react-native-map-link";

export default class IncidentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      repoID: this.props.route.params.rID,
    };
    setInterval(() => {
      this._loadPage();
    }, 5000);
  }
  //MAP NAV
  _callShowDirections = () => {
    const endPoint = {
      longitude: 121.0493,
      latitude: 14.6516,
    };

    console.log(endPoint);

    const transportPlan = "d";

    OpenMapDirections(null, endPoint, transportPlan).then((res) => {
      console.log(res);
    });
  };
  //load page
  _loadPage() {
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var uEmail = JSON.parse(data);
        fetch("https://alert-qc.com/mobile/completedReportsList.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respo_email: uEmail,
          }),
        })
          .then((response) => response.json())
          .then((reseponseJson) => {
            this.setState({
              isLoading: false.valueOf,
              dataSource: reseponseJson,
            });
          });
      } else {
        console.log("error");
      }
    });
  }

  //PAGE LOAD
  componentDidMount() {
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        Email = JSON.parse(data);
        console.log(Email)
      } else {
        console.log("error");
      }
    });
    

    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var uEmail = JSON.parse(data);
        fetch("https://alert-qc.com/mobile/completedReportsList.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respo_email: uEmail,
          }),
        })
          .then((response) => response.json())
          .then((reseponseJson) => {
            this.setState({
              isLoading: false.valueOf,
              dataSource: reseponseJson,
            });
          });
      } else {
        console.log("error");
      }
    });
  }
  //INCIDENT CARD

  _renderItem = ({ item, index }) => {
    if (item.id === undefined) {
      return (
        <View>
          <Text>No Available Reports For Now</Text>
        </View>
      );
    } else {
      return (
        <TouchableOpacity
          onPress={() => {
            Alert.alert(
              "Incident Detail",
              "Reporter: " +
                item.first_name +
                " " +
                item.last_name +
                "\n" +
                "Location: " +
                item.location_of_incident +
                "\n" +
                "Incident: " +
                item.incident_type +
                "\n" +
                "Injuries: " +
                item.injuries +
                "\n" +
                "Date/Time Reported: " +
                item.date_time +
                "\n" +
                "Short Brief:\n\n" +
                item.short_description,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "Edit",
                  onPress: () => {
                    //send notification

                    //assign report to self
                    const repID = item.id + "";
                    Alert.alert(
                      "Edit Report",
                      "By editing this report, it will be return to 'for review' status",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Ok",
                          onPress: () => {
                            console.log("Edit");
                            //send to new page
                          },
                        },
                      ]
                    );
                  },
                },
              ]
            );
          }}
        >
          <View style={styles.itemCard}>
            <Text style={styles.itemText}>
              <Text style={styles.accHead}>Reporter:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.first_name + " " + item.last_name + "\n"}
              </Text>

              <Text style={styles.accHead}>Barangay:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.barangay + "\n"}
              </Text>

              <Text style={styles.accHead}>Location:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.location_of_incident + "\n"}
              </Text>

              <Text style={styles.accHead}>Incident:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.incident_type + "\n"}
              </Text>

              {/* <Text >SATUS:</Text>
            <Text style={styles.itemVal} editable={false}>{item.status+"\n"}</Text> */}

              <Text style={styles.accHead}>Contact:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.phone}
              </Text>
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  };

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }

    return (
      <SafeAreaView>
        <View styles={styles.container}>
          <FlatList
            data={dataSource}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
          ></FlatList>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingTop: 50,
  },
  itemCard: {
    flex: 1,
    padding: 25,
    borderBottomWidth: 2,
    borderBottomColor: "#ffcd9c",
  },
  itemText: {
    flex: 1,
    fontSize: 20,
    color: "black",
  },
  LogButt: {
    position: "absolute",
  },
  accHead: {
    fontSize: 15,
    color: "grey",
  },
  itemVal: {},
});
