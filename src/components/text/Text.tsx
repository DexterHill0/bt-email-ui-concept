import * as React from "react";
import { default as cx } from "classnames";

import styles from "./Text.module.scss";

interface Props {
    weight?: number;
    size?: "xl" | "lg" | "md" | "sm";
    colour?: string;

    href?: string;
    form?: "h1" | "h2" | "h3" | "h4" | "a";

    className?: string;

    children: React.ReactNode;
}

const Text: React.FC<Props> = (props) => {
    const Form = props.form || "a";

    return (
        <Form
            style={{
                fontWeight: props.weight,
                color: props.colour,
            }}
            className={cx(styles.text, props.className)}
            href={props.href}
            data-size={props.size}
        >
            {props.children}
        </Form>
    );
};

export default Text;
