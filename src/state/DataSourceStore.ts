import create from 'zustand';
import { PageContent } from '../components/PageContent';
import { DataSource } from './DataSource';

export const useDataSourceStore = create((set: any, get: any) => ({
    dataSources: [],
    fetchDataSources: () => {
        const tempDataSources: DataSource[] = [
            {
                name: "Temp1",
                id: "temp-1",
                type: "BasicFileServer",
                dol: "CompData"
            },
            {
                name: "Temp2",
                id: "temp-2",
                type: "BasicFileServer",
                dol: "ItemData"
            },
            {
                name: "Temp3",
                id: "temp-3",
                type: "BasicFileServer",
                dol: "ChampData"
            }
        ];

        set({ dataSources: tempDataSources });
    },
}));
