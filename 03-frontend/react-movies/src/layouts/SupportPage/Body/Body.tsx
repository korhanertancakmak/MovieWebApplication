import { useState } from "react";
import { PostNewMessage } from "./components/PostNewMessage";
import { MessagesList } from "./components/MessagesList";

export const Body = () => {

    const [messagesClick, setMessagesClick] = useState(false);

    return(
        <div className="body-container">
            <div className="body-wrapper align-items-start text-white">
                <nav>
                    <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                        <button onClick={() => setMessagesClick(false)} className="nav-link active border-0 text-white me-2 rounded" 
                            id="nav-send-message-tab" data-bs-toggle="tab" data-bs-target="#nav-send-message"
                            type="button" role="tab" aria-controls="nav-send-message" aria-selected="true"  
                            style={{backgroundColor: "rgb(0,0,0)"}}>
                            Submit Question
                        </button>
                        <button onClick={() => setMessagesClick(true)} className="nav-link border-0 text-white rounded" 
                            id="nav-send-message-tab" data-bs-toggle="tab" data-bs-target="#nav-message"
                            type="button" role="tab" aria-controls="nav-message" aria-selected="false"
                            style={{backgroundColor: "rgb(0,0,0)"}}>
                            Q/A Response/Pending
                        </button>
                    </div>
                </nav>
                <hr className="border border-black border-2 opacity-50 w-100" />
                <div className="tab-content w-100" id="nav-tabContent">
                    <div className="tab-pane fade show active text-white p-3 rounded w-100" id="nav-send-message" role="tabpanel" aria-labelledby="nav-send-message-tab">
                        <PostNewMessage />
                    </div>
                    <div className="tab-pane fade text-white p-3 rounded w-100" id="nav-message" role="tabpanel" aria-labelledby="nav-message-tab">
                        {messagesClick ? <MessagesList /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}