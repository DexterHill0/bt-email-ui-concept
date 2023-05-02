import React, { useEffect, useState } from "react";

import styles from "./Checkbox.module.scss";
import Icon from "../icon/Icon";
import { checkmarkOutline } from "ionicons/icons";

interface Props {
    width: string;
    height: string;

    isChecked?: boolean;
    disabled?: boolean;

    colour?: string;

    title?: string;

    onClick?: (checked: boolean) => void;
}

const CheckBox: React.FunctionComponent<Props> = (props) => {
    const [isChecked, setIsChecked] = useState(props.isChecked || false);

    return (
        <span
            className={styles.container}
            title={props.title}
            onClick={() => setIsChecked((v) => !v)}
        >
            <input
                type="checkbox"
                className={styles.checkbox}
                style={{
                    width: props.width,
                    height: props.height,
                    borderColor: props.colour,
                }}
                disabled={props.disabled}
                checked={isChecked}
            />
            <Icon
                icon={checkmarkOutline}
                className={styles.checkmark}
                style={{
                    visibility: isChecked ? "visible" : "hidden",
                    width: props.width,
                    height: props.height,
                }}
            ></Icon>
        </span>
    );
};

export default CheckBox;
