import React, { useState, useEffect } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { auth } from '../firebase';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        コタキン
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  button: {
    margin: theme.spacing(3, 0, 4),
  },
}));

export const SignIn: React.FC = (props: any) => {
    const classes = useStyles();
    const [isSignIn, setIsSignIn] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect( () => {
        const unSub = auth.onAuthStateChanged((user) => {
            user && props.history.push("/");
        });

        return () => unSub();
    }, [props.history]);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignIn ? 'ログイン' : '新規登録'}
        </Typography>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="メールアドレス"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
            }}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="パスワード"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
            }}
          />
          <Button
            variant="contained"
            color="primary"
            className={classes.button}
            disabled={!email || !password}
            onClick={ isSignIn ?
                async () => {
                    try {
                        await auth.signInWithEmailAndPassword(email, password);
                        props.history.push('/')
                    } catch(error) {
                        alert(error.message);
                        setEmail('');
                        setPassword('');
                    }
            } : async () => {
                    try {
                        await auth.createUserWithEmailAndPassword(email, password);
                        props.history.push('/')
                    } catch(error) {
                        alert(error.message);
                        setEmail('');
                        setPassword('');
                    }
            }}
          >
            {isSignIn ? 'ログイン' : '新規登録'}
          </Button>
                <Link
                    variant="body2"
                    onClick={() => {
                        setIsSignIn(!isSignIn
                            )
                    }}
                >
                {isSignIn ? '新規登録はこちら' : 'ログイン画面に戻る'}
              </Link>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
};
