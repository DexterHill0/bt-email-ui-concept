import React from "react";
import {
    documentAttachOutline,
    imagesOutline,
    reorderThreeOutline,
} from "ionicons/icons";
import { default as cx } from "classnames";

import Icon from "../icon/Icon";
import CheckBox from "../checkbox/Checkbox";
import Notification from "../notification/Notification";
import Text from "../text/Text";
import Divider from "../divider/Divider";

import styles from "./Email.module.scss";

export enum Attachments {
    Image,
    File,
}
const ATTACHMENT_ICONS = {
    [Attachments.Image]: imagesOutline,
    [Attachments.File]: documentAttachOutline,
};
const ATTACHMENT_TITLES = {
    [Attachments.Image]: "Image(s)",
    [Attachments.File]: "File(s)",
};

interface Props {
    sender: string;
    subject?: string;
    contentShort?: string;

    date: Date;

    isSelected?: boolean;
    isUnread?: boolean;

    attachments?: Attachments[];

    id: string;

    onSelected?: (selected: boolean, id: string) => void;
}

const Email: React.FunctionComponent<Props> = (props) => {
    const textWeight = props.isUnread ? 600 : 400;

    return (
        <li className={styles.emailContainer}>
            <div
                className={cx({
                    [styles.email]: true,
                    [styles.selected]: props.isSelected,
                })}
            >
                <Icon
                    icon={reorderThreeOutline}
                    className={styles.reorder}
                    title="Move Email"
                ></Icon>
                {props.isUnread ? (
                    <Notification count={null}>
                        <CheckBox
                            width="15px"
                            height="15px"
                            colour="var(--halfopacity)"
                            onClick={(selected) => {
                                props.onSelected &&
                                    props.onSelected(selected, props.id);
                            }}
                            isChecked={props.isSelected}
                        ></CheckBox>
                    </Notification>
                ) : (
                    <CheckBox
                        width="15px"
                        height="15px"
                        colour="var(--halfopacity)"
                        onClick={(selected) =>
                            props.onSelected &&
                            props.onSelected(selected, props.id)
                        }
                        isChecked={props.isSelected}
                    ></CheckBox>
                )}
                <div className={styles.content}>
                    <Text
                        size="sm"
                        weight={textWeight}
                        className={styles.senderText}
                    >
                        {props.sender}
                    </Text>
                    <Text
                        size="sm"
                        weight={textWeight}
                        className={styles.subjectText}
                    >
                        {props.subject || "<Empty>"}
                    </Text>
                    <Text
                        size="sm"
                        colour="var(--halfopacity)"
                        weight={textWeight}
                        className={styles.contentText}
                    >
                        {props.contentShort || "<Empty>"}
                    </Text>

                    <div className={styles.info}>
                        {props.attachments ? (
                            <div className={styles.attachments}>
                                {props.attachments.map((a) => (
                                    <Icon
                                        icon={ATTACHMENT_ICONS[a]}
                                        className={styles.attachmentIcon}
                                        title={ATTACHMENT_TITLES[a]}
                                    ></Icon>
                                ))}
                            </div>
                        ) : (
                            <></>
                        )}

                        <Text
                            size="sm"
                            colour="var(--halfopacity)"
                            weight={textWeight}
                        >
                            {props.date.toLocaleDateString()}
                        </Text>
                    </div>
                </div>
            </div>
            <Divider></Divider>
        </li>
    );
};

export default Email;
