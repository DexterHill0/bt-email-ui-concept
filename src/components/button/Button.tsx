import React from "react";
import { default as cx } from "classnames";
import { IonIcon } from "@ionic/react";

import styles from "./Button.module.scss";

interface Props {
    width: string;
    height: string;

    icon?: string;
    iconSize?: "md" | "lg";

    theme?: "filled" | "outline";

    colour?: string;

    disabled?: boolean;
    tooltip?: string;

    children?: React.ReactNode;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button
            title={props.tooltip}
            style={{
                width: props.width,
                height: props.height,
                borderColor:
                    (props.theme || "outline") === "outline"
                        ? props.colour
                        : "none",
                background: props.theme === "filled" ? props.colour : "none",
            }}
            className={cx({
                [styles.button]: true,
                [styles.disabled]: props.disabled,
            })}
            data-theme={props.theme || "outline"}
        >
            {props.icon ? (
                <div className={styles.content}>
                    <IonIcon
                        icon={props.icon}
                        data-size={props.iconSize || "lg"}
                        className={styles.icon}
                    ></IonIcon>
                    {props.children}
                </div>
            ) : (
                props.children
            )}
        </button>
    );
};

export default Button;
