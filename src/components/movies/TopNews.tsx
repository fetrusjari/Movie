// src/components/movies/TopNews.js

import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const API_NEWS_TOKEN = 'YOUR_NEWS_API_KEY'; // Ganti dengan kunci API berita Anda

const TopNews = ({ movieTitle }) => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    fetchTopNews();
  }, [movieTitle]);

  const fetchTopNews = async () => {
    try {
      const response = await fetch(`https://newsapi.org/v2/everything?q=${movieTitle}&apiKey=${API_NEWS_TOKEN}`);
      const data = await response.json();
      setNews(data.articles);
    } catch (error) {
      console.error('Error fetching top news:', error);
    }
  };

  const renderItem = ({ item }) => (
    <View style={styles.newsItem}>
      <Text style={styles.newsTitle}>{item.title}</Text>
      <Text style={styles.newsDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Top News</Text>
      <FlatList
        data={news}
        renderItem={renderItem}
        keyExtractor={(item) => item.url}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  newsItem: {
    marginBottom: 16,
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  newsDescription: {
    fontSize: 14,
  },
});

export default TopNews;
