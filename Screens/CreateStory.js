import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image,TextInput, ScrollView, Dimensions } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';

let custom_font = {'Bubbegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')};

export default class Feed extends React.Component{
    constructor(){
        super();
        this.state = {
            fontsLoaded: false,
            previewImage: 'image_1',
            dropdownheight: 40,
        };
    }

    async loadFonts(){
        await Font.loadAsync(custom_font);
        this.setState({fontsLoaded: true});
    }

    componentDidMount(){
        this.loadFonts();
    }

    render(){
    if(! this.state.fontsLoaded){
        return <AppLoading />
    }else{
        let previewImages = {
            "image_1": require('../assets/story_image_1.png'),
            "image_2": require('../assets/story_image_2.png'),
            "image_3": require('../assets/story_image_3.png'),
            "image_4": require('../assets/story_image_4.png'),
            "image_5": require('../assets/story_image_5.png'),
        }
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.safeview}/>
                    <View style = {styles.appTitle}>
                        <View style = {styles.appIcon}>
                                <Image source = {require('../assets/logo.png')} style = {styles.iconImage}/>
                        </View>
                        <View style = {styles.appTitleTextContainer}>
                            <Text style = {styles.appTitleText}>
                                Story-Telling App
                            </Text>
                        </View>
                    </View>
                    <ScrollView style = {styles.feildContainer}>
                        <View style = {styles.imageContainer}>
                            <View style = {styles.previewContainer}>
                                <Image  source = {previewImages[this.state.previewImage]} 
                                style = {{resizeMode:"contain",
                                          width: Dimensions.get('window').width-40,
                                          height: 250,
                                          borderRadius:10,
                                          marginBottom:10}}/>
                            </View>
                            <View style = {{height: RFValue(this.state.dropdownheight)}}>
                                <DropDownPicker items = {[
                                    {label: 'image 1', value: 'image_1'},
                                    {label: 'image 2', value: 'image_2'},
                                    {label: 'image 3', value: 'image_3'},
                                    {label: 'image 4', value: 'image_4'},
                                    {label: 'image 5', value: 'image_5'},
                                ]}
                                defaultValue = {this.state.previewImage}
                                containerStyle = {{height: 40, borderRadius: 20, marginBottom: 10}}
                                style = {{backgroundColor: 'transparent'}}
                                onOpen = {()=>{this.setState({dropdownheight: 170})}}
                                onClose = {()=>{this.setState({dropdownheight: 40})}}
                                itemStyle = {{justifyContent:"flex-start"}}
                                dropDownStyle = {{backgroundColor: '#2f345d'}}
                                labelStyle = {{color: 'white', fontFamily:'Bubblegum-Sans'}}
                                arrowStyle = {{color: 'white', fontFamily:'Bubblegum-Sans'}}
                                onChangeItem = {item=>this.setState({previewImage: item.value})}
                                />
                            </View>
                            <TextInput onChangeText = {title=>{this.setState({title})}}
                                    placeholder = {'Title'}
                                    placeholderTextColor = 'white'
                            style = {styles.inputFont}></TextInput>

                            <TextInput onChangeText = {description=>{this.setState({description})}}
                                    placeholder = {'Description'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {4}
                                    style={[styles.inputFont,styles.inputFontExtra,styles.inputTextBig]}
                            ></TextInput>

                            <TextInput onChangeText = {story=>{this.setState({story})}}
                                    placeholder = {'Story'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {20}
                                    style={[styles.inputFont,styles.inputFontExtra,styles.inputTextBig]}
                            ></TextInput>

                            <TextInput onChangeText = {moral=>{this.setState({moral})}}
                                    placeholder = {'Moral of the Story'}
                                    placeholderTextColor = 'white'
                                    multiline = {true}
                                    numberOfLines = {4}
                                    style={[styles.inputFont,styles.inputFontExtra,styles.inputTextBig]}
                            ></TextInput>
                        </View>
                    </ScrollView>
                </View>
        );
    }
}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#15193c"
    },
    safeview: {
      marginTop: Platform.OS === "android" ? StatusBar.currentHeight : RFValue(35)
    },
    appTitle: {
      flex: 0.07,
      flexDirection: "row"
    },
    appIcon: {
      flex: 0.3,
      justifyContent: "center",
      alignItems: "center"
    },
    iconImage: {
      width: "100%",
      height: "100%",
      resizeMode: "contain"
    },
    appTitleTextContainer: {
      flex: 0.7,
      justifyContent: "center"
    },
    appTitleText: {
      color: "white",
      fontSize: RFValue(25),
      fontFamily: "Bubblegum-Sans"
    },
    feildContainer: {
      flex: 0.85
    },
        previewContainer:{
        width: "93%",
        height: RFValue(250),
        alignSelf: "center",
        borderRadius: RFValue(10),
        marginVertical: RFValue(10),
        resizeMode: "contain"
    },
    inputFont:{
        height: RFValue(40),
        borderColor: "white",
        borderWidth: RFValue(1),
        borderRadius: RFValue(10),
        paddingLeft: RFValue(10),
        color: "white",
        fontFamily: "Bubblegum-Sans"
    },
    inputFontExtra: {
        marginTop: RFValue(15)
      },
      inputTextBig: {
        textAlignVertical: "top",
        padding: RFValue(5)
      }
  });