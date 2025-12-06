import React from 'react';
import { Tabs } from 'expo-router';
import { Icon } from 'react-native-iconify';

export default function TabsLayout() {
  return (
    <Tabs
        screenOptions={{
            headerShown: false,
            tabBarActiveTintColor: "#8B5CF6",
            tabBarInactiveTintColor: "#ffff",
            tabBarStyle: {
                height: 70, paddingBottom: 10
            }
        }}
    >
        <Tabs.Screen
            name='home'
            options={{
                title: "Home",
                tabBarIcon: ({ color, size }) => <Icon icon="MaterialSymbolsHomeRounded" size={size} color={color} />,

            }}
        />

        <Tabs.Screen
            name='discover'
            options={{
                title: "Discover",
                tabBarIcon: ({ color, size }) => <Icon icon="IconamoonDiscoverFill" size={size} color={color} />,
            }}
        />

        <Tabs.Screen
            name='hostParty'
            options={{
                title: "Host a Party",
                tabBarIcon: ({ color, size }) => <Icon icon="gridicons:add" size={size} color={color} />,
            }}
        />

        <Tabs.Screen
            name='upgrade'
            options={{
                title: "Upgrade",
                tabBarIcon: ({ color, size }) => <Icon icon="CarbonUpgrade" size={size} color={color} />,
            }}
        />

        <Tabs.Screen
            name='profile'
            options={{
                title: "Profile",
                tabBarIcon: ({ color, size }) => <Icon icon="IconamoonProfileFill" size={size} color={color} />,
            }}
        />

    </Tabs>
  )
}
