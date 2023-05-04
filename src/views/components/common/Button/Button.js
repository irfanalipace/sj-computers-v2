import Loader from "@common/Spinner/Spinner";
import "./Button.css";

export default function Button({
    children,
    clickHandler,
    isLoading,
    disabled,
    className,
    ...props
}) {
    return (
        <button
            className={`button ${className}`}
            onClick={clickHandler}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading ? <Loader /> : children}
        </button>
    );
}
