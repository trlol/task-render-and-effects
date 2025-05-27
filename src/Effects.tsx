import React, { useState, useEffect } from 'react';
import { subscribe, unsubscribe } from './resources/API';

interface EffectsProps {
    sourceId: string; // ID источника данных, передаётся через пропсы
}

export const Effects: React.FC<EffectsProps> = ({ sourceId }) => {
    // Состояние для хранения последнего сообщения (по умолчанию -1)
    const [lastMessage, setLastMessage] = useState<number>(-1);

    useEffect(() => {
        // Обработчик новых сообщений от источника
        const handleNewMessage = (message: number) => {
            setLastMessage(message);
        };

        // Подписываемся на изменения для текущего sourceId
        subscribe(sourceId, handleNewMessage);

        // Сбрасываем последнее сообщение при смене источника
        setLastMessage(-1);

        // Функция очистки - отписываемся при размонтировании или смене источника
        return () => {
            unsubscribe(sourceId, handleNewMessage);
        };
    }, [sourceId]); // Эффект срабатывает при каждом изменении sourceId

    // Рендерим название источника и последнее сообщение
    return (
        <div>
            {sourceId}: {lastMessage}
        </div>
    );
};
