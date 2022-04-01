/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  SafeAreaView,
  View,
  ActivityIndicator,
} from 'react-native';
import NewsCard from './Newscard';
import axios from 'axios';
const App = () => {
  const [Articles, setArticles] = React.useState([]);
  const [activeIndex, setActiveIndex] = React.useState(1);
  let maxPage = 6;
  const [currentpage, setCurrentPage] = useState(1);
  const [isloading, setIsLoading] = useState(false);
  React.useEffect(() => {
    setIsLoading(true);
    var config = {
      method: 'GET',
      url: `https://newsapi.org/v2/everything?q=a&pageSize=10&page=${currentpage}&apiKey=1b56104bcae340519b0d209f8d5a613e`,
    };
    let temparr = [];
    axios(config)
      .then(function (response) {
        temparr.push(response.data.articles);
        setArticles(response.data.articles);
        console.log(response.data.articles);
        setIsLoading(false);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [currentpage]);
  function goToNextPage() {
    setCurrentPage(currentpage + 1);
    setActiveIndex(activeIndex + 1);
  }

  function goToPreviousPage() {
    setCurrentPage(currentpage - 1);
    setActiveIndex(activeIndex - 1);
  }

  const getPaginationGroup = () => {
    let start = Math.floor((currentpage - 1) / maxPage);
    return new Array(maxPage).fill().map((_, idx) => start + idx + 1);
  };
  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={{flex: 1, backgroundColor: '#fff'}}>
        {!isloading ? (
          Articles.map((items, index) => {
            return (
              <View key={index}>
                <NewsCard
                  NewsChannel={items.source.name}
                  title={items.title}
                  image={items.urlToImage}
                  PostedTime={items.publishedAt}
                />
              </View>
            );
          })
        ) : (
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#fff',
            }}>
            <ActivityIndicator size={24} color="#000" />
          </View>
        )}
      </ScrollView>
      <View style={{zIndex: 10, position: 'absolute', bottom: 30}}>
        <ScrollView horizontal={true}>
          <View
            style={{
              flexDirection: 'row',
              minWidth: '95%',
              height: 50,
              backgroundColor: '#fff',
              borderWidth: 1,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              borderColor: '#c4c4c4',
              marginHorizontal: 10,
            }}>
            <TouchableOpacity onPress={() => goToPreviousPage()}>
              <Text style={{color: '#000', fontSize: 18}}>{'<<'}</Text>
            </TouchableOpacity>
            {getPaginationGroup().map((items, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    padding: 10,
                    backgroundColor: index === activeIndex ? '#c4c4c4' : '#fff',
                  }}
                  onPress={() => {
                    setCurrentPage(items);
                    setActiveIndex(index);
                  }}>
                  <Text style={{color: '#000', fontSize: 18}}>{items}</Text>
                </TouchableOpacity>
              );
            })}
            {activeIndex === maxPage ? (
           <></>
            ) : (
              <TouchableOpacity onPress={() => goToNextPage()}>
              <Text style={{color: '#000', fontSize: 18}}>{'>>'}</Text>
            </TouchableOpacity>
            )}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default App;
