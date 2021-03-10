import React, { useEffect, useState } from 'react';
import { auth } from '../firebase';
import { db } from  '../firebase';
import { Container, TextField, Button, List } from '@material-ui/core';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { TaskLists } from './TaskLists';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    button: {
      margin: theme.spacing(6,1),

    },
    input: {
        margin: theme.spacing(4)
    },
    logoutBtn: {
        borderStyle: 'none',
        outline: 'none',
        backgroundColor: 'transparent',
        width: '80px'
    }
  }),
);

export const Main: React.FC = (props: any) => {
    const classes = useStyles();
    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([{id: "", title: ""}]);

    useEffect(() => {
        const unSub = auth.onAuthStateChanged((user) => {
            !user && props.history.push('SignIn');
        });
        return () => unSub();
    },);

    useEffect(() => {
        const setUpTask = db.collection('tasks').onSnapshot((snapshot) => {
            setTasks(
                snapshot.docs.map((doc) => (
                    {id: doc.id, title: doc.data().title}
                ))
            )
         })
        return () => setUpTask();
    }, []);

    const addNewTask = () => {
        db.collection('tasks').add({title: input});
        setInput('');
    };

    return (
        <Container component="main" maxWidth="xl">
            <div>
                <h1>ToDo アプリ by React/Firebase
                </h1>
                <button
                    className={classes.logoutBtn}
                    onClick={
                        async () => {
                            try { await auth.signOut();
                                  props.history.push("SignIn");
                            } catch (error) {
                                alert(error.message);
                            };
                        }
                    }
                >
                <ExitToAppIcon fontSize='large'/>
                </button>
            </div>
            <TextField
                multiline
                id="standard-basic"
                label="タスクを入力"
                className={classes.input}
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setInput(e.target.value);
                }}
                />
            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {addNewTask()}}
                disabled={!input}
            >
            追加
            </Button>
            <List >
                {
                    tasks.map((task) => {
                        return (
                            <TaskLists key={task.id} id={task.id} title={task.title}/>
                        )
                    })
                }
            </List>
        </Container>
    );
};
