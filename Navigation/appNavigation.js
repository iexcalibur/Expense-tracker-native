import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import AddTripScreen from '../screens/AddTripScreen';
import AddExpenseScreen from '../screens/AddExpenseScreen';
import TripExpenseScreen from '../screens/TripExpenseScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import { useDispatch, useSelector } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { setUser } from '../redux/slices/user';
import { auth } from '../config/firebase';

const Stack = createNativeStackNavigator();

export default function AppNavigtion() {
    const {user} = useSelector(state => state.user);

    const dispatch = useDispatch();

    onAuthStateChanged(auth, u=>{
        console.log('got user:',u);
        dispatch(setUser(u));
    })

    if (user) {
        return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Home">
                <Stack.Screen options={{headerShown:false}} name="Home" component={HomeScreen} />
                <Stack.Screen options={{headerShown:false,presentation:'modal'}} name="AddTrip" component={AddTripScreen} />
                <Stack.Screen options={{headerShown:false,presentation:'modal'}} name="AddExpense" component={AddExpenseScreen} />
                <Stack.Screen options={{headerShown:false,presentation:'modal'}} name="TripExpense" component={TripExpenseScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }else {
        return (
            <NavigationContainer>
              <Stack.Navigator initialRouteName="Welcome">
                <Stack.Screen options={{headerShown:false, presentation:'modal'}} name="SignIn" component={SignInScreen} />
                <Stack.Screen options={{headerShown:false, presentation:'modal'}} name="SignUp" component={SignUpScreen} />
                <Stack.Screen options={{headerShown:false}} name="Welcome" component={WelcomeScreen} />
              </Stack.Navigator>
            </NavigationContainer>
          );
    }

  
}


//onAuthStateChange - this trigger whenever user logins or logout 