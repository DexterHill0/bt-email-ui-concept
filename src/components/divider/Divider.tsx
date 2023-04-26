import * as React from "react";

import styles from "./Divider.module.scss";

interface Props {
    width?: string;
    height?: string;

    orientation?: "v" | "h";
}

const Divider: React.FC<Props> = (props) => {
    return (
        <div
            className={styles.divider}
            data-orientation={props.orientation || "h"}
            style={{
                width: props.width,
                height: props.height,
            }}
        ></div>
    );
};

export default Divider;
