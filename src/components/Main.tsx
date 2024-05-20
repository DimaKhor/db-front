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
import Query1 from "./queries/query1";
import Query2 from "./queries/query2";
import Query3 from "./queries/query3";
import Query4 from "./queries/query4";
import Query5 from "./queries/query5";
import Query6 from "./queries/query6";
import Query7 from "./queries/query7";
import Query8 from "./queries/query8";
import Query9 from "./queries/query9";
import Query10 from "./queries/query10";
import Query11 from "./queries/query11";
import Hello from "./Hello";

interface MainProps {
    activeBlock: string;
}

const Main: React.FC<MainProps> = ({ activeBlock }) => {
    return (
        <main className="main">
            {activeBlock === 'block1' && <div><Hello /></div>}
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
            {activeBlock === 'Запрос 1' && <div><Query1 /></div>}
            {activeBlock === 'Запрос 2' && <div><Query2 /></div>}
            {activeBlock === 'Запрос 3' && <div><Query3 /></div>}
            {activeBlock === 'Запрос 4' && <div><Query4 /></div>}
            {activeBlock === 'Запрос 5' && <div><Query5 /></div>}
            {activeBlock === 'Запрос 6' && <div><Query6 /></div>}
            {activeBlock === 'Запрос 7' && <div><Query7 /></div>}
            {activeBlock === 'Запрос 8' && <div><Query8 /></div>}
            {activeBlock === 'Запрос 9' && <div><Query9 /></div>}
            {activeBlock === 'Запрос 10' && <div><Query10 /></div>}
            {activeBlock === 'Запрос 11' && <div><Query11 /></div>}
        </main>
    );
}

export default Main;
