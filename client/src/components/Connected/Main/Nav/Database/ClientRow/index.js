import React, { useState } from 'react';
import '../../../../../../style/components/connected/main/options/_clientrow.sass';

const ClientRow = ({client, setSelectedClient, changeComponent}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    const handleOptionClick = (event, client, component) => {
        setSelectedClient(client);
        changeComponent(component, client);
        console.log(client);
    }

    return (
        <tr
            key={client.id_client}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
        >
            <td>{client.name}</td>
            <td>
                <div className={isHovered ? 'is-hovered' : 'not-hovered'}>
                    <button onClick={(event) => handleOptionClick(event, client, 'first_evaluation')}>1st evaluation</button>
                    <button onClick={(event) => handleOptionClick(event, client, 'second_evaluation')}>2nd evaluation</button>
                    <button onClick={(event) => handleOptionClick(event, client, 'prescription')}>Prescription</button>
                </div>
            </td>
            {/* {isHovered &&
                <td>
                    <div>
                        
                    </div>
               </td>
            } */}
        </tr>
    );
};

export default ClientRow;