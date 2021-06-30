import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image } from 'react-native';
import * as Font from 'expo-font';
import { RFValue } from 'react-native-responsive-fontsize';
import { SafeAreaView } from 'react-native-safe-area-context';
import firebase from 'firebase';

let custom_font = {'Bubbegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class Profile extends React.Component{
    constructor(){
        super();
        this.state = {
        fontsLoaded: false,
        isEnabled: false,
        lightTheme: false,
        profileImage: '',
        name: ''
        };
      }
  
    async loadFonts(){
          await Font.loadAsync(custom_font);
          this.setState({fontsLoaded: true});
    }

    fetchUser = async ()=>{
        let theme, name, image;
        await firebase.database().ref("/users/"+firebase.auth().currentUser.uid).on("value", function(snapshot){
            theme = snapshot.val().current_theme;
            name = '${snapshot.val().first_name} ${snapshot.val().last_name}'
            image = snapshot.val().profile_picture;
        });
        this.setState({lightTheme: theme==='light'?true:false,
            isEnabled: theme==='dark'?true:false,
            name: name,
            profileImage: image,
        });
    }

    toggleSwitch(){
        const previousState = this.state.isEnabled;
        const theme = ! this.state.isEnabled?"dark": "light";
        var updates = {};
        updates['/users/'+firebase.auth().currentUser.uid+"/current_theme"] = theme;
        firebase.database().ref().update(updates);
        this.setState({isEnabled: !previousState, lightTheme: previousState})
    }
  
    componentDidMount(){
        this.loadFonts();
        this.fetchUser();
    }

    render(){
        if(! this.state.fontsLoaded){
            return <AppLoading />
        }
        else{
            return(
                <View style = {{flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: 'blue'}}>
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
                        <View style = {styles.screenContainer}>
                            <View style = {styles.profileImg}>
                                <Image source = {{uri: this.state.profileImage}} style = {styles.pimg} />
                                <Text style = {styles.nametext}>{this.state.name}</Text>
                            </View>
                            <View style = {styles.themeContainer}>
                                <Text style = {styles.themetext}>Dark Theme</Text>
                               
                                <Switch style = {{transform:[{scaleX: 1.3,}, {scaleY: 1.3}]}}
                                trackColor = {{false: "#767577", true: "white"}} 
                                thumbColor = {this.state.isEnabled?"#f4f3f4" : "#ee8249"}
                                ios_backgroundColor = "#3e3e3e"
                                onValueChange = {()=>{this.toggleSwitch()}}
                                value = {this.state.isEnabled} />
                            </View>
                        </View>
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
    safeView: {
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
    themeContainer: {
      flex: 0.2,
      justifyContent:"center",
      alignItems: "center",
      flexDirection: 'row',
      marginTop: RFValue(20),
    },
    button:{
      width: RFValue(250),
      height: RFValue(50),
      flexDirection:"row",
      justifyContent:"space-evenly",
      alignItems:"center",
      borderRadius: RFValue(30),
      backgroundColor:'white',
    },
    googleIcon: {
      width: RFValue(30),
      height: RFValue(30),
      resizeMode: "contain",
    },
    nametext:{
      marginTop: RFValue(10),
      color: 'white',
      fontSize: RFValue(40),
      fontFamily: 'Bubbegum-Sans'
    },

    screenContainer: {
      flex: 0.85,
    },
    profileImg: {
      flex: 0.5,
      justifyContent:"center",
      alignItems:"center"
    },
    pimg: {
        width: RFValue(140),
        height: RFValue(140),
        borderRadius: RFValue(70),
    },
    themetext:{
        marginRight: RFValue(15),
        color: 'white',
        fontSize: RFValue(40),
        fontFamily: 'Bubbegum-Sans'
      },
  });
