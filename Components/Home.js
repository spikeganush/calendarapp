import React, { useEffect, useState } from 'react'
import {
  Keyboard,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import {
  Input,
  NativeBaseProvider,
  Button,
  Icon,
  Box,
  Image,
  AspectRatio,
} from 'native-base'
import { Agenda } from 'react-native-calendars'
import { Card, Avatar } from 'react-native-paper'
import TaskInputField from './TaskInputField'

//import Typography from '../components/Typography';

const timeToString = (time) => {
  const date = new Date(time)
  return date.toISOString().split('T')[0]
}

export function Home(props) {
  const navigation = useNavigation()
  const [tasks, setTasks] = useState([])
  //const [id, setId] = useState([]);
  //const [taskName, setTaskName] = useState([]);

  const [dateString, setDateString] = useState()
  //const [items, setItems] = useState({});

  console.log(props.listItems)

  const items = {
    '2017-05-22': [{ name: 'item 1 - any js object' }],
    '2017-05-23': [{ name: 'item 2 - any js object', height: 80 }],
    '2017-05-24': [],
    '2017-05-25': [
      { name: 'item 3 - any js object' },
      { name: 'any js object' },
    ],
  }

  useEffect(() => {
    if (!props.auth) {
      navigation.reset({ index: 0, routes: [{ name: 'Signup' }] })
    }
  }, [props.auth])

  const addTask = (task) => {
    //setTaskName=task
    if (task == null || dateString == null) return

    //setTask=task
    const id = new Date().getTime().toString()

    //task = { id: id, name: task, dateString: dateString, status: false }
    const data = { id: id, name: task, dateString: dateString, status: false }

    {
      props.add('userTasks', data)
    }

    setTasks([...tasks, task])
    //console.log(tasks)
    //console.log(tasks)
    //console.log(item)

    Keyboard.dismiss()
  }

  /*const loadItems = (day) => {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = timeToString(time);
        if (!items[strTime]) {
          items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150)),
            });
          }
        }
      }
      const newItems = {};
      Object.keys(items).forEach((key) => {
        newItems[key] = items[key];
      });
      setItems(newItems);
    }, 1000);
  };*/

  const renderItem = (item) => {
    return (
      <TouchableOpacity
        style={{ marginRight: 10, marginTop: 17 }}
        onPress={() => {
          navigation.navigate('AddTask')
        }}
      >
        <Card>
          <Card.Content>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Text>{item.name}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('EditTask')}>
                <Avatar.Text label="+" />
              </TouchableOpacity>
            </View>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    )
  }

  return (
    <View style={{ flex: 1 }}>
      <Agenda
        onDayPress={(day) => {
          setDateString(day.dateString)
          console.log(dateString)
        }}
        items={items}
        //loadItemsForMonth={loadItems}
        selected={'2017-05-21'}
        renderItem={renderItem}
      />
      <TaskInputField addTask={addTask} />
    </View>
  )
}
