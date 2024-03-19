import React, { useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet, View } from "react-native";
import SearchBar from "../../../components/searchBar";
import BookCard from "../components/bookCard";
import { moderateScale, verticalScale } from "../../../utils/scale";

interface SearchBooksProps{
  navigation:any;
}

function SearchBooks(props:SearchBooksProps){
    const {navigation} = props
    const [searchData, setSearchData] = useState<[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);

    async function onChange(val: string) {
        if (val) {
          setSearchLoading(true);
          const searchResponse = await fetch(
            `https://openlibrary.org/search.json?title=${val}`,
          );
          const jsonData = await searchResponse.json();
          console.log(jsonData, 'json');
          setSearchData(jsonData.docs);
          setSearchLoading(false);
        }
      }
      function clearValue(){
        // setSearchData([])
      }
    return (
        <View style={styles.container}>
      <SearchBar clearValue={clearValue} onChange={onChange} />
      {!searchLoading ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          numColumns={2}
          extraData={searchData}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={searchData}
          renderItem={({item}) => (
            <BookCard isSearch={true} navigation={navigation} item={item} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator />
      )}
        </View>
    )
}

const styles = StyleSheet.create({
      container:{
      flex:1,
      paddingHorizontal:moderateScale(12),
      backgroundColor:'white'
      }, separator: {
        height: 15,
      },
      listContainer: {
        paddingVertical: verticalScale(15),
      },
})

export default SearchBooks;