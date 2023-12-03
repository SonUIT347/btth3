import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as SQLite from 'expo-sqlite'
import { MaterialIcons } from '@expo/vector-icons';
import { notesContext } from './component/NotesContext';
import useNotes from './component/useNotes';
import { Alert } from 'react-native';

// const db = SQLite.openDatabase({name:'todo.db'});
const AddNotes = ({ navigation }) => {
    const {
        note,
        setNote,
        notes,
        setNotes,
        size,
        title,
        setTitle,
        db,
        getNotes,
        textColor,
        background,
        styles
    } = useNotes()
    // useEffect(() => {
    //     db.transaction(tx => {
    //         tx.executeSql(
    //             'CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, note TEXT)',
    //             [],
    //             (txObj) => {
    //                 console.log('Table created successfully');
    //             },
    //             (txObj, error) => {
    //                 console.error('Error creating table: ', error);
    //             }
    //         );
    //     });
    //     getNotes();
    // }, []);

    console.log(notes)
    const addNote = () => {
        if (note !== '' && title !== '') {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'INSERT INTO notes (title, note) VALUES (?, ?)',
                        [title, note],
                        (_, result) => {
                            console.log('Note added successfully');
                            setTitle('');
                            setNote('');
                            getNotes();
                            navigation.goBack();
                        },
                        (_, error) => {
                            console.error('Error adding note: ', error.message);
                            // Provide more specific error messages if needed
                        }
                    );
                },
                error => console.error('Transaction error: ', error)
            );
        } else {
            Alert.alert(
                'Warning',
                'Please enter both a title and a note.',
                [{ text: 'Ok', style: 'cancel' }],
                { cancelable: false }
            );
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                placeholder='Enter your title...'
                value={title}
                multiline
                onChangeText={(text) => setTitle(text)}
                placeholderTextColor={textColor}
                style={{ fontSize: size, borderRadius: 5, borderWidth: 1, width: 350, padding: 5, borderColor: '#d9d9d9', marginBottom: 10, color: textColor }}
            />
            <TextInput
                placeholder='Enter your note...'
                placeholderTextColor={textColor}
                value={note}
                multiline
                onChangeText={(text) => setNote(text)}
                numberOfLines={5}
                style={{ fontSize: size, borderRadius: 5, borderWidth: 1, width: 350, padding: 5, borderColor: '#d9d9d9', color: textColor }}
            />
            <View style={styles.touch}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <MaterialIcons name="cancel" size={28} color="red" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => addNote()}>
                    <MaterialIcons name="cancel" size={28} color="green" />
                </TouchableOpacity>
            </View>
        </View>
    )
}
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     touch: {
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center'
//     }
// })
export default AddNotes