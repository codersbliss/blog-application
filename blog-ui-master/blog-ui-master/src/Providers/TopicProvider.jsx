/* eslint-disable react/prop-types */
import { useState } from 'react';
import TopicContext from '../context/TopicContext';

// TopicProvider component to provide topic context
const TopicProvider = ({ children }) => {
    // Initial state for topic
    const [topic, setTopic] = useState({
        topic_id: 1,
        title: '',
        users: [],
    });

    return (
        <TopicContext.Provider value={{ topic, setTopic }}>
            {children}
        </TopicContext.Provider>
    );
};

export default TopicProvider;
