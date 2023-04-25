import React from "react";
import {
    eyeOutline,
    flagOutline,
    folderOutline,
    pencilOutline,
    refreshOutline,
    returnDownBackOutline,
    returnUpForwardOutline,
    trashOutline,
} from "ionicons/icons";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Text from "./components/text/Text";

import styles from "./App.module.scss";

const BUTTONS: { [key: string]: JSX.Element } = {
    compose: (
        <Button
            width="145px"
            height="35px"
            theme="filled"
            icon={pencilOutline}
            colour="var(--primary)"
        >
            <Text weight={600}>Compose</Text>
        </Button>
    ),
    refresh: (
        <Button
            width="45px"
            height="35px"
            icon={refreshOutline}
            colour="var(--primary)"
        ></Button>
    ),
    reply: (
        <Button
            width="45px"
            height="35px"
            icon={returnDownBackOutline}
            colour="var(--primary)"
        ></Button>
    ),
    replyAll: (
        <Button
            width="45px"
            height="35px"
            icon={returnDownBackOutline}
            colour="var(--primary)"
        ></Button>
    ),
    forward: (
        <Button
            width="45px"
            height="35px"
            icon={returnUpForwardOutline}
            colour="var(--primary)"
        ></Button>
    ),
    delete: (
        <Button
            width="45px"
            height="35px"
            icon={trashOutline}
            colour="var(--primary)"
        ></Button>
    ),
    markRead: (
        <Button
            width="45px"
            height="35px"
            icon={eyeOutline}
            colour="var(--primary)"
        ></Button>
    ),
    flag: (
        <Button
            width="45px"
            height="35px"
            icon={flagOutline}
            colour="var(--primary)"
        ></Button>
    ),
    move: (
        <Button
            width="45px"
            height="35px"
            icon={folderOutline}
            colour="var(--primary)"
        ></Button>
    ),
};

const App: React.FC = () => {
    return (
        <div className="App">
            <Header></Header>
            <section className={styles.toolbar}>
                <div className={styles.buttons}>
                    {Object.keys(BUTTONS).map((k) => BUTTONS[k])}
                </div>
            </section>
        </div>
    );
};

export default App;
