import { Spinner } from "react-bootstrap";

export default function Loader() {
    return (
        <div className="d-flex justify-content-center align-items-center py-4 w-100 h-100">
            <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
}
