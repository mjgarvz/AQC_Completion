import * as React from "react";
import { Component } from "react";
import { useState } from "react";
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
import DateTimePickerModal from "react-native-modal-datetime-picker";

import CallPicker from "./CallPicker";

//landing

export default class CompleteReportScreen extends Component {
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

      //reportState to be sent to php
      reportID: this.props.route.params.repId,
      reporterName: this.props.route.params.reportersName,
      reporterContact: this.props.route.params.reportersCont,
      reporterBarangay: this.props.route.params.reporterBRGY,
      reporterLocation: this.props.route.params.reporterLoc,
      reporterIncident: this.props.route.params.reportedIncident,
      reporterInjured: this.props.route.params.reportedInj,
      reportDesc: this.props.route.params.reportDescription,
      reportDnT: this.props.route.params.dateAndTime,

      //states to be sent to php
      responderName: "",
      responderVehicle: "",
      responderDT: "",
      responderAT: "",
      responderRT: "",
      responderUCT: "",
      responderIncDistance: "",
      responderLocDesc: "",
      responderCInjured: "",
      responderCDeaths: "",
      responderRInjured: "",
      responderRDeaths: "",
      responderEq: "",
      responderProb: "",
      responderDescOfEvents: "",
      responderCoI: "",
      responderAction: "",

      //vars
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
    };
      
  }

  
  

  render() {
    this.state.responderName = this.state.firstName + " " + this.state.lastName

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
            <Text style={styles.reportHeader}>Report Information</Text>
            <View style={styles.reportForm}>
              <Text style={styles.reportText}>Responder</Text>
              <TextInput
                style={styles.reportTextInput}
                value={this.state.firstName + " " + this.state.lastName}
                editable={false}
              ></TextInput>
              <Text style={styles.reportText}>Vehicle Used</Text>
              <TextInput
                style={styles.reportTextInput}
                placeholder={"Vehicle and Number ex. Ambulance 12"}
                onChangeText={(data) =>
                  this.setState({ responderVehicle: data })
                }
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Response Time</Text>
              <Text style={styles.reportText}>Time on Dispatch</Text>
              <TextInput
                style={styles.reportTextInput}
                onChangeText={(data) => this.setState({ responderDT: data })}
              ></TextInput>
{/*start test*/}
{/*start test*/}
              <Text style={styles.reportText}>Time on Arrival on Scene</Text>
              <TextInput
                style={styles.reportTextInput}
                onChangeText={(data) => this.setState({ responderAT: data })}
              ></TextInput>
              <Text style={styles.reportText}>Time on Return to Base</Text>
              <TextInput
                style={styles.reportTextInput}
                onChangeText={(data) => this.setState({ responderRT: data })}
              ></TextInput>
              <Text style={styles.reportText}>
                Time on Incident Under Control
              </Text>
              <TextInput
                style={styles.reportTextInput}
                onChangeText={(data) => this.setState({ responderUCT: data })}
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Incident Description</Text>
              <Text style={styles.reportText}>
                Approximate Distance from Base(km)
              </Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                onChangeText={(data) =>
                  this.setState({ responderIncDistance: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>
                Description of Incident and Location
              </Text>
              <TextInput
                style={styles.reportTextInput}
                placeholder={"ex. Fire in Appartment Complex"}
                onChangeText={(data) =>
                  this.setState({ responderLocDesc: data })
                }
              ></TextInput>
              <Text>{"\n"}</Text>
              <Text style={styles.reportSubHeader}>Civilian Casualties</Text>
              <Text style={styles.reportText}>Injured</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                onChangeText={(data) =>
                  this.setState({ responderCInjured: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>Deaths</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                onChangeText={(data) =>
                  this.setState({ responderCDeaths: data })
                }
              ></TextInput>
              <Text>{"\n"}</Text>
              <Text style={styles.reportSubHeader}>Responder Casualties</Text>
              <Text style={styles.reportText}>Injured</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                onChangeText={(data) =>
                  this.setState({ responderRInjured: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>Deaths</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                onChangeText={(data) =>
                  this.setState({ responderRDeaths: data })
                }
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Actions Made</Text>
              <Text style={styles.reportText}>Equipment Used</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                onChangeText={(data) => this.setState({ responderEq: data })}
              ></TextInput>
              <Text style={styles.reportText}>Problems Encountered</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                placeholder={
                  "ex.\n1.more injured than reported \n2.fire damaged nearby houses"
                }
                onChangeText={(data) => this.setState({ responderProb: data })}
              ></TextInput>
              <Text style={styles.reportText}>Description of Events</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                placeholder={
                  "ex.gas leak combustion due to smokers in close proximity"
                }
                onChangeText={(data) =>
                  this.setState({ responderDescOfEvents: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>Cause of Incident</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={2}
                placeholder={"ex.Gas leak"}
                onChangeText={(data) => this.setState({ responderCoI: data })}
              ></TextInput>
              <Text style={styles.reportText}>Actions Taken</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                placeholder={
                  "ex.\n1. gave first aid to injured \n2. sent injured to hospital"
                }
                onChangeText={(data) =>
                  this.setState({ responderAction: data })
                }
              ></TextInput>
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

              <TouchableWithoutFeedback style={styles.buttonComplete}>
                <Button
                  title="Create"
                  color="#87c830"
                  onPress={() => {
                    if (this.state.repoID === "" ||
                        this.state.responderName === "" ||
                        this.state.responderVehicle === "" ||
                        this.state.responderDT === "" ||
                        this.state.responderAT === "" ||
                        this.state.responderRT === "" ||
                        this.state.responderUCT === "" ||
                        this.state.responderIncDistance === "" ||
                        this.state.responderLocDesc === "" ||
                        this.state.responderCInjured === "" ||
                        this.state.responderCDeaths === "" ||
                        this.state.responderRInjured === "" ||
                        this.state.responderRDeaths === "" ||
                        this.state.responderEq === "" ||
                        this.state.responderProb === "" ||
                        this.state.responderDescOfEvents === "" ||
                        this.state.responderCoI === "" ||
                        this.state.responderAction === ""){
                      Alert.alert("Please Fill Up all Fields");
                    }
                    else {
                      fetch("https://alert-qc.com/mobile/createResponderReport.php", {
                      method: "POST",
                      headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({
                        //send incident report data
                        phpRID: this.state.reportID,
                        phpName: this.state.reporterName,
                        phpreporterContact: this.state.reporterContact,
                        phpreporterBarangay: this.state.reporterBarangay,
                        phpreporterLocation: this.state.reporterLocation,
                        phpreporterIncident: this.state.reporterIncident,
                        phpreporterInjured: this.state.reporterInjured,
                        phpreportDesc: this.state.reportDesc,
                        phpreportDnT: this.state.reportDnT,

                        //send incident responder report data
                        phpresponderID: this.state.repoID,
                        phpresponderName: this.state.responderName,
                        phpresponderVehicle: this.state.responderVehicle,
                        phpresponderDT: this.state.responderDT,
                        phpresponderAT: this.state.responderAT,
                        phpresponderRT: this.state.responderRT,
                        phpresponderUCT: this.state.responderUCT,
                        phpresponderIncDistance: this.state.responderIncDistance,
                        phpresponderLocDesc: this.state.responderLocDesc,
                        phpresponderCInjured: this.state.responderCInjured,
                        phpresponderCDeaths: this.state.responderCDeaths,
                        phpresponderRInjured: this.state.responderRInjured,
                        phpresponderRDeaths: this.state.responderRDeaths,
                        phpresponderEq: this.state.responderEq,
                        phpresponderProb: this.state.responderProb,
                        phpresponderDescOfEvents: this.state.responderDescOfEvents,
                        phpresponderCoI: this.state.responderCoI,
                        phpresponderAction: this.state.responderAction,
                      }),
                    })
                      .then((response) => response.json())
                      .then((responseJson) => {
                        // If the Data matched.
                        if (responseJson === "Report Submitted") {
                          Alert.alert(
                            responseJson + "",
                            "Report will now be sent for review",
                            [
                              {
                                text: "OK",
                                onPress: () => {
                                  this.props.navigation.goBack(null);
                                },
                              },
                            ]
                          );
                        } else if(responseJson === "Please Fill up all Fields"){
                          Alert.alert(responseJson);
                        }else {
                          Alert.alert(responseJson);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });

                    }
                    
                    console.log("Source Report");
                    console.log(this.state.reportID);
                    console.log(this.state.reporterName);
                    console.log(this.state.reporterContact);
                    console.log(this.state.reporterBarangay);
                    console.log(this.state.reporterLocation);
                    console.log(this.state.reporterIncident);
                    console.log(this.state.reporterInjured);
                    console.log(this.state.reportDesc);
                    console.log(this.state.reportDnT);
                    console.log("Responder Report")
                    console.log(this.state.repoID);
                    console.log(this.state.responderName);
                    console.log(this.state.responderVehicle);
                    console.log(this.state.responderDT);
                    console.log(this.state.responderAT);
                    console.log(this.state.responderRT);
                    console.log(this.state.responderUCT);
                    console.log(this.state.responderIncDistance);
                    console.log(this.state.responderLocDesc);
                    console.log(this.state.responderCInjured);
                    console.log(this.state.responderCDeaths);
                    console.log(this.state.responderRInjured);
                    console.log(this.state.responderRDeaths);
                    console.log(this.state.responderEq);
                    console.log(this.state.responderProb);
                    console.log(this.state.responderDescOfEvents);
                    console.log(this.state.responderCoI);
                    console.log(this.state.responderAction);
                  }}
                >
                  <Text>Create Report</Text>
                </Button>
              </TouchableWithoutFeedback>
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
    width: Dimensions.get("screen").width * 0.95,
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
  reportSubHeader: {
    backgroundColor: "#660000",
    color: "#fff",
    fontSize: 23,
    padding: -5,
  },
  reportForm: {
    padding: 10,
    color: "#000",
  },
  reportText: {
    color: "#000",
    fontSize: 20,
  },
  reportTextInput: {
    color: "#000",
    fontSize: 20,
    backgroundColor: "#DCDCDC",
  },
  buttonContainer: {
    padding: 10,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonCancel: {
    width: Dimensions.get("screen").width * 0.45,
  },
  buttonComplete: {
    width: Dimensions.get("screen").width * 0.45,
  },
});
