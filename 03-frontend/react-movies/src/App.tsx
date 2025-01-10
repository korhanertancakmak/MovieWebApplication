import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { Footer } from './layouts/HeaderAndFooter/Footer';
import { Header } from './layouts/HeaderAndFooter/Header';
import { HomePage } from './layouts/HomePage/HomePage';
import { SearchMoviesPage } from './layouts/SearchMoviesPage/SearchMoviesPage';
import { MoviePage } from './layouts/MoviePage/MoviePage';
import { oktaConfig } from './lib/octaConfig';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security, LoginCallback } from '@okta/okta-react';
import LoginWidget from './Auth/LoginWidget';
import { WatchlistPage } from './layouts/WatchlistPage/WatchlistPage';
import SecureRoute from './SecureRoute';
import { SupportPage } from './layouts/SupportPage/SupportPage';
import { AdminPage } from './layouts/AdminPage/AdminPage';
import './App.css';

const oktaAuth = new OktaAuth(oktaConfig);

export const App = () => {

    const navigate = useNavigate();

    const customAuthHandler = () => {
        navigate('/login');
    }

    const restoreOriganlUri = async (_oktaAuth: any, originalUri: any) => {
        navigate(toRelativeUrl(originalUri || '/', window.location.origin), {replace: true});
    };
    
    return (
        <div className='netflix-sans-font-loaded d-flex flex-column min-vh-100'>
            <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriganlUri} onAuthRequired={customAuthHandler}>
                <Header />
                <div className='flex-grow-1'>
                    <Routes>
                        <Route path='/' element={<Navigate to='/home' replace />} />
                        <Route path='/home' element={<HomePage />} />
                        <Route path='/search' element={<SearchMoviesPage />} />
                        <Route path='/movies/:movieId' element={<MoviePage />} />
                        <Route path='/login' element= {<LoginWidget config={oktaConfig}/>} />
                        <Route path='/login/callback' Component={LoginCallback} />
                        <Route path='/watchlist' element = {<SecureRoute />}>
                            <Route path='' element={<WatchlistPage />} />
                        </Route>
                        <Route path='/messages' element = {<SecureRoute />}>
                            <Route path='' element={<SupportPage />} />
                        </Route>
                        <Route path='/admin' element = {<SecureRoute />}>
                            <Route path='' element={<AdminPage />} />
                        </Route>
                    </Routes>
                </div>
                <Footer />
            </Security>
        </div>
    );
};
