import React from 'react';
import { db } from '../firebase'
import DeleteIcon from '@material-ui/icons/Delete';
import { IconButton, Grid, ListItem } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(0,0,0,9),
    },
    grid: {
        maxWidth: '370px',
        margin: '0 auto',
        borderBottom: '1px solid #000'
    }
  }),
);


interface Props {
    title: string,
    id: string
};

export const TaskLists: React.FC<Props>  = ({ title, id }) =>  {
    const classes = useStyles();

    const deleteTask = () => {
        db.collection('tasks').doc(id).delete();
    };

    return (
        <Grid container className={classes.grid} justify="flex-end">
            <ListItem >
            <Grid item xs={8}>
                <h2>
                    {title}
                </h2>
            </Grid>
            <Grid item xs={4}>
                <IconButton
                    edge="end"
                    aria-label="delete"
                    className={classes.button}
                    onClick={deleteTask}
                >
                <DeleteIcon fontSize='large'/>
                </IconButton>
            </Grid>
            </ListItem>
        </Grid>
    );
};

