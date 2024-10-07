import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {getPopularMovies} from '../movieService.ts';
import {IMAGE_URL} from '../Config.ts';
import {StringResources} from '../../resources/StringResources.ts';

interface Movie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  overview: string;
}

const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [loadingPopular, setLoadingPopular] = useState<boolean>(false);

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoadingPopular(true);
      try {
        const popularMoviesData = await getPopularMovies();
        setPopularMovies(popularMoviesData);
        setLoadingPopular(false);
      } catch (error) {
        setLoadingPopular(false);
      }
    };

    void fetchPopularMovies();
  }, []);

  if (loadingPopular) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View>
      <Text style={styles.sectionTitle}>
        {StringResources('PopularMovies')}
      </Text>
      <FlatList
        data={popularMovies}
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
              <Text>{item.overview.slice(0, 100)}...</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
  },
});

export default PopularMovies;
