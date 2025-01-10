import { useState } from "react";
import SupportMessageModel from "../../../../models/SupportMessageModel";

export const AdminMessage: React.FC<{ message: SupportMessageModel, submitResponseToQuestion: any }> = (props, key) => {

    const [ displayWarning, setDisplayWarning ] = useState(false);
    const [ response, setResponse ] = useState('');

    function submitBtn() {
        if (props.message.id !== null && response !== "") {
            props.submitResponseToQuestion(props.message.id, response);
            setDisplayWarning(false);
        } else {
            setDisplayWarning(true);
        }
    }

    return(
        <div key={`movie-${props.message.id}`} className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
            <h5>Case #{props.message.id}: {props.message.title}</h5>
            <h6 className="fw-normal">{props.message.userEmail}</h6>
            <p className="fw-light">{props.message.question}</p>
            <hr />
            <div>
                <h5>Response:</h5>
                <form action="PUT" className="p-0">
                    {displayWarning && 
                        <div className="alert alert-danger mb-2" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    <div className="col-xl-12 col-lg-10 col-md-10 pl-md-4">
                        <label className="form-label">Description:</label>
                        <textarea className="form-control" id="FormControlTextarea1" 
                            rows={5} onChange={e => setResponse(e.target.value)} value={response}></textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClick={submitBtn}>
                            Submit Response
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}