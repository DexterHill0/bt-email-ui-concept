import React, { forwardRef, useImperativeHandle } from "react";

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

export interface SearchRef {
    focus: () => void;
}

const Search = forwardRef<SearchRef, Props>((props, ref) => {
    const inputRef = useRef<HTMLInputElement>(null);

    useImperativeHandle(ref, () => ({
        // focuses the input element if you click on the search icon
        focus() {
            if (!inputRef.current) {
                return;
            }

            inputRef.current.focus();
        },
    }));


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
                onClick={() => inputRef.current && inputRef.current.focus()}
            ></IonIcon>
            <div className={styles.inputContainer}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder={props.placeholder}
                    ref={inputRef}
                />
            </div>
            <IonIcon
                icon={optionsOutline}
                className={styles.optionsIcon}
                title="Search Filters"
            ></IonIcon>
        </div>
    );
});

export default Search;
