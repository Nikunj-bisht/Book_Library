import React, {useEffect, useRef, useState} from 'react';
import {Keyboard, Pressable, StyleSheet, TextInput, View} from 'react-native';
import {moderateScale, verticalScale} from '../utils/scale';
import Icon from 'react-native-vector-icons/dist/AntDesign';
import Icon1 from 'react-native-vector-icons/dist/Entypo';

interface SearchBarProps {
  onChange: Function;
  clearValue: Function;
}

function SearchBar(props: SearchBarProps) {
  const {onChange, clearValue} = props;
  const [value, setValue] = useState('');
  const ref = useRef(null);
  useEffect(() => {
    if (value) {
      let timeOutId: any;
      timeOutId = setTimeout(() => {
        onChange(value);
      }, 800);
      return () => clearTimeout(timeOutId);
    }
  }, [value]);

  return (
    <Pressable onPress={() => ref?.current?.focus()} style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon name="search1" size={20}></Icon>
        <TextInput
          autoFocus={true}
          ref={ref}
          value={value}
          onChangeText={(val: string) => setValue(val)}
          style={styles.textInput}
        />
      </View>
      {value ? (
        <Icon1
          onPress={() => {
            setValue('');
            clearValue();
          }}
          name="cross"
          size={20}></Icon1>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    //    paddingVertical:verticalScale(12),
    borderWidth: 0.4,
    borderRadius: 10,
    marginTop: verticalScale(10),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 7,
    justifyContent: 'space-between',
  },
  textInput: {
    marginLeft: moderateScale(8),
  },
});

export default SearchBar;
