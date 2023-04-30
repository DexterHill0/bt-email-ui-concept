import React, { useState } from "react";
import { default as cx } from "classnames";
import { starOutline } from "ionicons/icons";

import Text from "../text/Text";
import Icon from "../icon/Icon";
import Notification from "../notification/Notification";

import styles from "./FolderItem.module.scss";

interface Props {
    icon: string;
    name: string;
    id: string;

    isStarred?: boolean;
    canUnstar?: boolean;

    isSelected?: boolean;

    iconSize?: "md" | "lg";

    notifCount?: number;

    onClick?: (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        id: string
    ) => void;
    onStarred?: (id: string) => void;
}

const FolderItem: React.FC<Props> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <li
            className={cx({
                [styles.folder]: true,
                [styles.selected]: props.isSelected,
            })}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
            onClick={(e) => props.onClick && props.onClick(e, props.id)}
        >
            <div className={styles.name}>
                {props.notifCount ? (
                    <Notification count={props.notifCount}>
                        <Icon
                            icon={props.icon}
                            iconSize={props.iconSize}
                        ></Icon>
                    </Notification>
                ) : (
                    <Icon icon={props.icon} iconSize={props.iconSize}></Icon>
                )}
                <Text weight={props.isSelected ? 600 : 200}>{props.name}</Text>
            </div>

            <Icon
                icon={starOutline}
                className={styles.star}
                style={{
                    opacity:
                        isHovered && !props.isStarred
                            ? "0.5"
                            : props.isStarred || !props.canUnstar
                            ? "1"
                            : "0",
                }}
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    props.onStarred && props.onStarred(props.id);
                }}
            ></Icon>
        </li>
    );
};

export default FolderItem;
