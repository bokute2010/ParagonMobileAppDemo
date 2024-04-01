import React, { createContext, useState, useEffect, useRef } from 'react';
import useStage from '../hooks/useStage';

const defaultStageContext = {
    joinStage: undefined,
    participants: [],
    stageConnected: false,
};



export const StageContext = createContext({
    ...defaultStageContext,
});

export default function StageProvider({ children }) {
    const { joinStage, stageJoined, leaveStage, participants } = useStage();

    const state = {
        joinStage,
        stageJoined,
        leaveStage,
        participants,
    
    };

    return <StageContext.Provider value={state}>{children}</StageContext.Provider>;
}
