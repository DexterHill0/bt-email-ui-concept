import React from "react";

import Text from "../text/Text";

import styles from "./Notification.module.scss";

interface Props {
    count?: number;

    children: React.ReactNode;
}

const Notification: React.FunctionComponent<Props> = (props) => {
    return (
        <div
            className={styles.container}
            title={`${props.count} Unread E-Mail(s)`}
        >
            <div className={styles.notification}>
                <div className={styles.text}>
                    <Text>{(props.count || 0) > 99 ? "99+" : props.count}</Text>
                </div>
            </div>
            {props.children}
        </div>
    );
};

export default Notification;
