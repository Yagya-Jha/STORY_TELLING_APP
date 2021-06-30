import * as React from 'react';
import { Text, View } from 'react-native';

export default class Logout extends React.Component{
    render(){
        return(
            <View style = {{flex: 1, justifyContent:"center", alignItems:"center", backgroundColor: 'pink'}}>
                <Text>
                    Successfully Logged Out
                </Text>
            </View>
        )
    }
}