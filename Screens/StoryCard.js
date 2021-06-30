import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image, TouchableOpacity } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons'
import StoryScreen from './StoryScreen';

let custom_font = {'Bubblegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}

export default class StoryCard extends React.Component{
    constructor(){
        super();
        this.state = {
            fontsLoaded: false,
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
        }
        else{
            return(
                <TouchableOpacity style = {styles.container} onPress = {()=>{this.props.navigation.navigate('StoryScreen', {story: this.props.story})}}>
                    <View style = {styles.cardContainer}>
                        <Image source = {require('../assets/story_image_1.png')} style = {styles.storyImg} />
                        <View style = {styles.titleContainer}>
                            <Text style = {styles.titleText}>
                                {this.props.story.title}
                            </Text>
                            <Text style = {styles.titleText}>
                                {this.props.story.author}
                            </Text>
                            <Text style = {styles.descriptionText}>
                                {this.props.story.description}
                            </Text>
                        </View>
                        <View style = {styles.actionContainer}>
                            <View style = {styles.likeButton}>
                                <Ionicons name = {"heart"} size = {RFValue(25)} color = "white" />
                                    <Text style = {styles.likeText}>
                                        12K
                                    </Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            )
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
    storyImg: {
      width: "95%",
      height: RFValue(250),
      resizeMode: "contain",
      alignSelf:"center",
    },
    titleContainer: {
      paddingLeft: RFValue(20),
      justifyContent: "center"
    },
    titleText: {
      color: "white",
      fontSize: RFValue(28),
      fontFamily: "Bubblegum-Sans"
    },
    cardContainer: {
      flex: 0.93
    },
    actionContainer:{
        justifyContent:"center",
        alignItems: "center",
        padding: RFValue(10),
    },
    likeButton:{
        width: RFValue(150),
        height:RFValue(40),
        justifyContent:"center",
        alignItems:"center",
        borderRadius: RFValue(30),
        flexDirection:"row",
        backgroundColor:"#eb3948"
    },
    likeText:{
        color:"white",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(25),
        marginLeft: RFValue(5),
        marginBottom: 50,
    },
    descriptionText:{
        color:"white",
        fontFamily:"Bubblegum-Sans",
        fontSize:RFValue(30),
        paddingTop: RFValue(10)
    }
  });