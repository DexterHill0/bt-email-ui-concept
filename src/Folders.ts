import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export interface Folder {
    id: string;
    name: string;
    children: Folder[];
}

const useFolders = (intialFolders: string[]) => {
    const [folders, setFolders] = useState<Folder[]>(() => {
        return intialFolders.map((f, i) => {
            const id = uuidv4();
            return {
                name: f,
                id,
                children: [],
            };
        });
    });
    const [keyMap, setKeyMap] = useState<{ [key: string]: number }>(() => {
        let map: { [key: string]: number } = {};
        folders.map((_, i) => (map[folders[i].id] = i));
        return map;
    });

    const addFolder = (name: string): void => {
        const id = uuidv4();
        setFolders([
            ...folders,
            {
                name,
                id,
                children: [],
            },
        ]);
        setKeyMap({ ...keyMap, [id]: folders.length });
    };
    const removeFolder = (id: string): void => {
        setFolders(folders.splice(keyMap[id], 1));
        delete keyMap[id];
        setKeyMap(keyMap);
    };
    const getFolderById = (id: string): Folder => {
        return folders[keyMap[id]];
    };

    return { folders, addFolder, removeFolder, getFolderById };
};

export default useFolders;
