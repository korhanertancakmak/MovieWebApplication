import { Histroylist } from "./components/Historylist";
import { Watchlist } from "./components/Watchlist";

export const Body = () => {

    return(
        <div className="body-container">
            <div className="body-wrapper align-items-start text-white">
                <nav>
                    <div className="nav nav-tabs border-0" id="nav-tab" role="tablist"> 
                        <button className="nav-link active border-0 text-white me-2 rounded" id="nav-watchlist-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-watchlist" type="button" role="tab" aria-controls="nav-watchlist"
                            aria-selected="true" style={{backgroundColor: "rgb(0,0,0)"}}> 
                                Your Watchlist
                        </button>
                        <button className="nav-link border-0 text-white rounded" id="nav-history-tab" data-bs-toggle="tab"
                            data-bs-target="#nav-history" type="button" role="tab" aria-controls="nav-history"
                            aria-selected="false" style={{backgroundColor: "rgb(0,0,0)"}}> 
                                Your History
                        </button>
                    </div>
                </nav>
                <hr className="border border-black border-2 opacity-50 w-100" />
                <div className="tab-content w-100" id="nav-tabContent">
                    <div className="tab-pane fade show active text-white p-3 rounded w-100" id="nav-watchlist" role="tabpanel" aria-labelledby="nav-watchlist-tab">
                        <Watchlist />
                    </div>
                    <div className="tab-pane fade text-white p-3 rounded w-100" id="nav-history" role="tabpanel" aria-labelledby="nav-history-tab">
                        <Histroylist />
                    </div>
                </div>
            </div>
        </div>
    );
}