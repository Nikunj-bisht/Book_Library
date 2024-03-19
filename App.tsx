/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './src/modules/home/screens/home';
import BookDetail from './src/modules/home/screens/bookDetail';
import LikedBooks from './src/modules/home/screens/likedBooks';
import SearchBooks from './src/modules/home/screens/searchBooks';

type SectionProps = PropsWithChildren<{
  title: string;
}>;

const Stack = createStackNavigator();

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';
  useEffect(() => {
    SplashScreen.show();
    setTimeout(() => {
      SplashScreen.hide();
    }, 2000);
  }, []);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home" options={{headerShown: false}}>
            {props => <HomeScreen {...props} />}
          </Stack.Screen>
          <Stack.Screen name="bookDetail" options={{headerShown: true,title:"BookDetail"}}>
            {props => <BookDetail {...props} />}
          </Stack.Screen>
          <Stack.Screen name="likedBooks" options={{headerShown: true,title:"LikedBooks"}}>
            {props => <LikedBooks {...props} />}
          </Stack.Screen>
          <Stack.Screen name="searchBooks"  options={{headerShown: true,title:"Search Books"}}>
            {props => <SearchBooks {...props} />}
          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
