import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import AddNotes from './src/AddNotes';
import NotesContext from './src/component/NotesContext';
import StackNav from './src/component/StackNav';
import Main from './src/Main';
import NestedNav from './src/NestedNav';

export default function App() {
  return (
    <NotesContext>
      {/* <Main /> */}
      {/* <AddNotes/> */}
      <NavigationContainer>
        <StackNav />
      </NavigationContainer>
    </NotesContext>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
