import Loader from "@common/Spinner/Spinner";
import "./Button.css";

export default function Button({
    children,
    clickHandler,
    isLoading,
    disabled,
    className,
}) {
    return (
        <button
            className={`button ${className}`}
            onClick={clickHandler}
            disabled={isLoading || disabled}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
}
