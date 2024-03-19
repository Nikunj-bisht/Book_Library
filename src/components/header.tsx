import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { moderateScale, verticalScale } from "../utils/scale";

interface HeaderProps{
    text?: string;
    rightIcon?:any
}

function Header(props:HeaderProps){
    const {text = null,rightIcon = null} = props;
    return (
        <View style={styles.header}>
         {
            text && <Text>{text}</Text>
         }
         {
            rightIcon && rightIcon
         }
        </View>
    )
}

const styles = StyleSheet.create({
    header:{
         paddingVertical:verticalScale(10),
         paddingHorizontal:moderateScale(8)
    }
})


export default Header;