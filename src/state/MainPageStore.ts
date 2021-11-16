import create from 'zustand';
import { PageContent } from '../components/PageContent';

export const useMainPageStore = create((set: any) => ({
    pageContent: PageContent.DOL_MODEL_PAGE,
    setContent: (pc: PageContent) => {
        set({pageContent: pc});
    },
}))