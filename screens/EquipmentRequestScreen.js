import React, { Component } from 'react';
import { Dimensions } from 'react-native';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';


class EquipmentRequestScreen extends Component {

  constructor(props){
    super(props);
    this.state = {
      textInput : [],
      inputData : [],
    }
  }

  //function to add TextInput dynamically
  addTextInput = (index) => {
    let textInput = this.state.textInput;
    textInput.push(
    <View>
      <TextInput style={styles.textInput}
      placeholder={"Equipment"}
      onChangeText={(text) => this.addValues(text,index)} />
      <TextInput style={styles.textInput2}
      placeholder={"Quantity"}
      onChangeText={(qty) => this.addValues2(qty,index)} />
    </View>);
    this.setState({ textInput });
  }

  //function to remove TextInput dynamically
  removeTextInput = () => {
    let textInput = this.state.textInput;
    let inputData = this.state.inputData;
    textInput.pop();
    inputData.pop();
    this.setState({ textInput,inputData });
  }

  //function to add text from TextInputs into single array
  addValues = (text, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.text = text;
          checkBool = true;
        }
        
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'text':text,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }
  
  addValues2 = (qty, index) => {
    let dataArray = this.state.inputData;
    let checkBool = false;
    if (dataArray.length !== 0){
      dataArray.forEach(element => {
        if (element.index === index ){
          element.qty = qty;
          checkBool = true;
        }
        
      });
    }
    if (checkBool){
    this.setState({
      inputData: dataArray
    });
  }
  else {
    dataArray.push({'qty':qty,'index':index});
    this.setState({
      inputData: dataArray
    });
  }
  }

  //function to console the output
  getValues = () => {
    console.log('Data',this.state.inputData);
  }


  render(){
    return(
      <View>
        <View style= {styles.row}>
          <View style={{margin: 10}}>
        <Button title='Add' onPress={() => this.addTextInput(this.state.textInput.length)} />
        </View>
        <View style={{margin: 10}}>
        <Button title='Remove' onPress={() => this.removeTextInput()} />
        </View>
        </View>
        {this.state.textInput.map((value) => {
          return value
        })}
        <View style={styles.buttonValue}>
        <Button  title='View Request' onPress={() => this.getValues()} />
        </View>
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: 'white',
},
buttonView: {
  flexDirection: 'row'
},
  textInput: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  margin: 20,
  marginBottom: 0,
},
textInput2: {
  height: 40,
  borderColor: 'black', 
  borderWidth: 1,
  marginTop: 5,
  marginLeft: 20,
  marginBottom: 20,
  width: Dimensions.get("screen").width * 0.20,
},
buttonValue: {
  margin: 20,
},
row:{
  flexDirection: 'row',
  justifyContent: 'center'
},
texteq:{
  textAlign:'left'
},
textqty: {
  textAlign:'right'
}
});

export default EquipmentRequestScreen;