import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import ScreenWrapper from '../components/screenWrapper'
import { colors } from '../theme'
import randomImage from '../assets/images/randomImage'
import EmptyList from '../components/emptyList'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { signOut } from 'firebase/auth'
import { auth, tripsRef } from '../config/firebase'
import { useSelector } from 'react-redux'
import { getDocs, query, where } from 'firebase/firestore'

const items = [
    {
        id: 1,
        place: 'Gujrat',
        country: 'India'
    },
    {
        id: 2,
        place: 'London',
        country: 'England'
    },
    {
        id: 3,
        place: 'LA',
        country: 'USA'
    },
    {
        id: 4,
        place: 'New York',
        country: 'USA'
    },
    {
        id: 5,
        place: 'MP',
        country: 'India'
    },
    {
        id: 6,
        place: 'Courtyard',
        country: 'England'
    },
    {
        id: 7,
        place: 'CA',
        country: 'USA'
    },
    {
        id: 8,
        place: 'Vegas',
        country: 'USA'
    },
]

export default function HomeScreen() {
    const navigation = useNavigation();

    const {user} = useSelector(state => state.user);
    const [trips,setTrips] = useState([]);

    const isFocused = useIsFocused();

    const fetchTrips = async () => {
        const q = query(tripsRef,where('userId','==',user.uid))
        const querySnapshot = await getDocs(q);
        let data =[];
        querySnapshot.forEach(doc => {
            //console.log(doc.data())
            data.push({...doc.data(),id:doc.id})
        });
        setTrips(data)
    }
    useEffect( () => {
        if (isFocused)
            fetchTrips();
    },[isFocused])

    const handleLogout = async () => {
        await signOut(auth);
    }
  return (
    <ScreenWrapper className='flex-1'>

        <View className='flex-row justify-between items-center p-4'>
            <Text className={`${colors.heading} font-bold text-3xl shadow-sm`}>Exepnsify</Text>
            <TouchableOpacity onPress={handleLogout} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
                <Text className={colors.heading}>
                    Logout
                </Text>
            </TouchableOpacity>
        </View>

        <View className='flex-row justify-center items-center bg-blue-200 rounded-xl mx-4 mb-4'>
            <Image source={require('../assets/images/banner.png')} className='w-60 h-60'/>
        </View>

        <View className='p-4 space-y-3'>

            <View className='flex-row justify-between items-center'>
                <Text className={`${colors.heading} font-bold text-xl`}>Recent Trips</Text>
                <TouchableOpacity onPress={() => navigation.navigate('AddTrip')} className='p-2 px-3 bg-white border border-gray-200 rounded-full'>
                    <Text className={`${colors.heading}`}>Add Trips</Text>
                </TouchableOpacity>
            </View>

            <View style={{height: 430}}>
                <FlatList 
                    data={trips}
                    numColumns={2}
                    keyExtractor={item => item.id}
                    ListEmptyComponent={<EmptyList message={"You havn't added any trip yet"}/>}
                    showsVerticalScrollIndicator ={false}
                    columnWrapperStyle={{
                        justifyContent: 'space-between'
                    }}
                    className='mx-1'
                    renderItem={({item})=>{
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('TripExpense',{...item})} className='bg-white p-3 rounded-2xl mb-3 shadow-md'>
                                <View>
                                    <Image source={randomImage()} className='w-36 h-36 mb-2' />
                                    <Text className={`${colors.heading} font-bold`}>{item.place}</Text>
                                    <Text className={`${colors.heading} text-xs`}>{item.country}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }
                    }
                />
            </View>
        </View>

        

    </ScreenWrapper>
      
  )
}

//TouchleOpacity it act as button and clickable too
//View is just a container
//FlatList gives us list of components

//<Image source={require('../assets/images/1.png')} className='w-36 h-36 mb-2' />


