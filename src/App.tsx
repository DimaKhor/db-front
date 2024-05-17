import React, { useState } from 'react';
import Nav from './components/Nav';
import Main from './components/Main';

const App: React.FC = () => {
    const [activeBlock, setActiveBlock] = useState('block1');

    return (
        <div className="gibdd">
            <Nav setActiveBlock={setActiveBlock} />
            <Main activeBlock={activeBlock} />
        </div>
    );
}

export default App;
