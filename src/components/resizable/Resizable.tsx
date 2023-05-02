import React, { useEffect, useRef, useState } from "react";
import { default as cx } from "classnames";

import Divider from "../divider/Divider";

import styles from "./Resizable.module.scss";
import { isWebkit } from "../../utils";

// `stretch` is the official property value but it's experimental so the vendor-specific
// fill-availabe do the same thing
const STRETCH = isWebkit ? "-webkit-fill-available" : "-moz-available";

interface Props {
    orientation?: "v" | "h";

    minConstraints?: [number, number];
    maxConstraints?: [number, number];

    collapseOnMinContent?: boolean;
    collapseThreshold?: number;

    disableSelectOnDrag?: boolean;

    width?: number;
    height?: number;

    className?: string;
    contentClassName?: string;

    children: React.ReactNode;
}

const Resizable: React.FC<Props> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    // hides the content if it is collapsible
    const [contentVisible, setContentVisible] = useState(true);

    const collapseThreshold = props.collapseThreshold || 100;
    let collapseDragAmount = useRef(0);

    let prevMinSize = useRef<[number, number] | null>(null);

    const [isDragging, setIsDragging] = useState(false);
    const [size, setSize] = useState<{
        [key: string]: number | string;
    }>({
        width: props.width || 0,
        height: props.height || 0,
    });

    const isHorizontal = (props.orientation || "h") === "h";

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", () => {
                onEndDrag();
                window.removeEventListener("mousemove", onMouseMove);
            });
        }
    }, [isDragging]);

    const onEndDrag = () => {
        document.body.style.cursor = "unset";
        setIsDragging(false);
    };
    const onStartDrag = () => {
        // make the cursor the same for the whole document as when dragging it isnt hovering over
        // the drag element
        document.body.style.cursor = "col-resize";
        setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!parentRef.current) {
            return;
        }

        let [width, height] = calcConstraints(
            e.clientX,
            document.body.offsetHeight - e.clientY,
            e.movementX,
            e.movementY
        );

        setSize({
            width,
            height,
        });

        e.preventDefault();
        e.stopPropagation();
    };

    const calcConstraints = (
        width: number,
        height: number,
        changeX: number,
        changeY: number
    ): [number | string, number | string] => {
        const { minConstraints, maxConstraints } = props;

        // short circuit
        if (!minConstraints && !maxConstraints && !props.collapseOnMinContent)
            return [width, height];

        if (
            props.collapseOnMinContent &&
            contentRef.current &&
            parentRef.current
        ) {
            // we want to keep track of the previous min size as using a block element (div) to contain
            // the content means `offsetWidth/height` become 0px after collapsing so it is impossible to
            // uncollapse. the previous min size means we can compare agains that, instead of the 0px value
            let [minX, minY] = prevMinSize.current || [
                contentRef.current.offsetWidth,
                contentRef.current.offsetHeight,
            ];

            if (
                (!isHorizontal && minX - parentRef.current.offsetWidth >= 0) ||
                (isHorizontal && minY - parentRef.current.offsetHeight >= 0)
            ) {
                collapseDragAmount.current -= isHorizontal ? -changeY : changeX;

                if (collapseDragAmount.current >= collapseThreshold) {
                    setContentVisible(false);

                    if (!prevMinSize.current) {
                        prevMinSize.current = [
                            contentRef.current.offsetWidth,
                            contentRef.current.offsetHeight,
                        ];
                    }

                    return [0, 0];
                } else if (
                    (collapseDragAmount.current < collapseThreshold &&
                        !isHorizontal &&
                        width <= minX) ||
                    (isHorizontal && height <= minY)
                ) {
                    setContentVisible(true);
                    return [minX, minY];
                } else {
                    // sometimes if the height is too small it skips the above condition and doesnt get set to visible
                    // so we do it here just in case
                    setContentVisible(true);
                    collapseDragAmount.current = 0;
                    prevMinSize.current = null;
                }
            }
        }

        if (minConstraints) {
            width = Math.max(minConstraints[0], width);
            height = Math.max(minConstraints[1], height);
        }
        if (maxConstraints) {
            width = Math.min(maxConstraints[0], width);
            height = Math.min(maxConstraints[1], height);
        }

        return [width, height];
    };

    return (
        <div
            style={{
                width: isHorizontal ? props.width : size.width,
                height: !isHorizontal ? props.height : size.height,
                userSelect:
                    isDragging && props.disableSelectOnDrag ? "none" : "unset",
            }}
            className={cx(props.className, styles.resizable)}
            ref={parentRef}
            data-orientation={props.orientation || "h"}
        >
            <div
                style={{
                    width: !isHorizontal
                        ? contentVisible
                            ? STRETCH
                            : "0px"
                        : "inherit",
                    height: isHorizontal
                        ? contentVisible
                            ? STRETCH
                            : "0px"
                        : "inherit",
                }}
                className={cx({
                    [styles.visibility]: !contentVisible,
                })}
            >
                <div ref={contentRef} className={props.contentClassName}>
                    {props.children}
                </div>
            </div>
            <div
                data-orientation={props.orientation || "h"}
                className={styles.dragMargin}
                onMouseDown={onStartDrag}
                // its likely the user lets go while their cursor is *not* over this element,
                // which means the mouse up event wouldnt fire, hence why we have to
                // listen for them on the window
            >
                <Divider orientation={props.orientation}></Divider>
                <div
                    className={styles.dragIcon}
                    data-orientation={props.orientation || "h"}
                ></div>
            </div>
        </div>
    );
};

export default Resizable;
