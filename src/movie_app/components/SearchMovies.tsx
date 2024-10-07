import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import {searchMoviesByQuery} from '../movieService.ts';
import {debugError, debugLog} from '../../logger/Logger.ts';
import {StringResources} from '../../resources/StringResources.ts';
import {Icon} from '../../resources/image';
import {Color} from '../../resources/colors';
import {IMAGE_URL} from '../Config.ts';
import PopularMovies from './PopularMovies.tsx';
import NoResult from './NoResult.tsx';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

const onShowNoResult = (query: string) => {
  debugLog('onShowNoResult', query);
  return <NoResult message={`${StringResources('NoMovie')} ${query}`} />;
};

const SearchMovies = () => {
  const [query, setQuery] = useState<string>('');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const searchMovies = async (q: string) => {
    setLoading(true);
    try {
      const searchedMoviesData = await searchMoviesByQuery(q);
      setLoading(false);
      if (searchedMoviesData.length > 0) {
        setMovies(searchedMoviesData);
      } else {
        onShowNoResult(query);
      }
    } catch (error) {
      setLoading(false);
      debugError('searchMovies', error);
    }
  };

  useEffect(() => {
    if (query.length === 0) {
      setMovies([]);
      return;
    }
    if (query.length < 2) {
      setMovies([]);
      return;
    }

    const handle = setTimeout(() => {
      void searchMovies(query);
    }, 250);

    return () => {
      clearTimeout(handle);
    };
  }, [query]);

  useEffect(() => {
    if (movies.length === 0) {
      onShowNoResult(query);
    }
  }, [movies, query]);

  const renderMovieList = () => {
    if (query.length === 0) {
      return <PopularMovies />;
    }
    return (
      <View style={styles.container}>
        <FlatList
          showsVerticalScrollIndicator={false}
          data={movies}
          keyExtractor={item => item.id.toString()}
          renderItem={({item}) => (
            <View style={styles.movieItem}>
              <Image
                source={{
                  uri: `${IMAGE_URL}${item.poster_path}`,
                }}
                style={styles.poster}
              />
              <View style={styles.movieInfo}>
                <Text style={styles.title}>{item.title}</Text>
                <Text>Release Date: {item.release_date}</Text>
                <Text>{item.overview.slice(0, 300)}...</Text>
              </View>
            </View>
          )}
        />
      </View>
    );
  };

  return (
    <View>
      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Movie Explorer</Text>
      </View>

      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Image source={Icon.searchIcon} style={styles.iconStyle} />
          <TextInput
            placeholder={StringResources('SearchMovie')}
            value={query}
            style={styles.input}
            onChangeText={setQuery}
            autoCapitalize="none"
            autoCorrect={false}
          />
          {loading ? (
            <ActivityIndicator size="small" color={Color.primary} />
          ) : null}
        </View>
        {renderMovieList()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  appBar: {
    height: 55,
    backgroundColor: Color.primary,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  appBarTitle: {
    color: Color.white,
    fontSize: 20,
    fontWeight: 'bold',
    paddingStart: 16,
  },

  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: Color.white,
  },
  input: {
    flex: 1,
  },
  iconStyle: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  movieItem: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  poster: {
    width: 100,
    height: 150,
  },
  movieInfo: {
    marginLeft: 10,
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default SearchMovies;
