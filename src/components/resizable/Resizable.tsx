import React, { useEffect, useRef, useState } from "react";
import { default as cx } from "classnames";

import Divider from "../divider/Divider";

import styles from "./Resizable.module.scss";
import { isVisible } from "@testing-library/user-event/dist/utils";

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

    children: React.ReactNode;
}

const Resizable: React.FC<Props> = (props) => {
    const contentRef = useRef<HTMLDivElement>(null);
    const parentRef = useRef<HTMLDivElement>(null);

    // hides the content if it is collapsible
    const [contentVisible, setContentVisible] = useState(true);

    const collapseThreshold = props.collapseThreshold || 20;
    let collapseDragAmount = 0;

    const [prevDragAmount, setPrevDragAmount] = useState(0);

    const [isDragging, setIsDragging] = useState(false);
    const [size, setSize] = useState({
        width: props.width || 0,
        height: props.height || 0,
    });

    const isHorizontal = (props.orientation || "h") === "h";

    useEffect(() => {
        if (isDragging) {
            collapseDragAmount = prevDragAmount;
            // contentSize = contentSizeSa;

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
        document.body.style.cursor = "col-resize";
        setIsDragging(true);
    };

    const onMouseMove = (e: MouseEvent) => {
        if (!parentRef.current) {
            return;
        }

        let [width, height] = calcConstraints(
            // in theory this is what `e.offsetX` and `e.offsetY` should do but they seem to be broken
            // (gives erroneous values randomly)
            e.clientX - parentRef.current.getBoundingClientRect().left,
            e.clientY - parentRef.current.getBoundingClientRect().top
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
        height: number
    ): [number, number] => {
        const { minConstraints, maxConstraints } = props;
        // short circuit
        if (!minConstraints && !maxConstraints && !props.collapseOnMinContent)
            return [width, height];

        let m = props.collapseOnMinContent && contentRef.current;

        if (
            props.collapseOnMinContent &&
            contentRef.current &&
            ((!isHorizontal && width < contentRef.current.offsetWidth) ||
                (isHorizontal && height < contentRef.current.offsetHeight))
        ) {
            if (collapseDragAmount < collapseThreshold) {
                collapseDragAmount += 1;
                setPrevDragAmount(collapseDragAmount);

                return [
                    contentRef.current.offsetWidth,
                    contentRef.current.offsetHeight,
                ];
            } else if (collapseDragAmount >= collapseThreshold) {
                setContentVisible(false);

                return [0, 0];
            }
        }

        collapseDragAmount = 0;
        setContentVisible(true);

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
        >
            <div
                style={{
                    visibility: contentVisible ? "visible" : "hidden",
                    width: !isHorizontal
                        ? contentVisible
                            ? "inherit"
                            : "0px"
                        : "inherit",
                    height: isHorizontal
                        ? contentVisible
                            ? "inherit"
                            : "0px"
                        : "inherit",
                }}
            >
                <span ref={contentRef}>{props.children}</span>
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
