import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {getFontScale, moderateScale, verticalScale} from '../../../utils/scale';
import Tag from '../../../components/tag';

interface BookDetailProps {
  imageUrl: string;
  publishDate?: string;
  generes: [string];
}

function BookDetailSection(props: BookDetailProps) {
  const {imageUrl, publishDate, generes} = props;
  console.log(generes, 'gennne');
  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        source={{uri: `https://covers.openlibrary.org/b/olid/${imageUrl}.jpg`}}
      />
      <View style={styles.bookInfo}>
        <Text style={styles.publicationTitle}>Publication Year</Text>
        <Text style={styles.publicationDate}>{publishDate}</Text>
        <Text style={[styles.publicationTitle, {marginTop: verticalScale(15),marginBottom:verticalScale(8)}]}>
          Gener
        </Text>
        <View>{generes?.length > 0 ? <Tag name={generes[0]} /> : null}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingHorizontal: moderateScale(12),
  },
  image: {
    height: verticalScale(250),
    width: moderateScale(160),
    borderRadius: 16,
  },
  bookInfo: {
    alignItems: 'center',
    flex: 1,
    paddingTop: verticalScale(18),
  },
  publicationTitle: {
    fontWeight: '600',
    fontSize: getFontScale(15),
    color: 'black',
  },
  publicationDate: {
    marginTop: verticalScale(8),
  },
});

export default BookDetailSection;
