import { View, Text, Image, TextInput, Touchable, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import { ScreenStackHeaderBackButtonImage } from 'react-native-screens'
import BackButton from '../components/backButton'
import { useNavigation } from '@react-navigation/native'
import { categories } from '../constants'
import Snackbar from 'react-native-snackbar'
import { getDocs } from 'firebase/firestore'
import { doc } from 'firebase/firestore'
import Loading from '../components/loading'
import { expensesRef } from '../config/firebase'
import { addDoc } from 'firebase/firestore'

export default function AddExpenseScreen(props) {
    let {id} = props.route.params;
  const [title,setTitle] = useState('');
  const [amount,setAmount] = useState('');
  const [category,setCategory] = useState('');
  const [loading,setLoading] = useState(false);

  const navigation = useNavigation();

  const handleAddExpense = async () => {
    if (title && amount && category) {
      //navigation.goBack();
      setLoading(true);
      let doc = await addDoc(expensesRef,{
        title,
        amount,
        category,
        tripId: id
      })
      setLoading(false)
      if (doc && doc.id) navigation.goBack();
    }
    else {
        Snackbar.show({
            text: 'All field are required',
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
              <Text className={`${colors.heading} text-xl font-bold text-center`}>Add Expense</Text>
            </View>

            <View className='flex-row justify-center my-3 mt-5'>
              <Image className='h-72 w-72' source={require('../assets/images/expenseBanner.png')} />
            </View>

            <View className='space-y-2 mx-2'>
              <Text className={`${colors.heading} text-lg font-bold`}>For What ?</Text>
              <TextInput value={title} onChangeText={ value => setTitle(value)} className='p-4 bg-white rounded-full mb-3' />
              <Text className={`${colors.heading} text-lg font-bold`}>How Much ?</Text>
              <TextInput value={amount} onChangeText={ value => setAmount(value)} className='p-4 bg-white rounded-full mb-3' />
            </View>
            <View className='mx-2 space-x-2'>
                <Text className={`${colors.heading} text-lg font-bold`} >Category</Text>
                <View className='flex-row flex-wrap items-center'>
                    {
                        categories.map( cat => {
                            let bgColor = 'bg-white'
                            if (cat.value == category) bgColor ='bg-green-200'
                            return (
                                <TouchableOpacity onPress={() => setCategory(cat.value)} key={cat.value} className={`rounded-full ${bgColor} px-4 p-3 mb-2 mr-2`}>
                                    <Text>{cat.title}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                </View>
            </View>
          </View>

          <View> 
                {
                    loading ?
                    (
                        <Loading />
                    ): (
                        <TouchableOpacity onPress={handleAddExpense} style={{backgroundColor: colors.button}} className='my-6 rounded-full p-3 shadow-sm mx-2'>
                            <Text className='text-center text-white font-bold text-lg'>Add Expense</Text>
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



