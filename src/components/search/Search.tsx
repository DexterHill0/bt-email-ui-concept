import React from "react";

import styles from "./Search.module.scss";
import { IonIcon } from "@ionic/react";
import { optionsOutline, searchOutline } from "ionicons/icons";
import { useRef } from "react";

interface Props {
    width: string;
    height: string;
    colour: string;

    placeholder?: string;
    tooltip?: string;
}

const Search: React.FC<Props> = (props) => {
    const input = useRef<HTMLInputElement>(null);

    // focuses the input element if you click on the search icon
    const focusInputOnClick = () => {
        if (!input.current) {
            return;
        }

        input.current.focus();
    };

    return (
        <div
            title={props.tooltip}
            className={styles.search}
            style={{
                width: props.width,
                height: props.height,
                borderColor: props.colour,
            }}
        >
            <IonIcon
                icon={searchOutline}
                className={styles.searchIcon}
                onClick={focusInputOnClick}
            ></IonIcon>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={input}
                />
            </div>
            <IonIcon
                icon={optionsOutline}
                className={styles.optionsIcon}
            ></IonIcon>
        </div>
    );
};

export default Search;
