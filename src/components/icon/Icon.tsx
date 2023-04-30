import * as React from "react";
import { IonIcon } from "@ionic/react";
import { default as cx } from "classnames";

import styles from "./Icon.module.scss";

interface Props {
    icon: string;
    iconSize?: "md" | "lg";
    className?: string;
    style?: React.CSSProperties;

    onClick?: (event: React.MouseEvent<HTMLIonIconElement, MouseEvent>) => void;
}

// wrapper to make it easier to set the size
const Icon: React.FunctionComponent<Props> = (props) => {
    return (
        <IonIcon
            icon={props.icon}
            data-size={props.iconSize || "lg"}
            className={cx(styles.icon, props.className)}
            style={props.style}
            onClick={props.onClick}
        ></IonIcon>
    );
};

export default Icon;
