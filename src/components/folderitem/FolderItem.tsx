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

    isStarred?: boolean;
    isSelected?: boolean;

    iconSize?: "md" | "lg";

    notifCount?: number;
}

const FolderItem: React.FC<Props> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <ul
            className={cx({
                [styles.folder]: true,
                [styles.selected]: props.isSelected,
            })}
            onMouseOver={() => setIsHovered(true)}
            onMouseOut={() => setIsHovered(false)}
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
                <Text weight={props.isSelected ? 600 : 400}>{props.name}</Text>
            </div>

            <Icon
                icon={starOutline}
                className={styles.star}
                style={{
                    visibility:
                        isHovered || props.isStarred ? "visible" : "hidden",
                }}
            ></Icon>
        </ul>
    );
};

export default FolderItem;
