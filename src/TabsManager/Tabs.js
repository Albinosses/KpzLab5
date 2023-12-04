import React, { useState } from 'react';
import './Tabs.css';
import NameTab from '../NameTab/NameTab';
import ProductTab from '../ProductTab';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div className="tabs-container">
            <div className="tab-buttons">
                <button
                    onClick={() => handleTabClick(1)}
                    className={activeTab === 1 ? 'active-tab' : ''}
                >
                    Name Tab
                </button>
                <button
                    onClick={() => handleTabClick(2)}
                    className={activeTab === 2 ? 'active-tab' : ''}
                >
                    Product Tab
                </button>
            </div>
            <div className="tab-content">
                {activeTab === 1 && <NameTab />}
                {activeTab === 2 && <ProductTab />}
            </div>
        </div>
    );
};

export default Tabs;
