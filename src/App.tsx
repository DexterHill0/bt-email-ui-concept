import React, { useEffect, useState } from "react";
import {
    chevronDownOutline,
    documentOutline,
    eyeOutline,
    fileTrayStackedOutline,
    flagOutline,
    folderOutline,
    pencilOutline,
    refreshOutline,
    returnUpBackOutline,
    returnUpForwardOutline,
    trashOutline,
    warningOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Text from "./components/text/Text";
import Search from "./components/search/Search";
import Resizable from "./components/resizable/Resizable";
import FolderItem from "./components/folderitem/FolderItem";
import Divider from "./components/divider/Divider";
import CustomFolderItem from "./components/folderitem/CustomFolderItem";

import useFolders, { Folder } from "./Folders";

import styles from "./App.module.scss";

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

interface DefaultFolder {
    name: string;
    id: string;
    canUnstar: boolean;
    icon: string;
}

const DEFAULT_FOLDERS: DefaultFolder[] = [
    {
        name: "Inbox",
        id: "inbox",
        canUnstar: false,
        icon: fileTrayStackedOutline,
    },
    {
        name: "Drafts",
        id: "drafts",
        canUnstar: true,
        icon: documentOutline,
    },
    {
        name: "Spam",
        id: "spam",
        canUnstar: true,
        icon: warningOutline,
    },
    {
        name: "Trash",
        id: "trash",
        canUnstar: true,
        icon: trashOutline,
    },
];
const getDefaultFolder = (id: string): DefaultFolder | undefined => {
    return DEFAULT_FOLDERS.find((f) => f.id === id);
};

const App: React.FC = () => {
    const email = "lorem.ipsum@dolor.sit";

    const folders = useFolders(["Lorem", "Ipsum"]);

    const [selectedFolder, setSelectedFolder] = useState("inbox");

    const [starredFolders, setStarredFolders] = useState<{
        [key: string]: boolean;
    }>({
        inbox: true, // always starred
        [folders.folders[1].id]: true,
    });

    const [notifications, setNotifications] = useState<{
        [key: string]: number;
    }>({
        inbox: 1,
    });

    const onStarFolder = (id: string) => {
        setStarredFolders({
            ...starredFolders,
            [id]: !starredFolders[id],
        });
    };

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
                    contentClassName={styles.folderList}
                    width={250}
                    maxConstraints={[500, 0]}
                    disableSelectOnDrag
                    collapseOnMinContent
                >
                    <ul className={styles.folderUl}>
                        {DEFAULT_FOLDERS.map((f) => (
                            <FolderItem
                                name={f.name}
                                icon={f.icon}
                                canUnstar={f.canUnstar}
                                isSelected={selectedFolder === f.id}
                                isStarred={starredFolders[f.id]}
                                id={f.id}
                                onClick={(_, i) => setSelectedFolder(i)}
                                onStarred={onStarFolder}
                                notifCount={notifications[f.id]}
                            ></FolderItem>
                        ))}
                    </ul>
                    <Resizable
                        height={250}
                        disableSelectOnDrag
                        collapseOnMinContent
                        contentClassName={styles.customFolderList}
                        collapseThreshold={10}
                    >
                        <ul className={styles.folderUl}>
                            {folders.folders.map((f) => (
                                <CustomFolderItem
                                    name={f.name}
                                    icon={folderOutline}
                                    canUnstar
                                    isSelected={selectedFolder === f.id}
                                    isStarred={starredFolders[f.id]}
                                    id={f.id}
                                    onClick={(_, i) => setSelectedFolder(i)}
                                    onStarred={onStarFolder}
                                    notifCount={notifications[f.id]}
                                ></CustomFolderItem>
                            ))}
                        </ul>
                    </Resizable>
                </Resizable>
                <div className={styles.emailView}>
                    <div className={styles.favouritedList}>
                        {Object.keys(starredFolders).map((k, i) => {
                            if (starredFolders[k]) {
                                const folder: Folder | DefaultFolder =
                                    folders.getFolderById(k) ||
                                    getDefaultFolder(k);

                                return (
                                    <>
                                        <FolderItem
                                            name={folder.name}
                                            id={folder.id}
                                            canUnstar
                                            icon={
                                                (folder as any).icon ||
                                                folderOutline
                                            }
                                            notifCount={notifications[k]}
                                            className={styles.favourited}
                                            isStarred={starredFolders[k]}
                                            onStarred={onStarFolder}
                                        ></FolderItem>
                                        <Divider orientation="v"></Divider>
                                    </>
                                );
                            }
                        })}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default App;
