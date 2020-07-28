import React from 'react';
import MySearchBar from './SearchBar';
import { StyleSheet, SectionList, Text, View, TouchableOpacity } from 'react-native';

function List({title, item, navigation}) {
  const type = title === "Dish type" ? "type" : title;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Results', {search: item, searchType: type + "="})}>
    <View style={styles.list}>
      <Text style={{padding: 10}}>{item}</Text> 
    </View>
    </TouchableOpacity>
  )
}

export default function CategorieList ({navigation}) {
  const categories = [
  {
    title: "cuisine",
    data: ["African", "American", "British", "Cajun", "Caribbean",
    "Chinese", "Eastern European", "European", "French", "German", "Greek", 
    "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
    "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish",
    "Thai", "Vietnamese"]
  },
  {
    title: "Dish type",
    data: ["main course", "side dish", "dessert", "appetizer", "salad", "bread",
    "breakfast", "soup", "beverage", "sauce", "marinade", "fingerfood", "snack",
    "drink"]
  }
];
  
  return (
    <View style={styles.view}>
      <MySearchBar navigation={navigation}/>
      <SectionList
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={({ item, section: {title} }) => <List title={title} item={item} navigation={navigation}/>}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.header}>{title}</Text>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1
  },
  list: {
    height: 30, 
    borderWidth: 0.2, 
    justifyContent: 'center'
  },
  header: {
    fontSize: 24,
    backgroundColor: '#6666CC',
    color: 'white',
    padding: 10
  }
});
