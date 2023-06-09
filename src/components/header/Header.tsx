import React from "react";
import { default as cx } from "classnames";
import { IonIcon } from "@ionic/react";
import { settingsOutline } from "ionicons/icons";

import styles from "./Header.module.scss";

import Text from "../text/Text";

const LINKS = [
    ["Mail", "#"],
    ["Contacts", "#"],
    ["Calender", "#"],
    ["Tasks", "#"],
    ["MyBT", "#"],
    ["Help", "#"],
];

const Header: React.FC = () => {
    const selected = 0; // this would be normally be dependent on the uri path

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <img
                    src="bt-logo.png"
                    alt="Logo"
                    className={styles.logo}
                    style={{ zIndex: 2 }}
                ></img>
                <nav style={{ zIndex: 2 }}>
                    <ul className={styles.links}>
                        {LINKS.map((l, i) => (
                            <li key={i} className={styles.linkContainer}>
                                <Text
                                    form="a"
                                    size="lg"
                                    href={l[1]}
                                    className={cx({
                                        [styles.link]: true,
                                        [styles.selected]: i === selected,
                                    })}
                                >
                                    <div className={styles.concave}></div>
                                    {l[0]}
                                </Text>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
            <div className={styles.headerContentRounded}></div>
            <div className={styles.rect}></div>
            <div className={styles.settingsRounded}></div>
            <div className={styles.settings}>
                <IonIcon
                    icon={settingsOutline}
                    className={styles.settingsIcon}
                    title="Page Settings"
                ></IonIcon>
            </div>
        </header>
    );
};

export default Header;
