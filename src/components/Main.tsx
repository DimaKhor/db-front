import React from 'react';
import Colors from '../components/tables/Colors'

interface MainProps {
    activeBlock: string;
}

const Main: React.FC<MainProps> = ({ activeBlock }) => {
    return (
        <main className="main">
            {activeBlock === 'block1' && <div>Content for Block 1</div>}
            {activeBlock === 'Colors' && <div><Colors /></div>}
            {activeBlock === 'TransportTypes' && <div>Content for Transport Types</div>}
            {activeBlock === 'Brands' && <div>Content for Brands</div>}
            {activeBlock === 'Persons' && <div>Content for Persons</div>}
            {activeBlock === 'Organizations' && <div>Content for Organizations</div>}
            {activeBlock === 'TransportNumberDirectory' && <div>Content for Transport Number Directory</div>}
            {activeBlock === 'AccidentTypes' && <div>Content for Accident Types</div>}
            {activeBlock === 'RoadAccidents' && <div>Content for Road Accidents</div>}
            {activeBlock === 'TransportsDamagedInAccident' && <div>Content for Transports Damaged In Accident</div>}
            {activeBlock === 'HijackingsResult' && <div>Content for Hijackings Result</div>}
            {activeBlock === 'Hijackings' && <div>Content for Hijackings</div>}
            {activeBlock === 'Inspection' && <div>Content for Inspection</div>}
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
