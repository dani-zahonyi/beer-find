import React from "react";
import colors from "../constants/colors";

const ErrorContext = React.createContext();

const ErrorMsgWrapper = () => {
    const { error, showError } = React.useContext(ErrorContext);
    return error ? (
        <div style={{}}>
            <div
                style={{
                    background: "black",
                    minWidth: "100vw",
                    minHeight: "100vh",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    opacity: 0.8
                }}
            ></div>
            <div
                style={{
                    background: colors.primary,
                    minWidth: 250,
                    padding: 30,
                    borderRadius: 15,
                    top: 15,
                    position: "absolute",
                    zIndex: 99,
                    left: "50vw",
                    WebkitTransform: "translateX(-50%)",
                    transform: "translateX(-50%)"
                }}
            >
                {error}
                <button
                    onClick={() => showError(null)}
                    style={{
                        width: 30,
                        height: 30,
                        padding: 5,
                        borderRadius: 30,
                        marginLeft: 15
                    }}
                >
                    Ok
                </button>
            </div>
        </div>
    ) : (
        <></>
    );
};
const ErrorStore = ({ children }) => {
    const [error, setError] = React.useState("");

    return (
        <ErrorContext.Provider
            value={{
                showError: errorMsg => setError(errorMsg),
                error
            }}
        >
            <ErrorMsgWrapper></ErrorMsgWrapper>
            {children}
        </ErrorContext.Provider>
    );
};

export { ErrorContext };
export default ErrorStore;
