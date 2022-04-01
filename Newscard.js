import React from 'react';
import {View, Text, Image} from 'react-native';
const NewsCard = ({NewsChannel, title, image, PostedTime}) => {
  React.useEffect(() => {
    console.log('data', NewsChannel, title, PostedTime);
  });
  return (
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        paddingVertical: 10,
        paddingHorizontal: 20,
      }}>
      <View style={{width: '80%'}}>
        <Text
          style={{
            lineHeight: 25,
            letterSpacing: 0.34,
            fontSize: 16,
            color: '#000',
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10}}>
          <Text style={{lineHeight: 22, letterSpacing: 0.34, color: '#c4c4c4'}}>
            {PostedTime}
          </Text>
          <Text style={{lineHeight: 22, letterSpacing: 0.34, marginLeft: 30}}>
            {NewsChannel}
          </Text>
        </View>
      </View>
      <View style={{width: 100}} />
      <Image source={{uri: image}} style={{width: 50, height: 50}} />
    </View>
  );
};

export default NewsCard;
