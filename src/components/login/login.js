import React, { useContext, useState } from "react";
import Modal from "../ui/modal";
import { MailIcon, PasswordIcon } from "../../resources/icons";
import { LOGIN } from "../../api/login-api";
import { LogContext } from "../../store/logContext";
import styles from "./login.module.css";
import Loading from "../ui/loading";
import { Error_Toast, Success_Toast } from "../ui/toast/toast";

const Login = () => {
    const LogCtx = useContext(LogContext);
    const [isLodaing, setIsLoading] = useState(false);
    const handleLoginForm = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData);
        console.log(data);
        const res = await LOGIN(data);
        if (res.status === 200) {
            setIsLoading(false);
            Success_Toast("Successfully Login!")
            localStorage.setItem("MeldCX_Token", res.token)
            LogCtx.setIsLoggedIn(true);
        }
        else {
            setIsLoading(false);
            Error_Toast(res.error);
        }
    };
    return <Modal>
        <h1>Login</h1>
        {isLodaing && <Loading />}
        {!isLodaing && <form onSubmit={handleLoginForm} className={styles.formInput}>
            <div className={styles.emailInput}>
                <input type="email" name="email" defaultValue="nihal.abedin.annon99@gmail.com" placeholder="Email Address" required />
                {MailIcon}
            </div>
            <div className={styles.passwordInput}>
                <input type="password" name="password" defaultValue="meld123" placeholder="Password" required />
                {PasswordIcon}
            </div>
            <div className={styles.loginBtn}>
                <button type="submit">Login</button>

            </div>
        </form>}

    </Modal>
}
export default Login;