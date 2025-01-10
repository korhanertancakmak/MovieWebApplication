import { useState, useEffect, useRef, useCallback } from 'react';
import './Carousel.css';
import {ReactComponent as RightArrowIcon} from '../../../../Images/rightArrow.svg';
import {ReactComponent as LeftArrowIcon} from '../../../../Images/leftArrow.svg';
import { ReturnMovieList } from './ReturnMovieList';

export const Carousel = ({ onMovieClick, url, title }: { onMovieClick: (movie: any) => void, url: string, title: string }) => {
    const [itemWidth, setItemWidth] = useState(0);     // Tracks the width of each item
    const [scrollState, setScrollState] = useState(1); // Tracks the current state of the scrollbar
    const [isLoading, setIsLoading] = useState(true);  // Tracks the loading state
    const listRef = useRef<HTMLUListElement>(null);    // Reference to the movie list container

    useEffect(() => {
        // Updates dimensions and visible items based on container size
        const updateDimensions = () => {
            if (listRef.current) {
                var listElement = listRef.current;
                var itemElement = listElement.firstElementChild as HTMLElement;
                if (itemElement) {
                    var width = itemElement.offsetWidth;
                    setItemWidth(width);
                }
            }
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        return () => {
            window.removeEventListener('resize', updateDimensions);
        };
    }, [isLoading]);

    // Determines the scrollbar position and updates the scroll state
    const updateScrollState = useCallback(() => {
        if (listRef.current) {
            const listElement = listRef.current.parentElement;
            const scrollLeft = listElement?.scrollLeft;
            if (scrollLeft) {
                const maxScrollLeft = listElement.scrollWidth - listElement.clientWidth;
                if (scrollLeft <= itemWidth * 0.1) {
                    setScrollState(1); // State-1: Right-ended (no space on the left)
                } else if (scrollLeft >= maxScrollLeft - itemWidth * 0.1) {
                    setScrollState(3); // State-3: Left-ended (no space on the right)
                } else {
                    setScrollState(2); // State-2: In between (spaces on both sides)
                }
            } 
        }
    }, [itemWidth]);

    useEffect(() => {    
        var listElement = listRef.current?.parentElement;

        updateScrollState();
        if (listElement) {
            listElement.addEventListener('scroll', updateScrollState);
        }
        return () => {
            if (listElement) {
                listElement.removeEventListener('scroll', updateScrollState);
            }
        };
    }, [updateScrollState]);

    const handleNext = () => {
        // Scrolls the list to the right by one item width
        if (listRef.current) {
            const listElement = listRef.current.parentElement; 
            if (listElement) {
                listElement.scrollLeft += itemWidth * 3; 
                updateScrollState();
            }
        }
    };
    
    const handlePrev = () => {
        // Scrolls the list to the left by one item width
        if (listRef.current) {
            const listElement = listRef.current.parentElement; 
            if (listElement) {
                listElement.scrollLeft -= itemWidth * 3; 
                updateScrollState();
            }
        }
    };

    return (
        <div className="popular-movies-container">
            <div className="popular-movies-wrapper">
                <div className="popular-movies-title-wrapper">
                    <div className="popular-movies-title">
                        <h2>{title}</h2>
                    </div>
                </div>
                <div className="popular-movies-carousel-container">
                    <div>
                        <div className={`prev-button-wrapper ${scrollState === 1 || isLoading ? 'backwards' : ''} `}>
                            <button className="control-prev" type='button' onClick={handlePrev} aria-label="Scroll Left">
                                <LeftArrowIcon />
                            </button>
                        </div>
                    </div>
                    <ReturnMovieList listRef={listRef} scrollState={scrollState} setIsLoading={setIsLoading} onMovieClick={onMovieClick} url={url}/>
                    <div>
                        <div className={`next-button-wrapper ${scrollState === 3 || isLoading ? 'forwards' : ''}`}>
                            <button className="control-next" type='button' onClick={handleNext} aria-label="Scroll Right">
                                <RightArrowIcon />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};