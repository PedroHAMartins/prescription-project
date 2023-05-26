import React, { useState } from 'react';

const ClientRow = ({client, setSelectedClient}) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseOver = () => {
        setIsHovered(true);
    }

    const handleMouseOut = () => {
        setIsHovered(false);
    }

    const clickClient = (event, client) => {
        setSelectedClient(client);
    }

    return (
        <tr
            key={client.id_client}
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseOut}
        >
            <td>{client.name}</td>
            {isHovered &&
                <td>
                    <div>
                        <button onClick={(event) => clickClient(event, client)}>1st evaluation</button>
                        <button onClick={(event) => clickClient(event, client)}>2nd evaluation</button>
                        <button onClick={(event) => clickClient(event, client)}>Prescription</button>
                    </div>
               </td>
            }
        </tr>
    );
};

export default ClientRow;