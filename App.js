import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import ListPeopleScreen from './src/screens/ListPeopleScreen';
import ShowPersonScreen from './src/screens/ShowPersonScreen';
import CreateEditPersonScreen from './src/screens/CreateEditPersonScreen'
import { AppContext, AppProvider } from "./src/state/AppContext.js";
import { ThemeProvider } from 'react-native-elements';

const navigator = createStackNavigator({
  ListPeopleScreen: ListPeopleScreen,
  ShowPersonScreen: ShowPersonScreen,
  CreateEditPersonScreen: CreateEditPersonScreen,
}, {
  initiaRouteName: 'People',
  defaultNavigationOptions: {
    title: 'Vinden App'
  }
})

const AppContainer = createAppContainer(navigator);
const App = () => {
  return (
    <AppProvider>
      <ThemeProvider>
        <AppContainer />
      </ThemeProvider>
    </AppProvider>
  );
}

export default App;