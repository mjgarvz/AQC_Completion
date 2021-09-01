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
    // setInterval(() => {
    //   this._loadPage();
    // }, 5000);
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
            responderID: this.state.repoID,
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
        fetch("https://alert-qc.com/mobile/completedReportsList.php", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            responderID: this.state.repoID,
          }),
        })
          .then((response) => response.json())
          .then((reseponseJson) => {
            this.setState({
              isLoading: false.valueOf,
              dataSource: reseponseJson,
            });
          });
      console.log(this.state.repoID)
  }
  //INCIDENT CARD

  _renderItem = ({ item, index }) => {
    if (item.responderReportID === undefined) {
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
                item.reporter +
                "\n" +
                "Location: " +
                item.reporterLoc +", "+ item.reporterBrgy +
                "\n" +
                "Incident: " +
                item.reporterInc,
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
                    var repID = item.responderReportID + "";
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
                            console.log(repID);
                            this.props.navigation.navigate("EditReportsCompleted", {
                              rID: this.state.repID,
                            });
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
              <Text style={styles.accHead}>Report ID:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.sourceReportID + "\n"}
              </Text>

              <Text style={styles.accHead}>Reporter:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.reporter + "\n"}
              </Text>

              <Text style={styles.accHead}>Location:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.reporterLoc +", " +item.reporterBrgy + "\n"}
              </Text>

              <Text style={styles.accHead}>Incident:</Text>
              <Text style={styles.itemVal} editable={false}>
                {item.reporterInc + "\n"}
                
              </Text>
              
              <Text style={styles.itemVal} editable={false}>
                {item.status}
                
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
