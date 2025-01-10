import { useOktaAuth } from "@okta/okta-react";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import { AdminMessages } from "./components/AdminMessages";
import { AddNewMovie } from "./components/AddNewMovie";
import { FindToChangeAMovie } from "./components/FindToChangeAMovie";

export const Body = () => {

    const { authState } = useOktaAuth();
    const [ changeSourceOfMoviesClick, setchangeSourceOfMoviesClick ] = useState(false);
    const [ messagesClick, setMessagesClick ] = useState(false);

    const [ activeTab, setActiveTab ] = useState('add-movie');

    const handleTabClick = (tabName: string) => {
        setActiveTab(tabName);
    };

    const getButtonStyle = (tabName: string) => {
        return activeTab === tabName
            ? { backgroundColor: "white", color: "black" }
            : { backgroundColor: "rgb(0,0,0)", color: "white" };
    };

    function addMovieClickFunction() {
        setchangeSourceOfMoviesClick(false);
        setMessagesClick(false);
    }

    function changeSourceOfMoviesClickFunction() {
        setchangeSourceOfMoviesClick(true);
        setMessagesClick(false);
    }

    function messagesClickFunction() {
        setMessagesClick(true);
        setchangeSourceOfMoviesClick(false);
    }

    if (authState?.accessToken?.claims.userType === undefined) {
        return <Navigate to="/home" />
    }

    return(
        <div className="body-container">
            <div className="body-wrapper align-items-start text-white">
                <nav>
                    <div className="nav nav-tabs border-0" id="nav-tab" role="tablist">
                        <button className="nav-link active border-0 me-2 rounded" 
                            id="nav-add-movie-tab" data-bs-toggle="tab" data-bs-target="#nav-add-movie"
                            type="button" role="tab" aria-controls="nav-add-movie" aria-selected="false"  
                            style={getButtonStyle("add-movie")}
                            onClick={() => {handleTabClick("add-movie"); addMovieClickFunction()}}>
                            Add new movie
                        </button>
                        <button className="nav-link border-0 me-2 rounded" 
                            id="nav-change-movie-tab" data-bs-toggle="tab" data-bs-target="#nav-change-movie"
                            type="button" role="tab" aria-controls="nav-change-movie" aria-selected="false"
                            style={getButtonStyle("change-movie")}
                            onClick={() => {handleTabClick("change-movie"); changeSourceOfMoviesClickFunction()}}>
                            Change Movie Source
                        </button>
                        <button className="nav-link border-0 me-2 rounded" 
                            id="nav-messages-tab" data-bs-toggle="tab" data-bs-target="#nav-messages"
                            type="button" role="tab" aria-controls="nav-messages" aria-selected="false"
                            style={getButtonStyle("messages")}
                            onClick={() => {handleTabClick("messages"); messagesClickFunction()}}>
                            Messages
                        </button>
                    </div>
                </nav>
                <hr className="border border-black border-2 opacity-50 w-100" />
                <div className="tab-content w-100" id="nav-tabContent">
                    <div className="tab-pane fade show active text-white p-3 rounded w-100" id="nav-add-movie" role="tabpanel" aria-labelledby="nav-add-movie-tab">
                        <AddNewMovie />
                    </div>
                    <div className="tab-pane fade text-white p-3 rounded w-100" id="nav-change-movie" role="tabpanel" aria-labelledby="nav-change-movie-tab">
                        {changeSourceOfMoviesClick ? <FindToChangeAMovie /> : <></>}
                    </div>
                    <div className="tab-pane fade text-white p-3 rounded w-100" id="nav-messages" role="tabpanel" aria-labelledby="nav-messages-tab">
                        {messagesClick ? <AdminMessages /> : <></>}
                    </div>
                </div>
            </div>
        </div>
    );
}