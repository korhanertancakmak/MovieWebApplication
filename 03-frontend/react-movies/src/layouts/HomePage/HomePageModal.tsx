import { useEffect, useRef } from "react";
import {ReactComponent as ModalClose} from "../../Images/modalClose.svg";
import {ReactComponent as ChevronRightStandard} from "../../Images/chevronRightStandard.svg";
import { Link } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";
import "./HomePageModal.css";

export const HomePageModal = ({ movie, onClose }: { movie: any; onClose: () => void }) => {

    const overlayRef = useRef<HTMLDivElement>(null);
    const { authState } = useOktaAuth();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            // Check if the click is outside the modal-overlay element
            if (
                overlayRef.current &&
                !overlayRef.current.contains(event.target as Node)
            ) {
                onClose(); // Close the modal
            }
        };

        // Add event listener to the document
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [onClose]);

    return (
        <div className="modal-overlay" ref={overlayRef}>
            <button className="modal-close-button" onClick={onClose}>
                <div className="modal-close-button-icon">
                    <ModalClose />
                </div>
            </button>
            <div className="modal-content-container">
                <div className="modal-content-wrapper">
                    <div className="modal-content-trailer">
                        <iframe src={movie.trailer} referrerPolicy="strict-origin-when-cross-origin" allowFullScreen title={`Trailer for ${movie.title}`}></iframe>
                    </div>
                    <div className="modal-content-details">
                        <ul className="modal-content-movie-details">
                            {movie.release_date && (
                                <li className="movie-detail-release-date fs-5 fw-normal">{new Date(movie.release_date).getFullYear()}</li>
                            )}
                            {movie.genre && (
                                <li className="movie-detail-genre fs-5 fw-normal">{movie.genre}</li>
                            )}
                            {movie.rating && (
                                <li className="movie-detail-rating fs-5 fw-normal">{movie.rating}/10.0</li>
                            )}
                        </ul>
                        <div className="modal-content-movie-description">
                            <p className="fs-6 fw-light">{movie.description}</p>
                        </div>
                        {authState?.isAuthenticated ? 
                            <>
                                <div className="modal-signup-button-container">
                                    <Link type="button" className="modal-signup-button" to={`/movies/${movie.id}`}>
                                        Watch
                                        <ChevronRightStandard />
                                    </Link>
                                </div>
                                <div className="modal-signup-warning">
                                    <p className="fs-6 fw-light">Enjoy with the movie!</p>
                                </div>
                            </>
                        :
                            <>
                                <div className="modal-signup-button-container d-block">
                                    <Link type="button" className="modal-signup-button" to="/login">
                                        Get Started
                                        <ChevronRightStandard />
                                    </Link>
                                </div>
                                <div className="modal-signup-warning">
                                    <p className="fs-5 fw-normal">Sign in or create your membership now!</p>
                                </div>
                            </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};