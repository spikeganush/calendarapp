import React, {useEffect,useState} from 'react'
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from '@react-navigation/native';
import { Input, NativeBaseProvider, Button, Icon, Box, Image, AspectRatio } from 'native-base';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';



 export function Home ( props ) {
  const navigation = useNavigation()

  useEffect( () => {
   if(!props.auth) {
    navigation.reset({ index: 0, routes: [ {name: 'Signup'} ] })
   }
  }, [props.auth])

   

  return(
    <View>
      <Agenda>

      </Agenda>

    </View>
  );
}
  

