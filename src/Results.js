import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, FlatList,
  ActivityIndicator, TouchableOpacity, Dimensions } from 'react-native';
import {Picker} from '@react-native-community/picker';

function LoadMore({setNumber}) {
  return (
    <View style={styles.loadMore}>
      <TouchableOpacity onPress={() => setNumber(number => number + 10)}>
        <Text style={styles.btnText}>Load More</Text>
      </TouchableOpacity>
    </View>
  );
}

function Recipe({recipeInfo, navigation}) {
  const { width } = Dimensions.get('window');
  const viewSize = width - 110;
  return (
    <TouchableOpacity onPress={() => navigation.navigate('Recipe', {recipeInfo: recipeInfo})}>
    <View style={styles.recipe}>
      <Image source={{uri: recipeInfo.image}} style={{width: 100, height: 100}}/>
        <View style={{paddingLeft: 10, width: viewSize}}>
          <Text style={styles.title} numberOfLines={2}>{recipeInfo.title}</Text>
          <Text>Ready in: {recipeInfo.readyInMinutes} min</Text>
          <Text>Popularity: {recipeInfo.aggregateLikes} likes</Text>
          <Text>Health Score: {recipeInfo.healthScore}</Text>
        </View>
      </View>
      </TouchableOpacity>
  )
}

function EmptyList() {
  return (
    <View >
      <Text style={{fontSize: 20}}>
        No recipe found try to modify your search or verify your connection
        </Text>
    </View>
  )
}

export default function Results({route, navigation}) {
  const [listRecipe, setListRecipe] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [number, setNumber] = useState(15);
  const [filter, setFilter] = useState("(empty)");
  const [direction, setDirection] = useState("asc");
  const search = `${route.params.search}`;
  const searchType = route.params.searchType;
  const apiKey = "&apiKey=f0eb1411b7e04d60bef499f6e6114ec1";
  useEffect(() => {
    setIsLoading(true);
    axios.get("https://api.spoonacular.com/recipes/complexSearch?" + searchType
    + search + "&sort=" + filter + "&sortDirection=" + direction +
    "&fillIngredients=true&addRecipeInformation=true&number="+ `${number}` + apiKey)
      .then(data => setListRecipe(data.data.results))
      .then(() => setIsLoading(false));
  }, [number, filter, direction]);

  return (
    <View style={{flex: 1}}>
      {isLoading &&
    <View style={styles.loading}>
      <ActivityIndicator size='large' color="#0000ff"/>
    </View>}
      <Text style={{fontSize: 16}}>Sort by:</Text>
      <View style={styles.pickers}>
        <Picker
          selectedValue={filter}
          enabled={!isLoading}
          style={{height: 30, width: 150}}
          onValueChange={itemValue => setFilter(itemValue)}>
          <Picker.Item label="None" value="(empty)" />
          <Picker.Item label="Time" value="time" />
          <Picker.Item label="Popularity" value="popularity" />
          <Picker.Item label="Healthy" value="healthiness" />
        </Picker>
        <Picker
          selectedValue={direction}
          enabled={!isLoading}
          style={{height: 30, width: 150}}
          onValueChange={itemValue => setDirection(itemValue)}>
          <Picker.Item label="Ascending" value="asc" />
          <Picker.Item label="Descending" value="desc" />
        </Picker>
      </View>
      <FlatList
        style={{flex: 1}}
        data={listRecipe}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Recipe recipeInfo={item} navigation={navigation}/>}
        ListEmptyComponent={() => !isLoading && <EmptyList/>}
        ListFooterComponent={() => number === listRecipe.length ?
          <LoadMore setNumber={setNumber} /> : null}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  recipe: {
    flexDirection: 'row', 
    borderWidth: 0.5, 
    borderColor: "#125"
  },
  title: {
    fontWeight: "bold", 
    fontSize: 20,
  },
  loading: {
    position: 'absolute',
    backgroundColor: '#AAA8',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  pickers: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  loadMore: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'blue',
    fontSize: 15,
    textAlign: 'center',
  },
});