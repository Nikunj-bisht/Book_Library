import React, {useCallback, useEffect} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import {getFontScale, moderateScale, verticalScale} from '../../../utils/scale';

interface BookCardProps {
  item: any;
  navigation: any;
  isSearch?: boolean;
}

function BookCard(props: BookCardProps) {
  const {item, navigation, isSearch = false} = props;
  const navigate = useCallback(() => {
    navigation.navigate('bookDetail', {
      id: item.key,
      imageKey: item.cover_edition_key,
      authors: item.authors,
    });
  }, []);

  return (
    <Pressable onPress={navigate} style={styles.container}>
      <Image
        resizeMode="cover"
        // loadingIndicatorSource={<Image style={{width:80,height:80}} source={require('../../../assets/launch_screen.jpg')}></Image> }
        style={styles.coverImage}
        source={{
          uri: `https://covers.openlibrary.org/b/olid/${item?.cover_edition_key}.jpg`,
        }}
      />
      <View style={styles.bookDetails}>
        <Text numberOfLines={2} style={styles.title}>
          {item?.title}
        </Text>
        <Text style={styles.author}>
          By {isSearch ? item?.author_name ?  item?.author_name[0] : "" : item?.authors[0].name}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: moderateScale(170),
    height: 300,
    overflow: 'hidden',
    borderRadius: 16,
    // borderWidth:0.2
  },
  coverImage: {
    width: '100%',
    height: verticalScale(220),
    borderRadius: 16,
  },
  title: {
    fontWeight: '700',
    fontSize: getFontScale(16),
    color: 'black',
    marginTop: verticalScale(10),
  },
  bookDetails: {
    paddingHorizontal: moderateScale(8),
  },
  author: {
    fontWeight: '500',
    marginTop: verticalScale(3),
  },
});

export default React.memo(BookCard);
