import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// components
import  Signup  from './components/Signup'
import  Signin  from './components/Signin'
import  { Home }  from './components/Home';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// firebase
import { firebaseConfig } from './Config';
import {initializeApp,} from 'firebase/app'
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth"

import { 
  initializeFirestore, 
  getFirestore, 
  setDoc, 
  doc, 
  addDoc, 
  collection,
  query, 
  where, 
  onSnapshot 
} from 'firebase/firestore'




initializeApp(firebaseConfig)


const Stack = createStackNavigator();




function App() {
  const[ auth, setAuth ] = useState()
  const[ user, setUser ] = useState()
  const [signupError, setSignupError ] = useState()
  const [signinError, setSigninError ] = useState()
  const [ data, setData ] = useState()


  /*useEffect(() => {
    onAuthStateChanged( FBauth, (user) => {
      if( user ) { 
        setAuth(true) 
        setUser(user)
        // console.log( 'authed')
        if( !data ) { getData() }
      }
      else {
        setAuth(false)
        setUser(null)
      }
    })
  })*/

  // useEffect( () => {
  //   if( !data && user ) {
  //     getData()
  //   }
  // }, [data,auth, user])

  const SignupHandler = ( email, password ) => {
    const auth= getAuth()
    setSignupError(null)
    createUserWithEmailAndPassword( auth, email, password )
    .then( ( userCredential ) => { 
      setUser(userCredential)
      setAuth( true )
    } )
    .catch( (error) => { setSignupError(error.code) })
  }

  const SigninHandler = ( email, password ) => {
    signInWithEmailAndPassword( FBauth, email, password )
    .then( (userCredential) => {
      setUser(userCredential.user)
      setAuth(true)
      console.log( userCredential.user.uid)
    })
    .catch( (error) => { 
      const message = (error.code.includes('/') ) ? error.code.split('/')[1].replace(/-/g, ' ') : error.code
      setSigninError(message) 
    })
  }
  return (
    <Stack.Navigator screenOptions={{headerShown: false}} >
      <Stack.Screen name="Signup" options={{title: 'Sign up'}}>
          { (props) => 
          <Signup {...props} 
          handler={SignupHandler} 
          auth={auth} 
          error={signupError} 
          /> }
        </Stack.Screen>
        <Stack.Screen 
          name="Signin" 
          options={{
            title:'Sign in'
          }}
        >
          { (props) => 
          <Signin {...props} 
          auth={auth} 
          error={signinError} 
          handler={SigninHandler} 
          /> }
        </Stack.Screen>
        <Stack.Screen name="Home" component={Home}/>
    </Stack.Navigator>
  );
}



export default () => {
  return (
    <NavigationContainer>
     
        <App />
      
    </NavigationContainer>
  )
}