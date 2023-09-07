import React, { useState, useMemo, useEffect } from 'react';
import { MessageType } from '../types/MessageType';

export const key = 'messages';

type ContextValue = {
  messages: MessageType[],
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>,
};

export const MessagesContext = React.createContext<ContextValue>({
  messages: [],
  setMessages: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const MessagesProvider: React.FC<Props> = ({ children }) => {
  const [messages, setMessages] = useState<MessageType[]>(() => {
    try {
      const item = window.localStorage.getItem(key);

      return item ? (JSON.parse(item)) : [];
    } catch (error) {
      console.warn(`Error reading localStorage key “${key}”:`, error);

      return [];
    }
  });

  const value = useMemo(() => {
    return {
      messages,
      setMessages,
    };
  }, [messages]);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(messages));
  }, [messages]);

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  )
};
