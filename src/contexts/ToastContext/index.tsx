import { createContext, useState, useContext, ReactNode } from 'react';
import { IToastMessage } from '@/types/toast-message';

interface IToastContext {
    messages: IToastMessage[];
    addMessage: (message: IToastMessage) => void;
    removeMessage: (id: string) => void;
}

const ToastContext = createContext<IToastContext | null>(null);

interface ToastProviderProps {
    children: ReactNode;
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
    const [messages, setMessages] = useState<IToastMessage[]>([]);

    const addMessage = (message: IToastMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    };

    const removeMessage = (id: string) => {
        setMessages((prevMessages) => prevMessages.filter(message => message.id !== id));
    };

    return (
        <ToastContext.Provider value={{ messages, addMessage, removeMessage }}>
            {children}
        </ToastContext.Provider>
    );
};

export const useToast = (): IToastContext => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast deve ser usado dentro de um ToastProvider');
    }
    return context;
};