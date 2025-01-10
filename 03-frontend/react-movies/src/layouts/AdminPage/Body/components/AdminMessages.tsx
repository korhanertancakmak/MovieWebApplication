import { useOktaAuth } from "@okta/okta-react";
import { useEffect, useState } from "react";
import SupportMessageModel from "../../../../models/SupportMessageModel";
import { Pagination } from "../../../Utils/Pagination";
import { AdminMessage } from "./AdminMessage";
import AdminMessageRequest from "../../../../models/AdminMessageRequest";

export const AdminMessages = () => {

    const { authState } = useOktaAuth();
    const [ httpError, setHttpError ] = useState(null); 

    // Messages endpoint State
    const [ messages, setMessages ] = useState<SupportMessageModel[]>([]);
    // Pagination
    const [ messagesPerPage ] = useState(5);
    const [ currentPage, setCurrentPage ] = useState(1);
    const [ totalPages, setTotalPages ] = useState(0);

    // Recall useEffect
    const [ btnSubmit, setBtnSubmit ] = useState(false);

    useEffect(() => {
        const fetchUserMessageslist = async () => {
            if (authState && authState.isAuthenticated) {
                const url: string = `${process.env.REACT_APP_API}/messages/search/findByClosed?closed=false&page=${currentPage - 1}&size=${messagesPerPage}`;
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
    }, [authState, currentPage, btnSubmit]);

    if (httpError) {
        return(
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        )
    }

    async function submitResponseToQuestion(id: number, response: string) {
        const url = `${process.env.REACT_APP_API}/messages/secure/admin/message`;
        if (authState && authState?.isAuthenticated && id !== null && response !== "") {
            const messageAdminRequestModel: AdminMessageRequest = new AdminMessageRequest(id, response);
            const requestOptions = {
                method: "PUT", 
                headers: {
                    Authorization: `Bearer ${authState.accessToken?.accessToken}`,
                    'Content-Type': 'application/json' 
                },
                body: JSON.stringify(messageAdminRequestModel)
            }
            const messageAdminRequestModelResponse = await fetch(url, requestOptions);
            if (!messageAdminRequestModelResponse.ok) throw new Error('Something went wrong!');

            setBtnSubmit(!btnSubmit);
        } 
    }

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    return (
        <>
            {messages.length > 0 ? (
                messages.map(message => (
                    <AdminMessage key={`pendingMessage-${message.id}`} message={message} submitResponseToQuestion={submitResponseToQuestion}/>
                ))
            ) : (
                <h5>No pending questions submitted</h5>
            )}
            {totalPages > 1 && <Pagination currentPage={currentPage} totalPages={totalPages} paginate={paginate} />}          
        </>
    );
}