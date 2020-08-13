import React from 'react';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { useRouter } from 'next/router'



export default function Layout({children}) {
    const router = useRouter()

    const handleChangePath = (event, newValue) => {
        router.push(newValue)
    }

    return (
        <>
            <BottomNavigation
                value={router.pathname}
                onChange={handleChangePath}
                showLabels
            >
                <BottomNavigationAction label="Index" icon={<RestoreIcon/>} value="/"/>
                <BottomNavigationAction label="My Profile" icon={<FavoriteIcon/>} value="/profile"/>
                <BottomNavigationAction label="About" icon={<LocationOnIcon/>} value="/about"/>
            </BottomNavigation>
            <div>{children}</div>
        </>
    );
}
