import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { ReactComponent as PauseIcon } from '../../../../Images/pause.svg';
import { ReactComponent as PlayIcon } from '../../../../Images/play.svg';
import { ReactComponent as ChevronRightStandard } from '../../../../Images/chevronRightStandard.svg';
import ExploreTopMoviesCarousel from '../../../../Images/ExploreTopMoviesCarousel.jpg';
import './ExploreTopMovies.css';

export const ExploreTopMovies = () => {

    const [isPlaying, setIsPlaying] = useState(true);
    const { oktaAuth, authState } = useOktaAuth();

    const togglePlayPause = () => {
        setIsPlaying((prevState) => !prevState);
    };
  
    return (
        <div className="exploreTopMovies-container">
            <div className="hero">
                <div className='hero-container'>
                    <div className='hero-slider-container'>
                        <div className='hero-slider-wrapper'>
                            <div className='hero-slider-item-wrapper'>
                                <div className='hero-slider-item'>
                                    <div className='hero-slider-content-card'>
                                        <div className='content-card-shadow'></div>
                                        <div className={isPlaying ? 'content-card' : 'content-card paused'}>
                                            <img src={ExploreTopMoviesCarousel} alt="" aria-hidden="true" />
                                            <img src={ExploreTopMoviesCarousel} alt="" aria-hidden="true" />
                                        </div>
                                    </div>
                                    <div className='hero-slider-content-button'>
                                        <button type='button' title={isPlaying ? 'Pause' : 'Play'} data-bs-play="icon-button" className='button' onClick={togglePlayPause}>
                                            <div aria-hidden="true" className='play-pause-svg-wrapper'>
                                                {isPlaying ? ( <PauseIcon /> ) : ( <PlayIcon /> )}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='hero-caption-container'>
                        <div className='hero-caption-wrapper'>
                            {authState?.isAuthenticated ?
                                <div className='hero-caption-item'>
                                    <h1 className='fs-1 fw-bolder text-white'>
                                        <span>Welcome {authState.idToken?.claims?.email}</span>
                                    </h1>
                                    <p className='hero-caption-item-membership'>Ready to watch? Let's search together.</p>
                                    <Link type="button" className="hero-caption-item-button" to='/search'>
                                        Search
                                        <div className="hero-caption-item-button-svg d-flex justify-content-center align-items-center" style={{height: "1.5rem", marginLeft:"0.5rem"}}>
                                            <ChevronRightStandard />
                                        </div>
                                    </Link>
                                </div>
                            :
                                <div className='hero-caption-item'>
                                    <h1 className='hero-caption-item-title'>
                                        <span>Unlimited movies, TV shows, and more</span>
                                    </h1>
                                    <p className='hero-caption-item-membership'>Ready to watch? Sign up to create your membership.</p>
                                    <Link type="button" className="hero-caption-item-button" to='/login'>
                                        Get Started
                                        <div className="hero-caption-item-button-svg d-flex justify-content-center align-items-center" style={{height: "1.5rem", marginLeft:"0.5rem"}}>
                                            <ChevronRightStandard />
                                        </div>
                                    </Link>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
