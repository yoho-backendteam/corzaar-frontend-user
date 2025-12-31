import React, { createContext, useContext, useEffect, useState, type ReactNode } from 'react'

export interface RegisterFormContextType {
    RegisterForm: boolean;
    setRegisterFormOpen: () => void;
    setRegisterFormClose: () => void;
}

const RegisterContext = createContext<RegisterFormContextType | undefined>(undefined)

export const RegsterProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const [RegisterForm, setRegisterForm] = useState<boolean>(false);

    useEffect(() => {
        setRegisterForm(false)
    }, [RegisterForm])

    const setRegisterFormOpen = () => {
        setRegisterForm(true)
    }

    const setRegisterFormClose = () => {
        setRegisterForm(false)
    }

    const values = { RegisterForm, setRegisterFormOpen, setRegisterFormClose }

    return (
        <RegisterContext.Provider value={values}>
            {children}
        </RegisterContext.Provider>
    )
}

export const useRegisterform = () => {
    const context = useContext(RegisterContext);
    if (context === undefined) {
        throw new Error('useRegisterform must be used within an RegisterProvider');
    }
    return context;
};