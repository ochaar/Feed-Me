import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View, Image, ScrollView,
  Dimensions } from 'react-native';

export default function RecipeDescription({route}) {
  const {recipeInfo} = route.params;
  const [moreInfo, setMoreInfo] = useState({});
  const apiKey = "&apiKey=f0eb1411b7e04d60bef499f6e6114ec1";
  const id = `${recipeInfo.id}`;
  const nutrients = moreInfo.nutrition && 
    moreInfo.nutrition.nutrients.filter(nutrients => nutrients.unit === "g");

  useEffect(() => {
    axios.get("https://api.spoonacular.com/recipes/" + id + 
      "/information?includeNutrition=true" + apiKey)
      .then(recipe => setMoreInfo(recipe.data));
  }, []);

  return (
    <ScrollView>
      <Image source={{uri: moreInfo.image || recipeInfo.image}} style={styles.image}/>
        <View style={styles.header}>
          <Text style={styles.textHeader}>{recipeInfo.title}</Text>
        </View>
        <View style={styles.recipeInfo}>
          <View style={{padding: 5}}>
            <Text>Preparation: {recipeInfo.preparationMinutes} min</Text>
            <Text>Cooking: {recipeInfo.cookingMinutes} min</Text>
            <Text>Health Score: {recipeInfo.healthScore}</Text>
            <Text>Popularity: {recipeInfo.aggregateLikes} likes</Text>
            <Text style={{width: width / 2}}>Recipe by: {recipeInfo.sourceName}</Text>
          </View>
          <View>
          {
          nutrients && nutrients.map((nutrient, index) => {
            return (
              <Text key={index}>{nutrient.title + ": " + nutrient.amount + ' g'}</Text>
              )
            })
          }
          </View>
        </View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>
            Ingredients for {moreInfo.servings} persons:
            </Text>
        </View>
        <View style={{padding: 5}}>
        {
          recipeInfo.extendedIngredients &&
          recipeInfo.extendedIngredients.map((ingredients, index) => {
            return (
              <Text key={index}>- {ingredients.original}</Text>
              )
            })
          }
        </View>
        <View style={styles.header}>
          <Text style={styles.textHeader}>How to prepare:</Text>
        </View>
        <View style={{padding: 5}}>
          <Text>{
          moreInfo.instructions ? moreInfo.instructions :
          "No Data for this recipe"
          }</Text>
        </View>
    </ScrollView>
  )
}

const { width } = Dimensions.get('window');
const imageSize = width - 0.1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: '#222'
  },
  image:{
    width: imageSize,
    height: imageSize,
  },
  recipeInfo: {
    padding: 5, 
    flexDirection: 'row', 
    justifyContent: 'space-between'
  },
  textHeader: {
    fontSize: 24,
    color: 'white',
    padding: 10
  },
  header: {
    backgroundColor: '#6666CC',
  }
});
