import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AntDesign } from '@expo/vector-icons';
// const db = SQLite.openDatabase('note.db');
import { FontAwesome5 } from '@expo/vector-icons';
import useNotes from './component/useNotes';
const Main = ({ navigation }) => {
  const {
    getNotes,
    notes,
    db,
    size,
    isEnabled,
    setIsEnable,
    setSize,
    background,
    // setBackground,
    getSize,
    getSetting,
    setting,
    getIsEnable,
    textColor,
    setTextColor,
    styles,
    headerColor,
    setHeaderColor

  } = useNotes()
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT)',
        [],
        (txObj) => {
          console.log('successfully');
          // console.log(txObj)
        },
        (txObj, error) => {
          console.error('Error creating table: ', error);
        }
      );
    });
    // dropTable()
    // getSetting()
    // getIsEnable()
    // setIsEnable(setting[0].darkmode)
    getIsEnable()
    getSetting()
    getSize()
    getNotes()
  }, []);

  // useEffect(() => {

  //   setSize(setting[0].size)
  // },[])
  const deleteTodo = id => {
    // console.log(id)
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM notes WHERE id=?',
        [id],
        (txObj, result) => {
          console.log('deleted successfully');
          // console.log(result)
          getNotes();
        },
        (txObj, error) => {
          console.error('Error deleting: ', error);
        }
      );
    });
  };
  isEnabled ? setTextColor('white') : setTextColor('#84878c')
  const renderItem = ({ item }) => (

    <TouchableOpacity style={styles.notes} onPress={() => navigation.navigate('EditNotes',
      {
        id: item.id
      }
    )}>
      <View style={styles.notes_text}>
        <Text style={{ fontSize: size, fontWeight: 'bold', color: textColor }}>{item.title}</Text>
        <Text style={{ fontSize: size, color: textColor }}>{item.note}</Text>
      </View>
      <View style={styles.binIcon}>
        <TouchableOpacity title="Delete" onPress={() => deleteTodo(item.id)}>
          <FontAwesome5 name="trash-alt" size={24} color={textColor} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#ed9451' }}>App notes</Text>
      <View style={{ justifyContent: 'space-around', width: 450, margin: 20, flexDirection: 'row' }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#85827f' }}>All notes</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddNotes', { styles })}>
          <AntDesign name="pluscircle" size={30} color="#ed9451" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

export default Main;
