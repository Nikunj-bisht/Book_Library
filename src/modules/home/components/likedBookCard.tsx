import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { getFontScale, moderateScale, verticalScale } from "../../../utils/scale";
import Icon1 from 'react-native-vector-icons/dist/AntDesign';

interface LikedBookProps{
    item:any;
    removeItem:Function
}

function LikedBookCard(props:LikedBookProps){
    const {item,removeItem} = props;
    
    return (
        <View style={styles.card}>
          <View>
          <Image style={styles.image} source={{uri:`https://covers.openlibrary.org/b/olid/${item.imageKey}.jpg`}}/>
          </View>
          <View style={{width:"65%"}}>
            <Text style={styles.title}>{item.title}</Text>
            <Text >By - {item.authors}</Text>
          </View>
          <Icon1
                    onPress={()=>removeItem(item.id)}
                    style={{paddingRight: 5}}
                    color="grey"
                    name="delete"
                    size={20}
                  />
        </View>
    )
}

const styles = StyleSheet.create({
      card:{
          flexDirection:'row',
          paddingVertical:verticalScale(18),
          paddingHorizontal:moderateScale(18),
          marginBottom:verticalScale(7)
      },image:{
        height:verticalScale(100),
        width:moderateScale(80),
        borderRadius:16,
        marginRight:moderateScale(20)
     },title:{
        marginTop:verticalScale(12),
        marginBottom:verticalScale(12),
        fontSize:getFontScale(18),
        color:'black'
     }
})

export default React.memo(LikedBookCard);