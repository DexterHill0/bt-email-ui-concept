import React from "react";
import { default as cx } from "classnames";
import { ellipsisVerticalOutline, reorderThreeOutline } from "ionicons/icons";

import FolderItem, { FolderItemProps } from "./FolderItem";
import Icon from "../icon/Icon";

import styles from "./FolderItem.module.scss";

interface Props {
    isSelected?: boolean;
}

const CustomFolderItem: React.FC<Props & FolderItemProps> = (props) => {
    return (
        <li
            className={cx({
                [styles.customFolder]: true,
                [styles.selected]: props.isSelected,
            })}
        >
            <Icon icon={reorderThreeOutline} className={styles.reorder}></Icon>
            <FolderItem {...props} className={styles.innerFolder}></FolderItem>
            <Icon
                icon={ellipsisVerticalOutline}
                className={styles.elipsis}
            ></Icon>
        </li>
    );
};

export default CustomFolderItem;
