import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, FlatList,
  ActivityIndicator, TouchableOpacity, Dimensions, Button } from 'react-native';
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
      .then(data => {
        setListRecipe(data.data.results);
      })
      .then(() => setIsLoading(false));
  }, [number, filter, direction]);

  return (
    <View style={{flex: 1}}>
      { isLoading && <ActivityIndicator size="large" color="#0000ff"/> }
      <Text style={{fontSize: 16}}>Sort by:</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Picker
          style={{height: 30, width: 100}}
          onValueChange={(itemValue) => setFilter(itemValue)}>
          <Picker.Item label="None" value="(empty)" />
          <Picker.Item label="Time" value="java" />
          <Picker.Item label="Popularity" value="js" />
          <Picker.Item label="Healthy" value="health score" />
        </Picker>
        <Picker
          style={{height: 30, width: 100}}
          onValueChange={(itemValue) => setDirection(itemValue)}>
          <Picker.Item label="Ascending" value="asc" />
          <Picker.Item label="Descending" value="desc" />
        </Picker>
      </View>
      <FlatList
        style={{flex: 1}}
        data={listRecipe}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({item}) => <Recipe recipeInfo={item} navigation={navigation}/>}
        ListEmptyComponent={() => !isLoading && <Text>NOPE</Text>}
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