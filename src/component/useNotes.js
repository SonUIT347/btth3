import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { notesContext } from './NotesContext'

const useNotes = () => {
  return (
    useContext(notesContext)
  )
}

export default useNotes