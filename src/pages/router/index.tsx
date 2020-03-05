/**
 * External dependencies.
 */
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/**
 * Internal dependencies.
 */
import Dashboard from '@/pages/dashboard';
import Conversations from '@/pages/conversations';

const Stack = createStackNavigator();

function Router() {
    return (
        <Stack.Navigator headerMode={'none'}>
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="Conversations" component={Conversations} />
        </Stack.Navigator>
    );
}

export default Router;
