import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategorieList from './CategorieList';
import Results from './Results';
import RecipeDescription from './RecipeDescription';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TouchableOpacity } from 'react-native';

const Stack = createStackNavigator();
const headerOptions = {
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#292D39',
  },
  headerTitleStyle: {
    fontWeight: 'bold',
  }
};

function AddToFavorite({recipe}) {
  const isFavorite = false;
  // star and star-o
  return (
    <TouchableOpacity>
      <Icon name={isFavorite}/>
    </TouchableOpacity>
  )
}

function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home' screenOptions={headerOptions}>
        <Stack.Screen name='Home' component={CategorieList} options={() => ({
          title: 'Feed Me'
        })}/>
        <Stack.Screen name='Results' component={Results}/>
        <Stack.Screen name='Recipe' component={RecipeDescription} options={({route}) => ({
          title: route.params.recipeInfo.title
          })}/>
      </Stack.Navigator>
    </NavigationContainer> 
  );
}

export default function App() {
  return <AppNavigator/>
}
