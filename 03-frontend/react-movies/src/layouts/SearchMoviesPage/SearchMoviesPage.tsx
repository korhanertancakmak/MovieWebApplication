import { Background } from "../HomePage/Background/Background";
import { Body } from "./Body/Body";
import "./SearchMoviesPage.css";

export const SearchMoviesPage = () => {

    return (
        <div className="PageContainer" style={{width: "100%", minHeight: "1750px", position: "relative", background: "#0f0f0f", overflow: "hidden"}}>
            <Background />
            <Body />
        </div>
    );
}
