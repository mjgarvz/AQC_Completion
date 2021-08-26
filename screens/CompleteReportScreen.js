import * as React from "react";
import { Component } from "react";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  SafeAreaView,
  Button,
  StyleSheet,
  FlatList,
  TextInput,
  Alert,
} from "react-native";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
import { KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native";

//landing

export default class EditProfileScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      status: "",
      repoID: this.props.route.params.rID,
      //responderStates
      firstName: this.props.route.params.fname,
      middleName: this.props.route.params.mname,
      lastName: this.props.route.params.lname,
      conNum: this.props.route.params.contactNum,
      emailAdd: this.props.route.params.emailAddress,
      respoAdd: this.props.route.params.respoderAddress,

      newFirstName: this.props.route.params.fname,
      newMiddleName: this.props.route.params.mname,
      newLastName: this.props.route.params.lname,
      newContactNumber: this.props.route.params.contactNum,
      newEmailAddress: this.props.route.params.emailAddress,
      newResponderAddress: this.props.route.params.respoderAddress,

      //reportState
      reportID: this.props.route.params.repId,
      reporterName: this.props.route.params.reportersName,
      reporterContact: this.props.route.params.reportersCont,
      reporterBarangay: this.props.route.params.reporterBRGY,
      reporterLocation: this.props.route.params.reporterLoc,
      reporterIncident: this.props.route.params.reportedIncident,
      reporterInjured: this.props.route.params.reportedInj,
      reportDesc: this.props.route.params.reportDescription,
      reportDnT: this.props.route.params.dateAndTime,
    };
  }

  render() {
    let { dataSource, isLoading } = this.state;
    if (isLoading) {
      <View></View>;
    }
    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <ScrollView>
          <View style={styles.mainContainer}>
            <View style={styles.card}>
              <Text>
                <View style={styles.repCard}>
                  <Text style={styles.textStatus}>REPORTED INCIDENT</Text>
                  <Text style={styles.itemText}>
                    <Text style={styles.accHead}>Report ID:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reportID + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Reporter:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reporterName + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Contact:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reporterContact + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Barangay:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterBarangay + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Location:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterLocation + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Incident:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterIncident + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Injuries:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterInjured + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Description:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reportDesc + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Date and Time:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reportDnT}
                    </Text>
                  </Text>
                </View>
              </Text>
            </View>
            <View style={styles.reportForm}>
              <Text style={styles.reportHeader}>Report Information</Text>
              <Text>Responder Team</Text>
              <Text>Vehichle Used</Text>
              <Text>Time on Dispatch</Text>
              <Text>Time on Arrival on Scene</Text>
              <Text>Time on Return to Base</Text>
              <Text>Gas Consumed?</Text>
              <Text>Time on Incident Under Control</Text>
              <Text>Distance from Base</Text>
              <Text>Description of Incident Location</Text>
              <Text>Casualties</Text>
              <Text>Injured</Text>
              <Text>Deaths</Text>
              <Text>Equipment Used</Text>
              <Text>Team Members?</Text>
              <Text>Description of Events</Text>
              <Text>Cause of Incident*?</Text>
              <Text>Actions Taken</Text>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableWithoutFeedback style={styles.buttonCancel}>
                <Button
                  color="#ff8000"
                  title="Cancel"
                  onPress={() => {
                    Alert.alert(
                      "Cancel?",
                      "Canceling will discard all changes made",
                      [
                        {
                          text: "Cancel",
                          style: "cancel",
                        },
                        {
                          text: "Discard",
                          onPress: () => {
                            this.props.navigation.goBack(null);
                          },
                        },
                      ]
                    );

                    console.log("discard");
                  }}
                ></Button>
              </TouchableWithoutFeedback>

              {/* <TouchableWithoutFeedback style={styles.buttonUpdate}>
                <Button
                  title="update"
                  color="#87c830"
                  onPress={() => {
                    fetch("https://alert-qc.com/mobile/updateRespoUser.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        //send incident report data
                        phpRID: this.state.repoID,
                        phpFname: this.state.newFirstName,
                        phpMname: this.state.newMiddleName,
                        phpLname: this.state.newLastName,
                        phpCPnum: this.state.newContactNumber,
                        phpEadd: this.state.newEmailAddress,
                        phpRadd: this.state.newResponderAddress,
                      }),
                    })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        // If the Data matched.
                        if (responseJson === "Updated!") {
                          Alert.alert(
                            responseJson + "",
                            "Do you wish to continue making changes?",
                            [
                              {
                                text: "Yes",
                                style: "cancel",
                              },
                              {
                                text: "No",
                                onPress: () => {
                                  this.props.navigation.goBack(null);
                                },
                              },
                            ]
                          );
                        } else {
                          Alert.alert(responseJson);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });

                    console.log(this.state.repoID);
                  }}
                >
                  <Text>Update</Text>
                </Button>
              </TouchableWithoutFeedback> */}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  itemCard: {
    padding: 25,
    paddingTop: 0,
    width: Dimensions.get("screen").width,
  },
  itemText: {
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
  buttonDuty: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
    paddingRight: 10,
  },
  buttonStatus: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
  },
  buttonComplete: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.87,
    paddingTop: 10,
    paddingRight: 10,
  },
  buttonMap: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
    paddingRight: 10,
  },
  buttonCall: {
    textAlign: "center",
    justifyContent: "center",
    width: Dimensions.get("screen").width * 0.436,
  },
  statusCheck: {
    width: Dimensions.get("screen").width,
    backgroundColor: "#660000",
  },
  textStatus: {
    fontSize: 25,
    padding: -5,
  },
  repCard: {
    
    padding: 25,
    width: Dimensions.get("screen").width * .95,
    borderWidth: 1,
  },
  nameHead: {
    fontSize: 24,
  },
  card: {
    margin: 10,
  },
  reportHeader: {
    backgroundColor: "#660000",
    color: "#fff",
    textAlign: "center",
    fontSize: 25,
    padding: -5,
  },
});
