import { useState, useContext, useMemo } from "react";
import { AppContext } from "../../../context/AppContext";
import { ErrorContext } from "../../../context/ErrorContext";

export default () => {
    const [username, setUsername] = useState("");

    const validForm = useMemo(() => username && username.length < 16, [username]);

    const { login } = useContext(AppContext);
    const { showError } = useContext(ErrorContext);

    const inputHandler = e => setUsername(e.target.value);

    const submitHandler = async event => {
        if (event) event.preventDefault();
        const json = await fetch("https://yesno.wtf/api")
            .then(resp => resp.json())
            .catch(() => {
                showError(
                    "Something wrong with to API, maybe your, please check your internet connection!"
                );
            });
        if (json && json.answer === "yes") {
            login(username);
        } else {
            showError("Please try again.");
        }
    };

    return { username, inputHandler, submitHandler, validForm };
};
