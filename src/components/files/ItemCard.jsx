import React from 'react';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import {CloudDownload, FileCopy, Launch} from '@material-ui/icons';
import green from "@material-ui/core/colors/green";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    details: {
        display: 'flex',
        flexDirection: 'column',
    },
    content: {
        flex: '1 0 auto',
    },
    cover: {
        width: 250,
    },
    controls: {
        display: 'flex',
        alignItems: 'center',
        paddingLeft: theme.spacing(1),
        paddingBottom: theme.spacing(1),
    },
    playIcon: {
        height: 26,
        width: 26,
    },
}));

const ItemCard = ({file}) => {

    const classes = useStyles();

    return (
        <Card className={classes.root} elevation={5}>
            <div className={classes.details}>
                <CardContent className={classes.content}>
                    <Typography component="h5" variant="h5">
                        {file.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        Uploaded {file.createdAtFormated}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {file.Subject.Career.type} en {file.Subject.Career.name}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                        {file.Subject.name}
                    </Typography>
                </CardContent>
                <div className={classes.controls}>
                    <IconButton aria-label="previous">
                        <CloudDownload className={classes.playIcon} style={{color: green[500]}}/>
                    </IconButton>
                    <IconButton aria-label="next">
                        <FileCopy className={classes.playIcon} color="primary"/>
                    </IconButton>
                </div>
            </div>
            <CardMedia
                className={classes.cover}
                image={file.url}
                title="Live from space album cover"
            />
        </Card>
    );
};

export default ItemCard;