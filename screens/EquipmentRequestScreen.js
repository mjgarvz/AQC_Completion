import React, { Component } from "react";
import { ScrollView } from "react-native";
import { Alert } from "react-native";
import { TouchableWithoutFeedback } from "react-native";
import { SafeAreaView } from "react-native";
import { Dimensions } from "react-native";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  KeyboardAvoidingView,
  StatusBar,
} from "react-native";

class EquipmentRequestScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repoID: this.props.route.params.rID,
      textInput: [],
      inputData: [],

      textToState: "",
      qtyToState: "",
      viewReq: "",

      textToPhp: "",
      qtyToPhp: "",
    };
  }
  componentDidMount() {
    this.addTextInput(this.state.textInput.length);
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(
      <View>
        <TextInput
          style={styles.textInput}
          placeholder={"Equipment"}
          onChangeText={(text) => this.addValues(text, index)}
        />
        <TextInput
          style={styles.textInput2}
          placeholder={"Quantity"}
          onChangeText={(qty) => this.addValues2(qty, index)}
        />
      </View>
    );
    this.setState({ textInput });
  };

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput, inputData });
    this.setState({ textToState: "", qtyToState: "", viewReq: "" });
  };

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.text = text;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({ text: text, index: index });
      this.setState({
        inputData: dataArray,
      });
    }
  };

  addValues2 = (qty, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0) {
      dataArray.forEach((element) => {
        if (element.index === index) {
          element.qty = qty;
          checkBool = true;
        }
      });
    }
    if (checkBool) {
      this.setState({
        inputData: dataArray,
      });
    } else {
      dataArray.push({ qty: qty, index: index });
      this.setState({
        inputData: dataArray,
      });
    }
  };

  //function to console the output
  getValues = () => {
    console.log("Data", this.state.inputData);

    this.state.inputData.filter((element) => {
      this.state.textToState = this.state.textToState.concat(
        element.text,
        ",\n"
      );
      this.state.qtyToState = this.state.qtyToState.concat(
        element.qty,
        ",\n"
      );
      this.state.viewReq = this.state.viewReq.concat(
        "x",
        element.qty,
        " ",
        element.text,
        "\n"
      );
      console.log(this.state.textToState);
      console.log(this.state.qtyToState);
      //alert then fetch
    });

    Alert.alert(
      "Request Preview",
      "Equipment to be requested \n" + this.state.viewReq,
      [
        {
          text: "Cancel",
          onPress: () => {
            this.setState({ textToState: "", qtyToState: "", viewReq: "" });
          },
          style: "cancel",
        },
        {
          text: "OK",
          onPress: () => {
            fetch("https://alert-qc.com/mobile/createResponderEqReq.php", {
              method: "POST",
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                phpRID: this.state.repoID,
                textToPhp: this.state.textToState,
                qtyToPhp: this.state.qtyToState,
              })
            })
              .then((response) => response.json())
              .then((responseJson) => {
                // If the Data matched.
                if (responseJson === "Request Sent") {
                  Alert.alert("Request Sent","", [
                    {
                      text: "OK",
                      onPress: () => {
                        this.props.navigation.goBack(null);
                      },
                    },
                  ]);
                } else {
                  Alert.alert("Try Again");
                }
              })
              .catch((err) => {
                console.error(err);
              });

            console.log(this.state.repoID);
            this.setState({ textToState: "", qtyToState: "", viewReq: "" });
          },
        },
      ]
    );
  };
  exitReset = () => {
    Alert.alert("Cancel?", "Canceling will discard all changes made", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Discard",
        onPress: () => {
          this.props.navigation.goBack(null);
        },
      },
    ]);

    console.log("discard");
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={{
          flex: 1,
          height: "100%",
          width: "100%",
        }}
      >
        <ScrollView style={styles.container}>
          <View style={styles.row}>
            <View style={{ margin: 10 }}>
              <Button
                title="Add"
                onPress={() => this.addTextInput(this.state.textInput.length)}
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button title="Remove" onPress={() => this.removeTextInput()} />
            </View>
          </View>
          {this.state.textInput.map((value) => {
            return value;
          })}
          <View style={styles.buttonValue}>
            <TouchableWithoutFeedback style={styles.buttonStyle}>
              <Button title="Cancel" onPress={() => this.exitReset()} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback style={styles.buttonStyle}>
              <Button title="View Request" onPress={() => this.getValues()} />
            </TouchableWithoutFeedback>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonView: {
    flexDirection: "row",
  },
  textInput: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    margin: 20,
    marginBottom: 0,
  },
  textInput2: {
    height: 40,
    borderColor: "black",
    borderWidth: 1,
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 20,
    width: Dimensions.get("screen").width * 0.2,
  },
  buttonValue: {
    margin: 20,
    justifyContent: "space-between",
    flexDirection: "row",
  },
  buttonStyle: {
    width: Dimensions.get("screen").width * 0.45,
  },
  row: {
    flexDirection: "row",
    justifyContent: "center",
  },
  texteq: {
    textAlign: "left",
  },
  textqty: {
    textAlign: "right",
  },
});

export default EquipmentRequestScreen;
