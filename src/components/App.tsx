import React from 'react';
import { SignIn } from './SignIn';
import { Main } from './Main';
import { BrowserRouter, Route} from 'react-router-dom';
import '../styles/App.module.css';

export const App: React.FC = (props: any) => {
    // const isDeveloped = true;

    return (
        <BrowserRouter>
            <>
                <Route exact path='/' component={Main} />
                <Route exact path='/SignIn' component={SignIn} />
            </>
        </BrowserRouter>
    )
}

