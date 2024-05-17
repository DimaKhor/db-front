import React, { useState, useEffect } from 'react';

interface NavProps {
    setActiveBlock: (block: string) => void;
}

const Nav: React.FC<NavProps> = ({ setActiveBlock }) => {
    const [showSubMenuTables, setShowSubMenuTables] = useState(false);
    const [showSubMenu2, setShowSubMenu2] = useState(false);
    const [activeSubButton, setActiveSubButton] = useState<string>('block1');
    const [mainButtonBottomClass, setMainButtonBottomClass] = useState(true);

    useEffect(() => {
        setActiveBlock('block1');
    }, [setActiveBlock]);

    const handleMainClick = (block: string) => {
        if (block === 'tables') setShowSubMenuTables(!showSubMenuTables);
        if (block === 'submenu2') {
            setShowSubMenu2(!showSubMenu2);
            if (showSubMenu2) {
                setMainButtonBottomClass(true);
            } else {
                setMainButtonBottomClass(false);
            }
        }
    };

    const handleSubClick = (block: string) => {
        setActiveBlock(block);
        setActiveSubButton(block);
    };

    return (
        <nav className="nav">
            <button
                className={`nav-button main-button main-button-top ${activeSubButton === 'block1' ? 'active' : ''}`}
                onClick={() => handleSubClick('block1')}
            >
                Главная
            </button>
            <div>
                <button
                    className="nav-button main-button"
                    onClick={() => handleMainClick('tables')}
                >
                    Таблицы
                </button>
                <div className={`sub-menu ${showSubMenuTables ? 'show' : ''}`}>
                    <button className={`nav-button ${activeSubButton === 'Colors' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Colors')}>Colors
                    </button>
                    <button className={`nav-button ${activeSubButton === 'TransportTypes' ? 'active' : ''}`}
                            onClick={() => handleSubClick('TransportTypes')}>Transport Types
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Brands' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Brands')}>Brands
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Persons' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Persons')}>Persons
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Organizations' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Organizations')}>Organizations
                    </button>
                    <button className={`nav-button ${activeSubButton === 'TransportNumberDirectory' ? 'active' : ''}`}
                            onClick={() => handleSubClick('TransportNumberDirectory')}>Transport Number Directory
                    </button>
                    <button className={`nav-button ${activeSubButton === 'AccidentTypes' ? 'active' : ''}`}
                            onClick={() => handleSubClick('AccidentTypes')}>Accident Types
                    </button>
                    <button className={`nav-button ${activeSubButton === 'RoadAccidents' ? 'active' : ''}`}
                            onClick={() => handleSubClick('RoadAccidents')}>Road Accidents
                    </button>
                    <button
                        className={`nav-button ${activeSubButton === 'TransportsDamagedInAccident' ? 'active' : ''}`}
                        onClick={() => handleSubClick('TransportsDamagedInAccident')}>Transports Damaged In Accident
                    </button>
                    <button className={`nav-button ${activeSubButton === 'HijackingsResult' ? 'active' : ''}`}
                            onClick={() => handleSubClick('HijackingsResult')}>Hijackings Result
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Hijackings' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Hijackings')}>Hijackings
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Inspection' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Inspection')}>Inspection
                    </button>
                </div>
            </div>
            <div>
                <button
                    className={`nav-button main-button ${mainButtonBottomClass ? 'main-button-bottom' : ''}`}
                    onClick={() => handleMainClick('submenu2')}
                >
                    Запросы
                </button>
                <div className={`sub-menu ${showSubMenu2 ? 'show' : ''}`}>
                    <button className={`nav-button ${activeSubButton === 'Запрос 1' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 1')}>Запрос 1
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 2' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 2')}>Запрос 2
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 3' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 3')}>Запрос 3
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 4' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 4')}>Запрос 4
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 5' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 5')}>Запрос 5
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 6' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 6')}>Запрос 6
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 7' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 7')}>Запрос 7
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 8' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 8')}>Запрос 8
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 9' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 9')}>Запрос 9
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 10' ? 'active' : ''}`}
                            onClick={() => handleSubClick('Запрос 10')}>Запрос 10
                    </button>
                    <button className={`nav-button ${activeSubButton === 'Запрос 11' ? 'active' : ''} ${!mainButtonBottomClass ? 'main-button-bottom' : ''}`}
                            onClick={() => handleSubClick('Запрос 11')}>Запрос 11
                    </button>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
