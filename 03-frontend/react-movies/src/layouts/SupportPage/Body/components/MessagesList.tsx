import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import SupportMessageModel from "../../../../models/SupportMessageModel";
import React from "react";
import { Pagination } from "../../../Utils/Pagination";

export const MessagesList = () => {

    const { authState } = useOktaAuth();
    const [ httpError, setHttpError ] = useState(null);

    // Messages
    const [ messages, setMessages ] = useState<SupportMessageModel[]>([]);

    // Pagination
    const messagesPerPage = 5;
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0);

    useEffect(() => {
            const fetchUserMessageslist = async () => {
                if (authState && authState.isAuthenticated) {
                    const url: string = `${process.env.REACT_APP_API}/messages/search/findByUserEmail?userEmail=${authState.accessToken?.claims.sub}&page=${currentPage - 1}&size=${messagesPerPage}`;
                    const requestOptions = {
                        method: 'GET',
                        headers: {
                            Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                            'Content-Type': 'application/json' 
                        }
                    };
    
                    try {
                        const userMessageslistResponse = await fetch(url, requestOptions);
                        if (!userMessageslistResponse.ok) throw new Error('Something went wrong!');
        
                        const userMessageslistResponseJson = await userMessageslistResponse.json();
                        setMessages(userMessageslistResponseJson._embedded.messages);
                        setTotalPages(userMessageslistResponseJson.page.totalPages);
                    } catch (error: any) {
                        setHttpError(error.message);
                    }
                }
            }
            fetchUserMessageslist();
            window.scrollTo(0, 0);
        }, [authState, currentPage]);

        if (httpError) {
            return(
                <div className='container m-5'>
                    <p>{httpError}</p>
                </div>
            )
        }

        const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            {messages.length > 0 ? (
                messages.map(message => (
                    <React.Fragment key={`fragment-${message.id}`}>
                        <div key={`movie-${message.id}`} className="row position-relative justify-content-evenly rounded col-12 p-4 bg-dark text-white mb-2 z-3">
                            <h5>Case #{message.id}: {message.title}</h5>
                            <h6 className="fw-normal">{message.userEmail}</h6>
                            <p className="fw-light">{message.question}</p>
                            <hr />
                            <div>
                                <h5>Response:</h5>
                                {message.response && message.adminEmail ? 
                                    <>
                                        <h6 className="fw-normal">{message.adminEmail} (admin)</h6>
                                        <p className="fw-light">{message.response}</p>
                                    </>
                                    :
                                    <p className="fw-light"><i>Pending resposne from the admins. Please be patient.</i></p>
                                }
                            </div>
                        </div>
                    </React.Fragment>
                ))
            ) : (
                <h5>All questions you submit will be shown here</h5>
            )}
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}          
        </>

    );
}