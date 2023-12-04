import React, { useState } from 'react';
import NameTab from '../NameTab/NameTab';
import ProductTab from '../ProductTab';

const Tabs = () => {
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabNumber) => {
        setActiveTab(tabNumber);
    };

    return (
        <div>
            <div>
                <button onClick={() => handleTabClick(1)}>Name Tab</button>
                <button onClick={() => handleTabClick(2)}>Product Tab</button>
            </div>
            {activeTab === 1 && <NameTab />}
            {activeTab === 2 && <ProductTab />}
        </div>
    );
};

export default Tabs;
