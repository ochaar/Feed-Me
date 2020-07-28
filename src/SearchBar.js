import React, { useState }  from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems:'center',
    backgroundColor: '#F2F2F2',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});

/* The component to search something in a list */
export default function MySearchBar ({navigation}) {
  const [text, setText] = useState('');
  return (
    <View style={styles.searchBar}>
      <Icon name="search" size={20} style={{padding: 5}}/>
      <TextInput
        style={{flex: 1}}
        onChangeText={text => setText(text)}
        onClear={text => setText('')}
        onSubmitEditing={() => navigation.navigate('Results', {search: text, searchType: "query="})}
        value={text}
        placeholder='Search for recipe'/>
    </View>
  )
};
