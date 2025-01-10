import ReviewModel from "../../../../models/ReviewModel";
import { StarsReview } from "./StarsReview";

export const SingleReview: React.FC<{ review: ReviewModel }> = (props) => {

    const date = new Date(props.review.date);
    const longMonth = date.toLocaleString('en-us', { month: 'long' });
    const dateDay = date.getDate();
    const dateYear = date.getFullYear();

    const dateRender = longMonth + ' ' + dateDay + ', ' + dateYear; 

    return (
        <div className="rounded mb-2 p-4 w-100 bg-dark">
            <div className="col-12 text-white">
                <h5 className="fs-5 fw-normal">{props.review.userEmail}</h5>
                <div className="row justify-content-between">
                    <div className="col-lg-3 col-md-4 col-sm-4 fs-6 fst-italic">{dateRender}</div>
                    <div className="col-lg-3 col-md-4 col-sm-4 d-flex justify-content-end"><StarsReview rating={props.review.rating} size={16} /></div>
                </div>
                <div className="mt-2">
                    <p className="fs-6 fw-light">{props.review.reviewText}</p>
                </div>
            </div>
        </div>
    );
};