import React from "react";
import Header from "./components/header/Header";
import Button from "./components/button/Button";
import { refreshOutline, settingsOutline } from "ionicons/icons";

import styles from "./App.module.scss";

const BUTTONS = {
    refresh: (
        <Button
            width="45px"
            height="35px"
            icon={refreshOutline}
            colour="var(--primary)"
        ></Button>
    ),
};

const App: React.FC = () => {
    return (
        <div className="App">
            <Header></Header>
        </div>
    );
};

export default App;
