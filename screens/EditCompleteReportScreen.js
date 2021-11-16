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

export default class EditCompleteReportScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      dataSource: [],
      Email: "",
      status: "",
      creportID: this.props.route.params.rID,
      repoID: "",
      sourceReportID: this.props.route.params.sourceReportID,
      reporter: this.props.route.params.reporter,
      reporterCont: this.props.route.params.reporterCont,
      reporterBrgy: this.props.route.params.reporterBrgy,
      reporterLoc: this.props.route.params.reporterLoc,
      reporterInc: this.props.route.params.reporterInc,
      reporterInj: this.props.route.params.reporterInj,
      reporterDesc: this.props.route.params.reporterDesc,
      reporterDnT: this.props.route.params.reporterDnT,

      responderID: this.props.route.params.responderID,
      responderName: this.props.route.params.responderName,
      responderVHC: this.props.route.params.responderVHC,
      responderDT: this.props.route.params.responderDT,
      responderAT: this.props.route.params.responderAT,
      responderRT: this.props.route.params.responderRT,
      responderUCT: this.props.route.params.responderUCT,
      responderDist: this.props.route.params.responderDist,
      responderDesc: this.props.route.params.responderDesc,
      responderInj: this.props.route.params.responderInj,
      responderDeath: this.props.route.params.responderDeath,
      injuredResponder: this.props.route.params.injuredResponder,
      deadResponder: this.props.route.params.deadResponder,
      responderEQ: this.props.route.params.responderEQ,
      responderProb: this.props.route.params.responderProb,
      responderDoE: this.props.route.params.responderDoE,
      responderCause: this.props.route.params.responderCause,
      responderActions: this.props.route.params.responderActions,
      //data to be sent to php
      nsourceReportID: this.props.route.params.sourceReportID,
      nreporter: this.props.route.params.reporter,
      nreporterCont: this.props.route.params.reporterCont,
      nreporterBrgy: this.props.route.params.reporterBrgy,
      nreporterLoc: this.props.route.params.reporterLoc,
      nreporterInc: this.props.route.params.reporterInc,
      nreporterInj: this.props.route.params.reporterInj,
      nreporterDesc: this.props.route.params.reporterDesc,
      nreporterDnT: this.props.route.params.reporterDnT,

      nresponderID: this.props.route.params.responderID,
      nresponderName: this.props.route.params.responderName,
      nresponderVHC: this.props.route.params.responderVHC,
      nresponderDT: this.props.route.params.responderDT,
      nresponderAT: this.props.route.params.responderAT,
      nresponderRT: this.props.route.params.responderRT,
      nresponderUCT: this.props.route.params.responderUCT,
      nresponderDist: this.props.route.params.responderDist,
      nresponderDesc: this.props.route.params.responderDesc,
      nresponderInj: this.props.route.params.responderInj,
      nresponderDeath: this.props.route.params.responderDeath,
      ninjuredResponder: this.props.route.params.injuredResponder,
      ndeadResponder: this.props.route.params.deadResponder,
      nresponderEQ: this.props.route.params.responderEQ,
      nresponderProb: this.props.route.params.responderProb,
      nresponderDoE: this.props.route.params.responderDoE,
      nresponderCause: this.props.route.params.responderCause,
      nresponderActions: this.props.route.params.responderActions,

      //vars
      isDatePickerVisible: false,
      setDatePickerVisibility: false,
    };
  }
  // componentDidMount() {
  //   //load report
  //   fetch("https://alert-qc.com/mobile/loadCompletedReport.php", {
  //     method: "POST",
  //     headers: {
  //       Accept: "application/json",
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       phpcreportID: this.state.creportID,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((reseponseJson) => {
  //       this.setState({
  //         isLoading: false.valueOf,
  //         dataSource: reseponseJson,
  //       });
  //     });
  // }

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
                      {this.state.sourceReportID + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Reporter:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reporter + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Contact:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reporterCont + "\n"}
                    </Text>

                    {/* <Text style={styles.accHead}>Barangay:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterBrgy + "\n"}
                    </Text> */}

                    <Text style={styles.accHead}>Location:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterLoc + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Incident:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterInc + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Injuries:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterInj + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Description:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {this.state.reporterDesc + "\n"}
                    </Text>

                    <Text style={styles.accHead}>Date and Time:</Text>
                    <Text style={styles.itemVal} editable={false}>
                      {"\n" + this.state.reporterDnT}
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
                value={this.state.responderName}
                editable={false}
              ></TextInput>
              <Text style={styles.reportText}>Vehicle Used</Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderVHC}
                onChangeText={(data) => this.setState({ nresponderVHC: data })}
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Response Time</Text>
              <Text style={styles.reportText}>Time on Dispatch</Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderDT}
                onChangeText={(data) => this.setState({ nresponderDT: data })}
              ></TextInput>
              {/*start test*/}
              {/*start test*/}
              <Text style={styles.reportText}>Time on Arrival on Scene</Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderAT}
                onChangeText={(data) => this.setState({ nresponderAT: data })}
              ></TextInput>
              <Text style={styles.reportText}>Time on Return to Base</Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderRT}
                onChangeText={(data) => this.setState({ nresponderRT: data })}
              ></TextInput>
              <Text style={styles.reportText}>
                Time on Incident Under Control
              </Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderUCT}
                onChangeText={(data) => this.setState({ nresponderUCT: data })}
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Incident Description</Text>
              <Text style={styles.reportText}>
                Approximate Distance from Base(km)
              </Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                defaultValue={this.state.responderDist}
                onChangeText={(data) => this.setState({ nresponderDist: data })}
              ></TextInput>
              <Text style={styles.reportText}>
                Description of Incident and Location
              </Text>
              <TextInput
                style={styles.reportTextInput}
                defaultValue={this.state.responderDesc}
                onChangeText={(data) => this.setState({ nresponderDesc: data })}
              ></TextInput>
              <Text>{"\n"}</Text>
              <Text style={styles.reportSubHeader}>Civilian Casualties</Text>
              <Text style={styles.reportText}>Injured</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                defaultValue={this.state.responderInj}
                onChangeText={(data) => this.setState({ nresponderInj: data })}
              ></TextInput>
              <Text style={styles.reportText}>Deaths</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                defaultValue={this.state.responderDeath}
                onChangeText={(data) =>
                  this.setState({ nresponderDeath: data })
                }
              ></TextInput>
              <Text>{"\n"}</Text>
              <Text style={styles.reportSubHeader}>Responder Casualties</Text>
              <Text style={styles.reportText}>Injured</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                defaultValue={this.state.injuredResponder}
                onChangeText={(data) =>
                  this.setState({ ninjuredResponder: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>Deaths</Text>
              <TextInput
                style={styles.reportTextInput}
                keyboardType={"numeric"}
                defaultValue={this.state.deadResponder}
                onChangeText={(data) => this.setState({ ndeadResponder: data })}
              ></TextInput>

              <Text>{"\n"}</Text>
              <Text style={styles.reportHeader}>Actions Made</Text>
              <Text style={styles.reportText}>Equipment Used</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                defaultValue={this.state.responderEQ}
                onChangeText={(data) => this.setState({ nresponderEQ: data })}
              ></TextInput>
              <Text style={styles.reportText}>Problems Encountered</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                defaultValue={this.state.responderProb}
                onChangeText={(data) => this.setState({ nresponderProb: data })}
              ></TextInput>
              <Text style={styles.reportText}>Description of Events</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                defaultValue={this.state.responderDoE}
                onChangeText={(data) => this.setState({ nresponderDoE: data })}
              ></TextInput>
              <Text style={styles.reportText}>Cause of Incident</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={2}
                defaultValue={this.state.responderCause}
                onChangeText={(data) =>
                  this.setState({ nresponderCause: data })
                }
              ></TextInput>
              <Text style={styles.reportText}>Actions Taken</Text>
              <TextInput
                style={styles.reportTextInput}
                multiline
                numberOfLines={5}
                defaultValue={this.state.responderActions}
                onChangeText={(data) =>
                  this.setState({ nresponderActions: data })
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
                  title="Update"
                  color="#87c830"
                  onPress={() => {
                    if (this.state.nresponderVHC === "" ||
                        this.state.nresponderDT === "" ||
                        this.state.nresponderAT === "" ||
                        this.state.nresponderRT === "" ||
                        this.state.nresponderUCT === "" ||
                        this.state.nresponderDist === "" ||
                        this.state.nresponderDesc === "" ||
                        this.state.nresponderInj === "" ||
                        this.state.nresponderDeath === "" ||
                        this.state.ninjuredResponder === "" ||
                        this.state.ndeadResponder === "" ||
                        this.state.nresponderEQ === "" ||
                        this.state.nresponderProb === "" ||
                        this.state.nresponderDoE === "" ||
                        this.state.nresponderCause === "" ||
                        this.state.nresponderActions === ""){
                      Alert.alert("Please Fill Up all Fields");
                    }else{
                    fetch(
                      "https://alert-qc.com/mobile/updateResponderReport.php",
                      {
                        method: "POST",
                        headers: {
                          Accept: "application/json",
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          //send incident report data
                          // phpRID: this.state.nsourceReportID,
                          // phpName: this.state.nreporter,
                          // phpreporterContact: this.state.nreporterCont,
                          // phpreporterBarangay: this.state.nreporterBrgy,
                          // phpreporterLocation: this.state.nreporterLoc,
                          // phpreporterIncident: this.state.nreporterInc,
                          // phpreporterInjured: this.state.nreporterInj,
                          // phpreportDesc: this.state.nreporterDesc,
                          // phpreportDnT: this.state.nreporterDnT,

                          // //send incident responder report data
                          // phpresponderID: this.state.nresponderID,
                          // phpresponderName: this.state.nresponderName,
                          creportID: this.state.creportID,
                          phpresponderVehicle: this.state.nresponderVHC,
                          phpresponderDT: this.state.nresponderDT,
                          phpresponderAT: this.state.nresponderAT,
                          phpresponderRT: this.state.nresponderRT,
                          phpresponderUCT: this.state.nresponderUCT,
                          phpresponderIncDistance: this.state.nresponderDist,
                          phpresponderLocDesc: this.state.nresponderDesc,
                          phpresponderCInjured: this.state.nresponderInj,
                          phpresponderCDeaths: this.state.nresponderDeath,
                          phpresponderRInjured: this.state.ninjuredResponder,
                          phpresponderRDeaths: this.state.ndeadResponder,
                          phpresponderEq: this.state.nresponderEQ,
                          phpresponderProb: this.state.nresponderProb,
                          phpresponderDescOfEvents: this.state.nresponderDoE,
                          phpresponderCoI: this.state.nresponderCause,
                          phpresponderAction: this.state.nresponderActions,
                        }),
                      }
                    )
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
                        } else if (
                          responseJson === "Please Fill up all Fields"
                        ) {
                          Alert.alert(responseJson);
                        } else {
                          Alert.alert(responseJson);
                        }
                      })
                      .catch((err) => {
                        console.error(err);
                      });
                    }
                    console.log(this.state.creportID);
                    console.log(this.state.nresponderVHC);
                    console.log(this.state.nresponderDT);
                    console.log(this.state.nresponderAT);
                    console.log(this.state.nresponderRT);
                    console.log(this.state.nresponderUCT);
                    console.log(this.state.nresponderDist);
                    console.log(this.state.nresponderDesc);
                    console.log(this.state.nresponderInj);
                    console.log(this.state.nresponderDeath);
                    console.log(this.state.ninjuredResponder);
                    console.log(this.state.ndeadResponder);
                    console.log(this.state.nresponderEQ);
                    console.log(this.state.nresponderProb);
                    console.log(this.state.nresponderDoE);
                    console.log(this.state.nresponderCause);
                    console.log(this.state.nresponderActions);
                  }}
                >
                  <Text>Update Report</Text>
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
