import React, {useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import useFetch from '../../../hooks/useFetch';
import BookCard from '../components/bookCard';
import {getFontScale, moderateScale, verticalScale} from '../../../utils/scale';
import Header from '../../../components/header';
import Icon from 'react-native-vector-icons/dist/AntDesign';

interface HomeProps {
  navigation?: any;
}

export default function HomeScreen(props: HomeProps) {
  const {navigation} = props;
  const [booksData, setBookData] = useState<null | []>(null);
  const {
    apiData = null,
    isLoading,
    serverError,
  } = useFetch({
    url: 'https://openlibrary.org/subjects/love.json?details=true&limit=70',
  });
  const navigateToSearch = useCallback(()=>{
         navigation.navigate('searchBooks')
  },[])
  return (
    <View style={styles.container}>
      <Header
        rightIcon={
          <View style={{flexDirection: 'row', alignSelf: 'flex-end',paddingVertical:verticalScale(12)}}>
            <Text
              onPress={() => navigation.navigate('likedBooks')}
              style={{marginRight: 20, fontWeight: '600'}}>
              Liked Books
            </Text>
            <Icon onPress={navigateToSearch} name="search1" size={20} />
          </View>
        }
      />
      <Text style={styles.explore}>Explore</Text>
      {apiData ? (
        <FlatList
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          numColumns={2}
          extraData={apiData?.works}
          columnWrapperStyle={{justifyContent: 'space-between'}}
          data={apiData?.works}
          renderItem={({item}) => (
            <BookCard navigation={navigation} item={item} />
          )}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <ActivityIndicator />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: moderateScale(16),
  },
  separator: {
    height: 15,
  },
  listContainer: {
    paddingVertical: verticalScale(15),
  },
  explore: {
    fontWeight: '700',
    fontSize: getFontScale(22),
    color: 'black',
    paddingLeft: 4,
  },
});
