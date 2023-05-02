import React, { useEffect, useMemo, useRef, useState } from "react";
import {
    arrowDownOutline,
    chevronDownOutline,
    documentOutline,
    eyeOutline,
    fileTrayStackedOutline,
    flagOutline,
    folderOutline,
    funnelOutline,
    pencilOutline,
    refreshOutline,
    returnUpBackOutline,
    returnUpForwardOutline,
    searchOutline,
    trashOutline,
    warningOutline,
} from "ionicons/icons";
import { IonIcon } from "@ionic/react";
import { v4 as uuidv4 } from "uuid";
import { default as cx } from "classnames";

import Header from "./components/header/Header";
import Button from "./components/button/Button";
import Text from "./components/text/Text";
import Search, { SearchRef } from "./components/search/Search";
import Resizable from "./components/resizable/Resizable";
import FolderItem from "./components/folderitem/FolderItem";
import Divider from "./components/divider/Divider";
import CustomFolderItem from "./components/folderitem/CustomFolderItem";
import Icon from "./components/icon/Icon";
import CheckBox from "./components/checkbox/Checkbox";

import useFolders, { Folder } from "./Folders";

import styles from "./App.module.scss";
import Email, { Attachments } from "./components/email/Email";

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

// proof of concept
// here so it can be accessed in multiple places
interface Email {
    sender: string;
    subject: string;
    contentShort: string;
    id: string;
    attachments: Attachments[];
    date: Date;
    isUnread: boolean;
    folderId: string;
}
const EMAILS: { [key: string]: Email[] } = {
    inbox: [
        {
            sender: "Lorem ipsum dolor sit amet",
            subject: "Nullam non purus justo",
            contentShort:
                "Aliquam tempor ante scelerisque finibus molestie. Nulla ac porttitor velit. Aliquam at tincidunt libero, et pulvinar ante. Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur viverra augue sagittis turpis luctus, id vehicula velit accumsan.",
            date: new Date("09/04/2023"),
            isUnread: true,
            attachments: [Attachments.File, Attachments.Image],
            id: uuidv4(),
            folderId: "inbox",
        },
    ],
};

const App: React.FC = () => {
    const email = "lorem.ipsum@dolor.sit";

    const searchRef = useRef<SearchRef>(null);

    // custom folders that can be added/deleted
    const folders = useFolders(["Lorem", "Ipsum"]);

    const [selectedFolder, setSelectedFolder] = useState("inbox");

    const [selectedEmails, setSelectedEmails] = useState<{
        [key: string]: boolean;
    }>({});
    // stores the emails deselected when every email is selected
    const [deselectedEmails, setDeselectedEmails] = useState<{
        [key: string]: boolean;
    }>({});
    const [selectedAll, setSelectedAll] = useState(false);

    // memoize this value in case  the object gets very large
    const hasEmailSelected = useMemo(
        () => selectedAll || Object.values(selectedEmails).includes(true),
        [selectedEmails, selectedAll]
    );

    useEffect(() => {
        if (Object.keys(deselectedEmails).length === 0) {
            setSelectedAll(false);
        }
    }, [deselectedEmails]);

    const [starredFolders, setStarredFolders] = useState<{
        [key: string]: boolean;
    }>({
        inbox: true, // always starred
        [folders.folders[1].id]: true, // POC
    });

    const [notifications, _setNotifications] = useState<{
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
                            <Button
                                width="45px"
                                height="35px"
                                icon={refreshOutline}
                                colour="var(--primary)"
                                tooltip="Refresh Inbox"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={returnUpBackOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Reply"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon="reply_all.svg"
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Reply All"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={returnUpForwardOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Forward"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={trashOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Delete"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={eyeOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Mark as Read"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={flagOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Flag"
                            ></Button>
                            <Button
                                width="45px"
                                height="35px"
                                icon={folderOutline}
                                colour="var(--primary)"
                                disabled={!hasEmailSelected}
                                tooltip="Move"
                            ></Button>
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
                            ref={searchRef}
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
                <div className={styles.sidebarContainer}>
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
                </div>
                <div className={styles.emailView}>
                    <div className={styles.favouritedList}>
                        {Object.keys(starredFolders).map((k) => {
                            if (starredFolders[k]) {
                                const folder: Folder | DefaultFolder =
                                    folders.getFolderById(k) ??
                                    // if we fail to get the custom folder, its probably a default folder
                                    getDefaultFolder(k);

                                return (
                                    <>
                                        <FolderItem
                                            name={folder.name}
                                            id={folder.id}
                                            canUnstar={
                                                (folder as any).canUnstar ??
                                                true
                                            }
                                            icon={
                                                (folder as any).icon ??
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
                    <div
                        className={cx({
                            [styles.emailTools]: true,
                            [styles.emailToolsDisabled]: EMAILS[selectedFolder]
                                ? false
                                : true,
                        })}
                    >
                        <CheckBox
                            width="15px"
                            height="15px"
                            title={"Select All Mail"}
                            isChecked={selectedAll}
                            onClick={(selected) => setSelectedAll(selected)}
                            disabled={EMAILS[selectedFolder] ? false : true}
                        ></CheckBox>
                        <Icon
                            icon={searchOutline}
                            iconSize="md"
                            disableHidden
                            title="Search Mail"
                            onClick={() =>
                                searchRef.current && searchRef.current.focus()
                            }
                        ></Icon>
                        <Icon
                            icon={funnelOutline}
                            iconSize="md"
                            disableHidden
                            title="Filter Mail"
                        ></Icon>
                        <Icon
                            icon={arrowDownOutline}
                            iconSize="md"
                            disableHidden
                            title="Order Mail"
                        ></Icon>
                    </div>
                    <ul>
                        {EMAILS[selectedFolder] &&
                            EMAILS[selectedFolder].map((e) => (
                                <Email
                                    sender={e.sender}
                                    subject={e.subject}
                                    contentShort={e.contentShort}
                                    date={e.date}
                                    isUnread
                                    attachments={e.attachments}
                                    id={e.id}
                                    isSelected={
                                        (selectedAll &&
                                            (deselectedEmails[e.id] ?? true)) ||
                                        selectedEmails[e.id]
                                    }
                                    onSelected={(selected, id) => {
                                        if (selectedAll) {
                                            if (!selected) {
                                                setDeselectedEmails((ds) => {
                                                    const { [id]: _, ...rest } =
                                                        ds;
                                                    return rest;
                                                });
                                            }
                                        } else {
                                            setSelectedEmails({
                                                ...selectedEmails,
                                                [id]: selected,
                                            });
                                        }
                                    }}
                                ></Email>
                            ))}
                    </ul>
                </div>
            </section>
        </div>
    );
};

export default App;
