import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import useFetch from '../../../hooks/useFetch';
import BookDetailSection from '../components/bookDetailSection';
import {getFontScale, moderateScale, verticalScale} from '../../../utils/scale';
import Icon from 'react-native-vector-icons/dist/EvilIcons';
import Icon1 from 'react-native-vector-icons/dist/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Review from '../components/review';

interface BookDetailProps {
  route?: any;
}

function BookDetail(props: BookDetailProps) {
  const {route} = props;
  const [liked, setLiked] = useState(false);
  const [visible, setVisible] = useState(false);
  const {
    apiData = null,
    isLoading,
    serverError,
  } = useFetch({url: `https://openlibrary.org${route.params.id}.json`});
  useEffect(() => {
    const checkForLike = async () => {
      let data: any = await AsyncStorage.getItem('fav');
      if (data) {
        data = JSON.parse(data);
        let index = data.find(item => item.id === route.params.id);
        if (index) {
          setLiked(true);
        }
      }
    };
    checkForLike();
  }, []);
  const getAuthorsName = useMemo(() => {
    let authors = '';
    authors = route.params.authors.map(item => item.name).join(', ');
    return authors;
  }, []);
  const addToFavourite = useCallback(async () => {
    let favouriteBooks = [];
    let data = await AsyncStorage.getItem('fav');

    if (!liked) {
      if (data) {
        favouriteBooks = JSON.parse(data);
      }
      favouriteBooks.push({
        id: route.params.id,
        imageKey: route.params.imageKey,
        title: apiData.title,
        authors: getAuthorsName,
      });
    } else {
      favouriteBooks = JSON.parse(data);
      favouriteBooks = favouriteBooks.filter(
        item => item.id !== route.params.id,
      );
    }
    await AsyncStorage.setItem('fav', JSON.stringify(favouriteBooks));

    setLiked(!liked);
  }, [liked, apiData]);
  console.log(apiData, 'popopop');
  return (
    <View style={styles.container}>
      <ScrollView>
        {apiData ? (
          <View style={styles.bookDetails}>
            <BookDetailSection
              generes={apiData?.subjects}
              publishDate={apiData?.first_publish_date}
              imageUrl={route.params.imageKey}
            />
            <View style={styles.description}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingRight: 10,
                }}>
                <View style={{width: '80%'}}>
                  <Text style={styles.title}>{apiData.title}</Text>
                  <Text style={styles.authors}>By - {getAuthorsName}</Text>
                </View>
                {liked ? (
                  <Icon1
                    onPress={addToFavourite}
                    style={{paddingRight: 5}}
                    color="red"
                    name="heart"
                    size={26}
                  />
                ) : (
                  <Icon onPress={addToFavourite} name="heart" size={35} />
                )}
              </View>
              <Text style={styles.bookDescription}>
                {typeof apiData.description === 'object'
                  ? apiData.description.value
                  : apiData?.description}
              </Text>
            </View>
            {/* <Image source={}/> */}
            <Text
              onPress={() => setVisible(true)}
              style={{
                color: '#23629E',
                fontWeight: '400',
                fontSize: getFontScale(13),
                paddingLeft: 10,
                paddingBottom: verticalScale(30),
                paddingTop:verticalScale(12)
              }}>
              Write a Review
            </Text>
          </View>
        ) : (
          <ActivityIndicator />
        )}

        <Review setVisible={setVisible} visible={visible} />
      </ScrollView>

      {/* <Button  title='Review'/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bookDetails: {
    // flexDirection:'row',
    paddingVertical: verticalScale(20),
  },
  title: {
    fontWeight: '600',
    fontSize: getFontScale(30),
    color: 'black',
  },
  description: {
    paddingHorizontal: moderateScale(10),
    marginTop: verticalScale(22),
  },
  authors: {
    fontWeight: '400',
    fontSize: getFontScale(15),
    color: '#AE7460',
  },
  bookDescription: {
    fontWeight: '400',
    fontSize: getFontScale(15),
    lineHeight: 30,
    marginTop: verticalScale(20),
  },
  button: {
    paddingVertical: verticalScale(20),
  },
});

export default BookDetail;
