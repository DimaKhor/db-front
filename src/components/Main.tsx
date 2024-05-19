import React from 'react';
import Colors from '../components/tables/Colors'
import TransportTypes from '../components/tables/TransportTypes'
import Brands from '../components/tables/Brands'
import Persons from '../components/tables/Persons'
import Organizations from '../components/tables/Organizations'
import TransportNumberDirectory from '../components/tables/TransportNumberDirectory'
import AccidentTypes from '../components/tables/AccidentTypes'
import RoadAccidents from '../components/tables/RoadAccidents'
import TransportsDamagedInAccident from '../components/tables/TransportsDamagedInAccident'
import HijackingsResult from '../components/tables/HijackingsResult'
import Hijackings from '../components/tables/Hijackings'
import Inspection from '../components/tables/Inspection'

interface MainProps {
    activeBlock: string;
}

const Main: React.FC<MainProps> = ({ activeBlock }) => {
    return (
        <main className="main">
            {activeBlock === 'block1' && <div>Content for Block 1</div>}
            {activeBlock === 'Colors' && <div><Colors /></div>}
            {activeBlock === 'TransportTypes' && <div><TransportTypes /></div>}
            {activeBlock === 'Brands' && <div><Brands /></div>}
            {activeBlock === 'Persons' && <div><Persons/></div>}
            {activeBlock === 'Organizations' && <div><Organizations /></div>}
            {activeBlock === 'TransportNumberDirectory' && <div><TransportNumberDirectory /></div>}
            {activeBlock === 'AccidentTypes' && <div><AccidentTypes /></div>}
            {activeBlock === 'RoadAccidents' && <div><RoadAccidents /></div>}
            {activeBlock === 'TransportsDamagedInAccident' && <div><TransportsDamagedInAccident /></div>}
            {activeBlock === 'HijackingsResult' && <div><HijackingsResult /></div>}
            {activeBlock === 'Hijackings' && <div><Hijackings /></div>}
            {activeBlock === 'Inspection' && <div><Inspection /></div>}
            {activeBlock === 'Запрос 1' && <div>Content for Sub Block 1</div>}
            {activeBlock === 'Запрос 2' && <div>Content for Sub Block 2</div>}
            {activeBlock === 'Запрос 3' && <div>Content for Запрос 3</div>}
            {activeBlock === 'Запрос 4' && <div>Content for Запрос 4</div>}
            {activeBlock === 'Запрос 5' && <div>Content for Запрос 5</div>}
            {activeBlock === 'Запрос 6' && <div>Content for Запрос 6</div>}
            {activeBlock === 'Запрос 7' && <div>Content for Запрос 7</div>}
            {activeBlock === 'Запрос 8' && <div>Content for Запрос 8</div>}
            {activeBlock === 'Запрос 9' && <div>Content for Запрос 9</div>}
            {activeBlock === 'Запрос 10' && <div>Content for Запрос 10</div>}
            {activeBlock === 'Запрос 11' && <div>Content for Запрос 11</div>}
        </main>
    );
}

export default Main;
