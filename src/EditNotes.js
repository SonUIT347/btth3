import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useRoute } from '@react-navigation/native'
import useNotes from './component/useNotes'
import { MaterialIcons } from '@expo/vector-icons';
const EditNotes = ({ navigation }) => {
  const {
    db,
    getNotes,
    size,
    textColor,
    styles
  } = useNotes()
  const [temp1, setTemp1] = useState('')
  const [temp2, setTemp2] = useState('')
  const route = useRoute()
  const id = route.params.id
  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM notes where id = (?)',
        [id],
        (txObj, result) => {
          // setNotes(result.rows._array);
          setTemp1(result.rows._array[0].title)
          setTemp2(result.rows._array[0].note)
        },
        (txObj, error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  }, [])
  const UpdateNote = () => {
    db.transaction(tx => {
      tx.executeSql(
        'UPDATE notes SET title=?, note=? WHERE id=?',
        [temp1, temp2, id],
        (txObj, result) => {
          console.log('Todo updated successfully');
          console.log(result.insertId)
          navigation.goBack()
          getNotes()
        },
        (txObj, error) => {
          console.error('Error updating todo: ', error);
        }
      );
    });
  }
  return (
    <View style={styles.container}>
      <TextInput
        placeholder='Enter your title...'
        value={temp1}
        multiline
        onChangeText={(text) => setTemp1(text)}
        style={{ fontSize: size, borderRadius: 5, borderWidth: 1, width: 350, padding: 5, borderColor: '#d9d9d9', marginBottom: 10, color: textColor }}
      />
      <TextInput
        placeholder='Enter your note...'
        value={temp2}
        multiline
        onChangeText={(text) => setTemp2(text)}
        numberOfLines={5}
        style={{ fontSize: size, borderRadius: 5, borderWidth: 1, width: 350, padding: 5, borderColor: '#d9d9d9', color: textColor }}
      />
      <View style={styles.touch}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialIcons name="cancel" size={28} color="red" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => UpdateNote()}>
          <MaterialIcons name="cancel" size={28} color="green" />
        </TouchableOpacity>
      </View>
    </View>
  )

}

export default EditNotes