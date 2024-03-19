import React, {useState} from 'react';
import {
  Button,
  KeyboardAvoidingView,
  KeyboardAvoidingViewBase,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {getFontScale, moderateScale, verticalScale} from '../../../utils/scale';

interface ReviewProps {
  visible: boolean;
  setVisible: Function;
}

function Review(props: ReviewProps) {
  const {setVisible, visible} = props;
  const [review, setReview] = useState('');
  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <KeyboardAvoidingView

          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.innerContainer}>
          <Text style={{fontSize: getFontScale(15), fontWeight: '600'}}>
            Write your Review
          </Text>
          <TextInput
            placeholder='Write your review'
            style={styles.textInput}
            multiline={true}
            value={review}
            onChangeText={setReview}
          />
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <Button onPress={() => setVisible(false)} title="Close"></Button>

          <Button onPress={() => setVisible(false)} title="Submit"></Button>
          </View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    paddingHorizontal: moderateScale(18),
  },
  innerContainer: {
    // height:'30%',
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: verticalScale(16),
    paddingHorizontal: moderateScale(12),
  },
  textInput: {
    borderWidth: 0.4,
    marginTop: verticalScale(10),
    borderRadius: 10,
    maxHeight: moderateScale(140),
    minHeight: moderateScale(120),
    marginBottom: 10,
  },
});

export default Review;
