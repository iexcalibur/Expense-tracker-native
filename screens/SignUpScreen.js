import { View, Text, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import Snackbar from 'react-native-snackbar';
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../config/firebase'
import { useDispatch, useSelector } from 'react-redux'
import { setUserLoading } from '../redux/slices/user'
import Loading from '../components/loading'


export default function SignUpScreen() {
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const {userLoading} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
        // navigation.goBack();
        // navigation.navigate('Home');
        try{
            dispatch(setUserLoading(true))
            await createUserWithEmailAndPassword(auth,email,password);
            dispatch(setUserLoading(false))
        }catch(e){
            dispatch(setUserLoading(false))
            Snackbar.show({
                text: e.message,
            });
        }
    }
    else {
        Snackbar.show({
            text: 'Email and Password are required',
        });
    }
  }
    return (
      <ScreenWrapper>
        <View className='flex justify-between h-full mx-2'>

          <View>
            <View className='relative'>
              <View className='absolute top-0 left-0'>
                <BackButton/>
              </View>
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Sign Up</Text>
            </View>

            <View className='flex-row justify-center my-3 mt-5'>
              <Image className='h-72 w-72' source={require('../assets/images/signup.png')} />
            </View>

            <View className='space-y-2 mx-2'>
              <Text className={`${colors.heading} text-lg font-bold`}>Email</Text>
              <TextInput value={email} onChangeText={ value => setEmail(value)} className='p-4 bg-white rounded-full mb-3' />
              <Text className={`${colors.heading} text-lg font-bold`}>Password</Text>
              <TextInput value={password} secureTextEntry onChangeText={ value => setPassword(value)} className='p-4 bg-white rounded-full mb-3' />
            </View>
          </View>

          <View>
                {
                    userLoading ? (
                        <Loading />
                    ):(
                        <TouchableOpacity onPress={handleSubmit} style={{backgroundColor: colors.button}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
                            <Text className='text-center text-white font-bold text-lg'>Sign Up</Text>
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

