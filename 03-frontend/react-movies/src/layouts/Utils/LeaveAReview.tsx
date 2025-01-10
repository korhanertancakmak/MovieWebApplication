import { useState } from "react";
import { StarsReview } from "../MoviePage/Body/components/StarsReview";

export const LeaveAReview: React.FC<{ submitReview: any }> = (props) => {

    const [starInput, setStarInput] = useState(0);
    const [displayInput, setDisplayInput] = useState(false);
    const [reviewDescription, setReviewDescription] = useState('');

    function starValue(value: number) {
        setStarInput(value);
        setDisplayInput(true);
    }

    const starOptions = Array.from({ length: 21 }, (_, index) => index * 0.5);

    return(
        <div className="dropdown dropup" style={{ cursor: 'pointer' }}>
            <h5 className="dropdown-toggle" id="dorpdownMenuButton1" data-bs-toggle='dropdown'>Leave a review?</h5>
            <ul id="submitReviewRating" className="dropdown-menu" aria-labelledby="dorpdownMenuButton1">
                {starOptions.map((star) => (
                    <li key={star}>
                        <button onClick={() => starValue(star)} className="dropdown-item">{star} point</button>
                    </li>
                ))}
            </ul>
            <StarsReview rating={starInput} size={16} />
            {displayInput && 
                <form method="POST" action='#'>
                    <div className="">
                        <label className="form-label">Comments:</label>
                        <style>
                            {`
                                #submitReviewDescription::placeholder {
                                    color: white;
                                }
                            `}
                        </style>
                        <textarea className="form-control bg-dark text-white" id="submitReviewDescription" 
                            placeholder="Optional" rows={3} onChange={e => setReviewDescription(e.target.value)}></textarea>
                    </div>
                    <div>
                        <button type="button" onClick={() => props.submitReview(starInput, reviewDescription)} className="btn btn-primary mt-3">Submit Review</button>
                    </div>
                </form>
            }
        </div>
    );
};