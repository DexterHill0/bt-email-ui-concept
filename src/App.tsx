import React from "react";
import {
    chevronDownOutline,
    eyeOutline,
    fileTrayStackedOutline,
    flagOutline,
    folderOutline,
    pencilOutline,
    refreshOutline,
    returnDownBackOutline,
    returnUpBackOutline,
    returnUpForwardOutline,
    trashOutline,
} from "ionicons/icons";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Text from "./components/text/Text";

import styles from "./App.module.scss";
import Divider from "./components/divider/Divider";
import { IonIcon } from "@ionic/react";
import Search from "./components/search/Search";
import Resizable from "./components/resizable/Resizable";
import FolderItem from "./components/folderitem/FolderItem";

const BUTTONS: { [key: string]: JSX.Element } = {
    compose: (
        <Button
            width="145px"
            height="35px"
            theme="filled"
            icon={pencilOutline}
            colour="var(--primary)"
            tooltip="Compose new E-Mail"
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
            tooltip="Refresh Inbox"
        ></Button>
    ),
    reply: (
        <Button
            width="45px"
            height="35px"
            icon={returnUpBackOutline}
            colour="var(--primary)"
            disabled
            tooltip="Reply"
        ></Button>
    ),
    replyAll: (
        <Button
            width="45px"
            height="35px"
            icon="reply_all.svg"
            colour="var(--primary)"
            disabled
            tooltip="Reply All"
        ></Button>
    ),
    forward: (
        <Button
            width="45px"
            height="35px"
            icon={returnUpForwardOutline}
            colour="var(--primary)"
            disabled
            tooltip="Forward"
        ></Button>
    ),
    delete: (
        <Button
            width="45px"
            height="35px"
            icon={trashOutline}
            colour="var(--primary)"
            disabled
            tooltip="Delete"
        ></Button>
    ),
    markRead: (
        <Button
            width="45px"
            height="35px"
            icon={eyeOutline}
            colour="var(--primary)"
            disabled
            tooltip="Mark as Read"
        ></Button>
    ),
    flag: (
        <Button
            width="45px"
            height="35px"
            icon={flagOutline}
            colour="var(--primary)"
            disabled
            tooltip="Flag"
        ></Button>
    ),
    move: (
        <Button
            width="45px"
            height="35px"
            icon={folderOutline}
            colour="var(--primary)"
            disabled
            tooltip="Move"
        ></Button>
    ),
};

const App: React.FC = () => {
    const email = "lorem.ipsum@dolor.sit";

    return (
        <div className={styles.app}>
            <Header></Header>
            <section className={styles.toolbarContainer}>
                <div className={styles.toolbar}>
                    <div className={styles.buttonsContainer}>
                        <div className={styles.buttons}>
                            {Object.keys(BUTTONS).map((k) => BUTTONS[k])}
                        </div>
                    </div>

                    <div className={styles.search}>
                        <Divider orientation="v"></Divider>
                        <Search
                            width="34rem"
                            height="35px"
                            colour="var(--primary)"
                            placeholder="Search Mail"
                            tooltip="Search Mail"
                        ></Search>
                        <Divider orientation="v"></Divider>
                    </div>

                    <div className={styles.email}>
                        <Divider orientation="v"></Divider>
                        <Text>{email}</Text>
                        <IonIcon
                            icon={chevronDownOutline}
                            style={{ cursor: "pointer" }}
                        ></IonIcon>
                    </div>
                </div>
                <Divider></Divider>
            </section>
            <section className={styles.mainContent}>
                <Resizable
                    orientation="v"
                    className={styles.sidebar}
                    width={250}
                    maxConstraints={[500, 0]}
                    disableSelectOnDrag
                    collapseOnMinContent
                >
                    <FolderItem
                        name="Inbox"
                        icon={fileTrayStackedOutline}
                        isSelected
                        notifCount={0}
                    ></FolderItem>
                </Resizable>
            </section>
        </div>
    );
};

export default App;
