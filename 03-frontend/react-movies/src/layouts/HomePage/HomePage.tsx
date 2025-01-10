import { useState } from 'react';
import { HomePageModal } from '../HomePage/HomePageModal';
import { Background } from './Background/Background';
import { Body } from './Body/Body';

export const HomePage = () => {

    const [selectedMovie, setSelectedMovie] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    // Callback to receive the clicked movie
    const handleMovieClick = (movie: any) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };
    
    // Close the modal
    const handleCloseModal = () => {
        setSelectedMovie(null);
        setIsModalOpen(false);
    };
    
    return(
        <>
            <div className="PageContainer" style={{width: "100%", minHeight: "1750px", position: "relative", background: "#0f0f0f", overflow: "hidden"}}>
                <Background />
                <Body onMovieClick={handleMovieClick} />
            </div>
            <div className={`MovieList-Modal-trailers ${isModalOpen ? 'visible' : 'hidden'}`}>
                {isModalOpen && <HomePageModal movie={selectedMovie} onClose={handleCloseModal} />}
            </div>
        </>
    );
};