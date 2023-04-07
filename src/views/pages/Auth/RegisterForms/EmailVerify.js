import { Link } from "react-router-dom";

export default function EmailVerify() {
    return (
        <div>
            <h2>PleaseCheck inbox to verify your email</h2>
            <Link to={"/login"}>Login</Link>
        </div>
    );
}
