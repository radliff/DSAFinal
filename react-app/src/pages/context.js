import React, { createContext, useContext, useState } from 'react';

const AnswerContext = createContext();

export const AnswerProvider = ({ children }) => {
    const [answerData, setAnswerData] = useState(null);

    return (
        <AnswerContext.Provider value={{ answerData, setAnswerData }}>
            {children}
        </AnswerContext.Provider>
    );
};

export const useAnswer = () => useContext(AnswerContext);
