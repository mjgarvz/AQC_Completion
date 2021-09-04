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
  Image,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { OpenMapDirections } from "react-native-navigation-directions";
import { showLocation } from "react-native-map-link";
import { NavigationActions } from "react-navigation";

export default class IncidentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      respo_status: "",
      checkResponderStatus: "",
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
    fetch("https://alert-qc.com/mobile/loadRespoStatus.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        respo_email: this.state.Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson === "On Call") {
          this.state.checkResponderStatus = "On Call";
          console.log("On Call");
        } else if (responseJson === "Available") {
          this.state.checkResponderStatus = "Available";
          console.log(this.state.Email);
          console.log("Available");
        } else {
          alert("Loading");
          console.log(responseJson);
        }
      });

    fetch("https://alert-qc.com/mobile/loadRespoDept.php", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        respo_email: this.state.Email,
      }),
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          isLoading: false.valueOf,
          dataSource: responseJson,
        });
      });
  }

  //PAGE LOAD
  componentDidMount() {
    var uEmail = "";
    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        uEmail = JSON.parse(data);
        this.state.Email = JSON.parse(data);

        fetch("https://alert-qc.com/mobile/loadRespoStatus.php", {
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
          .then((responseJson) => {
            if (responseJson === "On Call") {
              this.state.checkResponderStatus = "On Call";
              console.log("On Call");
            } else if (responseJson === "Available") {
              this.state.checkResponderStatus = "Available";
              console.log(this.state.Email);
              console.log("Available");
            } else {
              alert("Loading");
              console.log(responseJson);
            }
          });
      } else {
        console.log("error");
      }
    });

    AsyncStorage.getItem("userEmail").then((data) => {
      if (data) {
        //If userEmail has data -> email
        var cEmail = JSON.parse(data);
        fetch("https://alert-qc.com/mobile/loadRespoDept.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            respo_email: cEmail,
          }),
        })
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({
              isLoading: false.valueOf,
              dataSource: responseJson,
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
      if (item.upload === "" || item.upload === undefined) {
        return (
          <View>
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
                      text: "Call",
                      onPress: () => {
                        Linking.openURL("tel: " + item.phone);
                      },
                    },
                    {
                      text: "Respond",
                      onPress: () => {
                        //send notification

                        //assign report to self
                        const repID = item.id + "";
                        fetch(
                          "https://alert-qc.com/mobile/updateStatusAssign.php",
                          {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              username: this.state.Email,
                              report: repID,
                            }),
                          }
                        )
                          .then((response) => response.json())
                          .then((responseJson) => {
                            // If the Data matched.
                            if (responseJson === "Loading~") {
                            } else {
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                          });

                        Alert.alert(
                          "Assignment Update",
                          "This incident is now assigned to you",
                          [
                            {
                              text: "Active Screen",
                              onPress: () => {
                                //navigates from profile stack to active stack
                                this.props.navigation.navigate("Active", {});
                              },
                              style: "cancel",
                            },
                            {
                              text: "Go To Navigation",
                              onPress: () => {
                                Clipboard.setString(item.location_of_incident);
                                if (Platform.OS === "android") {
                                  ToastAndroid.show(
                                    "Location Copied to Clipboard",
                                    ToastAndroid.SHORT
                                  );
                                } else {
                                  AlertIOS.alert(
                                    "Location Copied to Clipboard"
                                  );
                                }
                                const desti =
                                  item.location_of_incident +
                                  ", " +
                                  item.barangay +
                                  ", Quezon City, Metro Manila";
                                const end = desti.toString();
                                const start = "My Location";
                                const travelType = "drive";

                                console.log(end);

                                showLocation({
                                  longitude: 0,
                                  latitude: 0,
                                  title: end,
                                });
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

                  <Text style={styles.accHead}>Contact:</Text>
                  <Text style={styles.itemVal} editable={false}>
                    {item.phone}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      } else {
        let ImageURI = {
          uri: "https://alert-qc.com/assets/uploads/reports/" + item.upload,
        };
        return (
          <View>
            <Image
              source={ImageURI}
              style={{ height: 200, resizeMode: "stretch", margin: 5 }}
            ></Image>
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
                      text: "Call",
                      onPress: () => {
                        Linking.openURL("tel: " + item.phone);
                      },
                    },
                    {
                      text: "Respond",
                      onPress: () => {
                        //send notification

                        //assign report to self
                        const repID = item.id + "";
                        fetch(
                          "https://alert-qc.com/mobile/updateStatusAssign.php",
                          {
                            method: "POST",
                            headers: {
                              Accept: "application/json",
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              username: this.state.Email,
                              report: repID,
                            }),
                          }
                        )
                          .then((response) => response.json())
                          .then((responseJson) => {
                            // If the Data matched.
                            if (responseJson === "Loading~") {
                            } else {
                            }
                          })
                          .catch((err) => {
                            console.error(err);
                          });

                        Alert.alert(
                          "Assignment Update",
                          "This incident is now assigned to you",
                          [
                            {
                              text: "Active Screen",
                              onPress: () => {
                                //navigates from profile stack to active stack
                                this.props.navigation.navigate("Active", {});
                              },
                              style: "cancel",
                            },
                            {
                              text: "Go To Navigation",
                              onPress: () => {
                                Clipboard.setString(item.location_of_incident);
                                if (Platform.OS === "android") {
                                  ToastAndroid.show(
                                    "Location Copied to Clipboard",
                                    ToastAndroid.SHORT
                                  );
                                } else {
                                  AlertIOS.alert(
                                    "Location Copied to Clipboard"
                                  );
                                }
                                const desti =
                                  item.location_of_incident +
                                  ", " +
                                  item.barangay +
                                  ", Quezon City, Metro Manila";
                                const end = desti.toString();
                                const start = "My Location";
                                const travelType = "drive";

                                console.log(end);

                                showLocation({
                                  longitude: 0,
                                  latitude: 0,
                                  title: end,
                                });
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

                  <Text style={styles.accHead}>Contact:</Text>
                  <Text style={styles.itemVal} editable={false}>
                    {item.phone}
                  </Text>
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        );
      }
    }
  };

  render() {
    if (this.state.checkResponderStatus === "On Call") {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text
            style={{
              textAlignVertical: "center",
              textAlign: "center",
              color: "black",
              fontWeight: "bold",
            }}
          >
            YOU HAVE AN ACTIVE REPORT!
          </Text>
        </View>
      );
    } else {
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
