import Loader from "@common/spinner/Spinner";
import "./Button.css";

export default function Button({ children, clickHandler, isLoading, disabled }) {

    return (
        <button className="button" onClick={clickHandler} disabled={isLoading || disabled}>
            {isLoading ? <Loader /> : children}
        </button>
    );
}
