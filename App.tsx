/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import SearchMovies from './src/movie_app/components/SearchMovies.tsx';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <StatusBar barStyle={'light-content'} backgroundColor={'white'} />
      <SearchMovies />
    </SafeAreaView>
  );
}

export default App;
