import { View, Text, StyleSheet } from 'react-native'
import React, { createContext, useCallback, useContext, useState } from 'react'
export const notesContext = createContext()
import * as SQLite from 'expo-sqlite';
const db = SQLite.openDatabase('aaa.db')
const NotesContext = ({ children }) => {
  const [note, setNote] = useState('')
  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState([])
  const [size, setSize] = useState(16)
  const [isEnabled, setIsEnable] = useState(false)
  const [setting, setSetting] = useState([null])
  const background = 'black'
  const [textColor, setTextColor] = useState('#84878c')
  const headerColor = '#333333'
  const getNotes = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM notes',
        [],
        (txObj, result) => {
          setNotes(result.rows._array);
        },
        (txObj, error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });

  }, [])
  const getSetting = useCallback(() => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM setting',
        [],
        (txObj, result) => {
          setSetting(result.rows._array);
          // setSize(parseInt(result.rows._array[0].size))
          console.log('getsetting '+result.rows._array[0].darkmode)
          // setIsEnable((result.rows._array[0].darkmode));
          // console.log()
        },
        (txObj, error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });

  }, [])
  const getSize = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT size FROM setting',
        [],
        (txObj, result) => {
          setSize(parseInt(result.rows._array[0].size));
        },
        (txObj, error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  }
  const getIsEnable = () => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT darkmode FROM setting',
        [],
        (txObj, result) => {
          setIsEnable((result.rows._array[0].darkmode));
          console.log('notes ' + isEnabled)
        },
        (txObj, error) => {
          console.error('Error fetching data: ', error);
        }
      );
    });
  }
  const dropTable = () => {
    db.transaction(
      tx => {
        tx.executeSql(
          'DROP TABLE IF EXISTS setting',
          [],
          (txObj) => {
            console.log('Table dropped successfully');
          },
          (txObj, error) => {
            console.error('Error dropping table: ', error);
          }
        );
      },
      error => console.error('Transaction error: ', error)
    );
  };
  const styles = StyleSheet.create({
    notes: {
      flexDirection: 'row',
      borderRadius: 10,
      borderWidth: 1,
      borderColor: "#d9d9d9",
      width: 350,
      height: 'auto',
      margin: 5,
      paddingBottom: 10,
      paddingTop: 10,
      paddingLeft: 5,
      paddingRight: 5,
      // backgroundColor:background
    },
    notes_text: {
      width: 300
    },
    binIcon: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor:isEnabled?background:null
    },
    touch: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
    }
  }
  )
  const value = {
    note,
    setNote,
    title,
    setTitle,
    notes,
    setNotes,
    db,
    getNotes,
    size,
    setSize,
    isEnabled,
    setIsEnable,
    dropTable,
    background,
    // setBackground,
    getSetting,
    setting,
    getSize,
    getIsEnable,
    textColor,
    setTextColor, 
    styles,
    headerColor,
  }
  return (
    <notesContext.Provider value={value}>
      {children}
    </notesContext.Provider>
  )
}

export default NotesContext