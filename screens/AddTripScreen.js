import { View, Text, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Loading from '../components/loading'
import Snackbar from 'react-native-snackbar';
import { useSelector } from 'react-redux'
import { addDoc } from 'firebase/firestore'
import { tripsRef } from '../config/firebase'

export default function AddTripScreen() {
  const [place,setPlace] = useState('');
  const [country,setCountry] = useState('');
  const [loading,setLoading] = useState('');
  const {user} = useSelector(state => state.user)
  const navigation = useNavigation();

  const handleAddTrip = async () => {
    if (place && country) {
      //navigation.navigate('Home');
      setLoading(true);
      let doc = await addDoc(tripsRef, {
        place,
        country,
        userId: user.uid
      })
      setLoading(false);
      if (doc && doc.id) navigation.goBack();
    }
    else {
      Snackbar.show({
        text: 'Place and country are required',
    });
    }
  }
    return (
      <ScreenWrapper>
        <View className='flex justify-between h-full mx-2'>

          <View>
            <View className='relative mt-5'>
              <View className='absolute top-0 left-0'>
                <BackButton/>
              </View>
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Trip</Text>
            </View>

            <View className='flex-row justify-center my-3 mt-5'>
              <Image className='h-72 w-72' source={require('../assets/images/4.png')} />
            </View>

            <View className='space-y-2 mx-2'>
              <Text className={`${colors.heading} text-lg font-bold`}>Where ?</Text>
              <TextInput value={place} onChangeText={ value => setPlace(value)} className='p-4 bg-white rounded-full mb-3' />
              <Text className={`${colors.heading} text-lg font-bold`}>Which Country</Text>
              <TextInput value={country} onChangeText={ value => setCountry(value)} className='p-4 bg-white rounded-full mb-3' />
            </View>
          </View>

          <View>
            {
              loading ? (<Loading />):
              (
                <TouchableOpacity onPress={handleAddTrip} style={{backgroundColor: colors.button}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
                  <Text className='text-center text-white font-bold text-lg'>Add Trip</Text>
                </TouchableOpacity>
              )
            }
          </View>
        </View>
      </ScreenWrapper>
    )
}

//Top view for uppper components
//Bottom view for lower components
