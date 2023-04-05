import Loader from "@common/spinner/Spinner";
import "./Button.css";

export default function Button({ children, clickHandler, isLoading }) {

    return (
        <button className="button" onClick={clickHandler} disabled={isLoading}>
            {isLoading ? <Loader /> : children}
        </button>
    );
}
