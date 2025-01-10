import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import SupportMessageModel from "../../../../models/SupportMessageModel";

export const PostNewMessage = () => {

    const { authState } = useOktaAuth();
    const [title, setTitle] = useState('');
    const [question, setQuestion] = useState('');
    const [displayWarning, setDisplayWarning] = useState(false);
    const [displaySuccess, setDisplaySuccess] = useState(false);

    async function submitNewQuestion() {
        const url = `${process.env.REACT_APP_API}/messages/secure/add/message`;
        if (authState?.isAuthenticated && title !== "" && question !== "") {
            const messageRequestModel: SupportMessageModel = new SupportMessageModel(title, question);
            const requestOptions = {
                method: "POST", 
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(messageRequestModel)
            };

            const submitNewQuestionResponse = await fetch(url, requestOptions);
            if (!submitNewQuestionResponse.ok) throw new Error('Something went wrong!');

            setTitle('');
            setQuestion('');
            setDisplayWarning(false);
            setDisplaySuccess(true);
        } else {
            setDisplayWarning(true);
            setDisplaySuccess(false);
        }
    }

    return (
        <div className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
            <div className="row justify-content-evenly rounded col-12 p-0">
                Ask a new question to the admins below:
            </div>
            <div className="row position-relative justify-content-evenly rounded col-12 p-0">
                <form method="POST" className="p-0">
                    {displayWarning && 
                        <div className="alert alert-danger mb-2" role="alert">
                            All fields must be filled out
                        </div>
                    }
                    {displaySuccess && 
                        <div className="alert alert-success mb-2" role="alert">
                            Question added successfully
                        </div>
                    }
                    <div className="col-xl-12 col-lg-10 col-md-10 pl-md-4 mb-2">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" 
                            id="FormControlInput1" placeholder="Title" onChange={e => setTitle(e.target.value)} value={title}/>
                    </div>
                    <div className="col-xl-12 col-lg-10 col-md-10 pl-md-4">
                        <label className="form-label">Question:</label>
                        <textarea className="form-control" id="FormControlTextarea1" 
                            rows={5} onChange={e => setQuestion(e.target.value)} value={question}></textarea>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary mt-3" onClick={submitNewQuestion}>
                            Submit Question
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}