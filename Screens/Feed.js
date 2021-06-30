import AppLoading from 'expo-app-loading';
import * as React from 'react';
import { Text, View, StyleSheet, Platform, StatusBar,Image,FlatList } from 'react-native';
import * as Font from 'expo-font';
import { SafeAreaView } from 'react-native-safe-area-context';
import StoryCard from './StoryCard'
import { RFValue } from 'react-native-responsive-fontsize';

let custom_font = {'Bubbegum-Sans':require('../assets/fonts/BubblegumSans-Regular.ttf')}
let stories = require("./temp_stories.json");

export default class Feed extends React.Component{
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

    renderItem = ({item: story})=>{
        return <StoryCard story = {story} navigation = {this.props.navigation}/>
    };

    keyExtractor = (item, index)=> index.toString();

    render(){
    if(! this.state.fontsLoaded){
        return <AppLoading />
    }
    else{
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.safeView}/>
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
                    <View style = {styles.cardContainer}>
                        <FlatList 
                        keyExtractor = {this.keyExtractor}
                        data = {stories}
                        renderItem = {this.renderItem}/>
                    </View>
            </View>
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
    cardContainer: {
      flex: 0.93
    }
  });
  