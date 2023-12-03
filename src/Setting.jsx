import { View, Text, StyleSheet, Switch, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import Slider from '@react-native-community/slider'
import useNotes from './component/useNotes'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Setting = () => {
    const [temp, setTemp] = useState(false)
    const {
        size,
        setSize,
        isEnabled,
        setIsEnable,
        db,
        getNotes,
        dropTable,
        getSetting,
        setting,
        setSetting,
        getSize,
        getIsEnable,
        background,
        setBacground,
        textColor,
        setTextColor,
        styles
    } = useNotes()
    // console.log(size)
    useEffect(() => {
        db.transaction(tx => {
            tx.executeSql(
                'CREATE TABLE IF NOT EXISTS setting (id INTEGER PRIMARY KEY, size INT, darkmode BOOLEAN)',
                [],
                (txObj) => {
                    console.log('create setting table successfully');
                    // console.log(txObj)

                },
                (txObj, error) => {
                    console.error('Error creating table: ', error);
                }
            );
        });
        // setIsEnable(setSetting[0].darkmode)
        console.log(isEnabled)
        // console.log('1 ' + isEnabled)
        // setSize(setting[0].size)
        // console.log('size' + setting[0].size)
        // setIsEnable(setting[0].isEnabled)
        if (setting === '') {
            db.transaction(tx => {
                tx.executeSql(
                    'INSERT INTO setting (size, darkmode) VALUES(?,?)',
                    [size, isEnabled],
                    (txObj) => {
                        console.log('insert succesfully');
                        // console.log(txObj)
                    },
                    (txObj, error) => {
                        console.error('Error creating table: ', error);
                    }
                );
            });
        }
        //   dropTable()
        // getNotes()

    }, [getSetting]);
    const UpdateSettingSize = async (size) => {
        db.transaction(tx => {
            tx.executeSql(
                'UPDATE setting SET size=? WHERE id=1',
                [size],
                (txObj, result) => {
                    console.log('Setting updated successfully');
                    getSetting();
                },
                (txObj, error) => {
                    console.error('Error updating setting: ', error);
                }
            );
        });
    };
    const UpdateSettingSwitch = (boolean) => {
        db.transaction(tx => {
            // console.log(size)
            tx.executeSql(
                'UPDATE setting SET darkmode=? WHERE id=1',
                [boolean],
                (txObj, result) => {
                    console.log('Setting updated successfully');
                    getSetting();
                    // console.log(setting[0].darkmode);
                },
                (txObj, error) => {
                    console.error('Error updating setting: ', error);
                }
            );
        });
    };

    const saveValue = (size) => {
        setSize(size)
        UpdateSettingSize(size)
        // setSize(setting[0].size)
        // console.log(size)

    }
    // console.log(setting)
    const toggleSwitch = () => {
        // getIsEnable()
        setIsEnable(previousState => !previousState);
        UpdateSettingSwitch(!isEnabled)
    }
    const saveSwitch = () => {
        // console.log('click ' + isEnabled)
        setIsEnable(!isEnabled)
        // console.log('enable ' + isEnabled)

    }
    return (
        <View style={styles.container}>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', width: 500 }}>
                <Text style={{ fontSize: 20, color: textColor }}>  DarkMode</Text>
                {/* {console.log('is ' + isEnabled)} */}
                <Switch
                    trackColor={{ false: '#767577', true: '#81b0ff' }}
                    thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            </View>
            <View style={{ justifyContent: 'space-around', flexDirection: 'row', width: 500 }}>
                <Text style={{ fontSize: 20, color: textColor }}>Font Size</Text>
                <Text style={{ fontSize: 20, color: textColor }}>{size}</Text>
                {/* {console.log('is ' + isEnabled)} */}
            </View>
            <Slider
                style={{ width: 320, height: 40 }}
                minimumValue={16}
                maximumValue={32}
                step={2}

                value={size}
                onValueChange={(size) => saveValue(size)}
                minimumTrackTintColor="#FFFFFF"
                maximumTrackTintColor="#000000"
            />
            {/* <Button title='cilc' onPress={() => UpdateSettingSize()}> </Button> */}
        </View>
    )
}
export default Setting