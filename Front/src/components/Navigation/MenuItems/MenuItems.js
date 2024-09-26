import React from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Dashboard from '@mui/icons-material/Dashboard';
import MailIcon from '@mui/icons-material/Mail';
import BarChart from '@mui/icons-material/BarChart'; // Ya estaba correcto
import Settings from '@mui/icons-material/Settings';
import Message from '@mui/icons-material/Message';
import List from '@mui/material/List';
// An Object to supply menuItems to Drawer Component
// You can add title and icon from here 
const menuItems = [
    {
        title: "Dashboard",
        icon: <Dashboard />
    },
    {
        title: "Charts",
        icon: <BarChart />
    },
    {
        title: "Forms",
        icon: <Message />
    },
    {
        title: "Emails",
        icon: <MailIcon />
    },
    {
        title: "Settings",
        icon: <Settings />
    }
]

// In props we can pass the onClick handler from parent component to load respective view component on click
const MenuItems = (props) => {
    return (
        <div>
            <List>
                {menuItems.map((menu) => (
                    <ListItem button key={menu.title}>
                        <ListItemIcon>{menu.icon}</ListItemIcon>
                        <ListItemText primary={menu.title} />
                    </ListItem>
                ))}
            </List>
        </div>
    )
}

export default MenuItems;