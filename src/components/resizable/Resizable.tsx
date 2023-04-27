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

    // keeps track of the size of the inner content (for example, it could flex-grow so the size changes as you resize)
    const [contentSize, setContentSize] = useState([0, 0]);
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

    useEffect(() => {
        if (props.collapseOnMinContent && contentRef.current) {
            setContentSize([
                contentRef.current.clientWidth,
                contentRef.current.clientHeight,
            ]);
        }
    }, []);

    useEffect(() => {
        if (isDragging) {
            window.addEventListener("mousemove", onMouseMove);
            window.addEventListener("mouseup", () => {
                onEndDrag();
                window.removeEventListener("mousemove", onMouseMove);
            });

            collapseDragAmount = prevDragAmount;
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

        if (width <= contentSize[0] && height <= contentSize[1]) {
            if (collapseDragAmount < collapseThreshold) {
                collapseDragAmount += 1;
                setPrevDragAmount(collapseDragAmount);

                return [contentSize[0], contentSize[1]];
            } else if (collapseDragAmount >= collapseThreshold) {
                setContentVisible(false);

                return [0, 0];
            }
        }

        if (props.collapseOnMinContent && contentRef.current) {
            setContentSize([
                contentRef.current.clientWidth,
                contentRef.current.clientHeight,
            ]);
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
                width:
                    (props.orientation || "h") === "h"
                        ? props.width
                        : size.width,
                height: props.orientation === "v" ? props.height : size.height,
                userSelect:
                    isDragging && props.disableSelectOnDrag ? "none" : "unset",
            }}
            className={cx(props.className, styles.resizable)}
            ref={parentRef}
        >
            <div
                ref={contentRef}
                style={{
                    visibility: contentVisible ? "visible" : "hidden",
                    width:
                        props.orientation === "v"
                            ? contentVisible
                                ? "auto"
                                : "0px"
                            : "auto",
                    height:
                        (props.orientation || "h") === "h"
                            ? contentVisible
                                ? "auto"
                                : "0px"
                            : "auto",
                }}
            >
                {props.children}
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
