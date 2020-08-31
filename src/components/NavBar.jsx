import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button, IconButton} from '@material-ui/core';
import Link from "next/link";
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles((theme) => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));


export default function NavBar() {

    const classes = useStyles();

    return (
        <AppBar position="static">
            <Toolbar>
                <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" className={classes.title}>
                    Material Universitario
                </Typography>
                <Link href="/">
                    <Button color="inherit"> Index </Button>
                </Link>
                <Link href="/files">
                    <Button color="inherit"> Files </Button>
                </Link>
                <Link href="/upload">
                    <Button color="inherit"> Upload Files </Button>
                </Link>
            </Toolbar>
        </AppBar>
    );
}
