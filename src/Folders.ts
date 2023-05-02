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

    const addFolder = (name: string, _id: string | null = null): void => {
        const id = _id || uuidv4();
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

// class Folders {
//     folders: Folder[];
//     keyMap: { [key: string]: number };

// constructor(folders: string[]) {
//     this.keyMap = {};
//     this.folders = folders.map((f, i) => {
//         const id = uuidv4();
//         this.keyMap[id] = i;
//         return {
//             name: f,
//             id,
//             children: [],
//         };
//     });
// }

//     addFolder(name: string, _id: string | null = null): void {
//         const id = _id || uuidv4();
//         this.folders.push({
//             name,
//             id,
//             children: [],
//         });
//         this.keyMap[id] = this.folders.length;
//     }

//     removeFolder(id: string): void {
//         this.folders.splice(this.keyMap[id], 1);
//     }

//     getFolderById(id: string): Folder {
//         return this.folders[this.keyMap[id]];
//     }
// }

export default useFolders;
