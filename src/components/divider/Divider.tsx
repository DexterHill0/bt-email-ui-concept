import React from "react";
import { default as cx } from "classnames";

import styles from "./Divider.module.scss";

interface Props {
    width?: string;
    height?: string;

    orientation?: "v" | "h";

    className?: string;
}

const Divider: React.FC<Props> = (props) => {
    return (
        <div
            className={cx(styles.divider, props.className)}
            data-orientation={props.orientation || "h"}
            style={{
                width: props.width,
                height: props.height,
            }}
        ></div>
    );
};

export default Divider;
