import { useEffect, useState } from "react";
import MovieModel from "../../../../models/MovieModel";
import ReviewModel from "../../../../models/ReviewModel"
import { SingleReview } from "./SingleReview";
import { ReactComponent as CommentIcon } from "../../../../Images/commentIcon.svg";
import { ReactComponent as ExclamationIcon } from "../../../../Images/exclamationIcon.svg";
import { useOktaAuth } from "@okta/okta-react";
import { LeaveAReview } from "../../../Utils/LeaveAReview";
import ReviewRequestModel from "../../../../models/ReviewRequestModel";

export const ReviewListBox: React.FC<{ movie: MovieModel, setTotalStars: any }> = (props) => {

    // All-Reviews State
    const [reviews, setReviews] = useState<ReviewModel[]>([]);
    const [reviewsRenderLimit, setReviewsRenderLimit] = useState(5);
    const [httpError, setHttpError] = useState(null);
    const { authState } = useOktaAuth();

    // Current user-review state
    const [isUserReviewLeft, setIsUserReviewLeft] = useState(false);

    // reviews of the movie useEffect
    useEffect(() => {
        const fetchMovieReviews = async () => {
            const reviewUrl: string = `${process.env.REACT_APP_API}/reviews/search/findByMovieId?movieId=${props.movie.id}`;

            try {
                const responseReviews = await fetch(reviewUrl);
                if (!responseReviews.ok) throw new Error('Something went wrong!');

                const responseJsonReviews = await responseReviews.json();
                const responseData = responseJsonReviews._embedded.reviews;
                const loadedReviews: ReviewModel[] = [];
                let weightedStarReviews: number = 0;

                for (const key in responseData) {
                    loadedReviews.push({
                        id: responseData[key].id,
                        userEmail: responseData[key].userEmail,
                        movieId: responseData[key].movieId,
                        reviewText: responseData[key].reviewText,
                        rating: responseData[key].rating,
                        date: responseData[key].date
                    })
                    weightedStarReviews = weightedStarReviews + responseData[key].rating;
                }

                if (loadedReviews) {
                    const avgStarReviews = weightedStarReviews / loadedReviews.length;
                    props.setTotalStars(Number(avgStarReviews));
                }

                setReviews(loadedReviews);
            } catch (error: any) {
                setHttpError(error.message);
            }
        }
        fetchMovieReviews();
    }, [props.movie, isUserReviewLeft, reviewsRenderLimit]);

    // single review of the current user to the movie useEffect
    useEffect(() => {
        const fetchUserReviewMovie = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `${process.env.REACT_APP_API}/reviews/secure/user/movie?movieId=${props.movie.id}`;
                const requestOptions = {
                    method: 'GET',
                    headers: {
                        Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                        'Content-Type': 'application/json' 
                    }
                };

                try {
                    const userReview = await fetch(url, requestOptions);
                    if (!userReview.ok) throw new Error('Something went wrong!');
    
                    const userReviewResponseJson = await userReview.json();
                    setIsUserReviewLeft(userReviewResponseJson);
                } catch (error: any) {
                    setHttpError(error.message);
                }
            }
        }
        fetchUserReviewMovie();
    }, [authState, props.movie]);

    async function submitReview (starInput: number, reviewDescription: string) {
        let movieId: number = 0;
        if (props.movie.id) {
            movieId = props.movie.id;
        }
        const reviewRequestModel = new ReviewRequestModel(starInput, movieId, reviewDescription);
        const url = `${process.env.REACT_APP_API}/reviews/secure?movieId=${props.movie.id}`;
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${authState?.accessToken?.accessToken}`,
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify(reviewRequestModel)
        };

        try {
            const returnResponse = await fetch(url, requestOptions);
            if (!returnResponse.ok) throw new Error('Something went wrong!');

            setIsUserReviewLeft(true);
        } catch (error: any) {
            setHttpError(error.message);
        }
    }

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    function leaveAReviewRender() {
        if (authState?.isAuthenticated && !isUserReviewLeft) {
            return(
                <div className="d-flex rounded justify-content-between align-items-center bg-dark">
                    <div style={{width: "100%"}}><LeaveAReview submitReview={submitReview} /></div>
                </div>
            )
        } else if (authState?.isAuthenticated && isUserReviewLeft) {
            return(
                <div className="rounded my-3 p-1 text-white z-3" style={{backgroundColor: "rgba(0, 50, 0, 0.5)"}}>
                    <h5 className="m-0 p-2">Thank you for your review!</h5>
                </div>
            )
        } else {
            return(
                <div className="rounded my-3 p-1 text-white z-3" style={{backgroundColor: "rgb(220 38 38 / 0.1)"}}>
                    <div className="d-flex align-items-center gap-3 rounded p-2 mb-1" style={{color: "rgb(252 165 165)"}}>
                        <ExclamationIcon style={{width: "1.5rem", height: "1.5rem", color: "rgb(252 165 165)"}} />
                        Only registered members can leave a comment. You can register/sign in just a few seconds.
                    </div>
                </div>
            )
        }
    }

    function increasePostReviewsLimit() {
        setReviewsRenderLimit(reviewsRenderLimit + reviewsRenderLimit);
    }

    return (
        <div className="row rounded col-12 p-0 bg-darker text-white z-3">
            {/* New Review */}
            {leaveAReviewRender()}
            {/* Old Reviews */}
            <div className="d-flex rounded justify-content-between align-items-center mt-3 bg-dark">
                <h5 className="m-0 p-2">Comments: ({reviews.length})</h5>
                <CommentIcon style={{width: "1.5rem", height: "1.5rem"}} />
            </div>
            <div className="d-flex flex-column justify-content-between align-items-center p-0 mt-2">
                {reviews.length > 0 ? 
                    <>
                        {reviews.slice(0, reviewsRenderLimit).reverse().map(eachReview => (
                            <SingleReview review = {eachReview} key= {eachReview.id}></SingleReview>
                        ))}
                        <div>
                            {reviewsRenderLimit < reviews.length ? 
                                <button type="button" className="btn main-color btn-md text-white" onClick={() => increasePostReviewsLimit()}>
                                    Reach all reviews
                                </button>
                                :
                                <></>
                            }
                        </div>
                    </>
                    :
                    <div>
                        <p className="lead">Currently there are no reviews for this movie.</p>
                    </div>
                }
            </div>
        </div>
    );
}