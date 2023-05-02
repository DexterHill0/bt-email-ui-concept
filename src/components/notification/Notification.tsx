import React from "react";

import Text from "../text/Text";

import styles from "./Notification.module.scss";

interface Props {
    count?: number | null;

    children: React.ReactNode;
}

const Notification: React.FunctionComponent<Props> = (props) => {
    return (
        <div
            className={styles.container}
            title={
                props.count !== null
                    ? `${props.count} Unread E-Mail(s)`
                    : "Unread"
            }
        >
            <div
                className={styles.notification}
                style={{
                    transform:
                        props.count === null ? "translate(50%, -100%)" : "",
                }}
            >
                <div className={styles.text}>
                    {props.count !== null ? (
                        <Text>
                            {(props.count || 0) > 99 ? "99+" : props.count}
                        </Text>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default Notification;
