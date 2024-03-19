import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import LikedBookCard from '../components/likedBookCard';

interface LikedBooksProps {}

function LikedBooks(props: LikedBooksProps) {
  const [likedBooks, setLikedBooks] = useState([]);
  useEffect(() => {
    const getSavedBooks = async () => {
      let data = await AsyncStorage.getItem('fav');
      data = JSON.parse(data);
      console.log(data, 'daaaaa');
      setLikedBooks(data);
    };
    getSavedBooks();
  }, []);
  const removeFromFavourite = async (id: string) => {
    let data: any = await AsyncStorage.getItem('fav');

    data = JSON.parse(data);
    data = data.filter(item => item.id !== id);
    await AsyncStorage.setItem('fav',JSON.stringify(data))
    setLikedBooks(data);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={likedBooks}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
          <LikedBookCard removeItem={removeFromFavourite} item={item} />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default LikedBooks;
