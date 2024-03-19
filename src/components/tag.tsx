import React from "react";
import { StyleSheet, Text } from "react-native";
import { moderateScale, verticalScale } from "../utils/scale";

interface TagProps{
   name:string;
}



function Tag(props:TagProps){
    const {name} = props;
    return (
        <Text numberOfLines={2} style={styles.tagStyle}>{name}</Text>
    )
}

const styles = StyleSheet.create({
    tagStyle:{
       paddingVertical:verticalScale(8),
       paddingHorizontal:moderateScale(8),
       borderWidth:0.3,
       backgroundColor:"#AE7460",
       maxWidth:moderateScale(130),
       borderRadius:20,
       color:'white'
    }
})


export default Tag;