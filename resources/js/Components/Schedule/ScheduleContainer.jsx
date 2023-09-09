import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

import CardContainer from '@/Components/Containers/CardContainer';
import Scene from '@/Components/Schedule/Scene';
import Break from '@/Components/Schedule/Break';
import Move from '@/Components/Schedule/Move';
import EOD from '@/Components/Schedule/EOD';

function ScheduleContainer({ type }) {
  const [combinedClass, setCombinedClass] = useState('');

  const receiveClassFromChild = (classValue) => {
    setCombinedClass(classValue);
  };

  const renderComponentBasedOnType = () => {
    switch (type) {
      case 'scene':
        return <Scene sendClassToParent={receiveClassFromChild} />;
      case 'break':
        return <Break />;
      case 'move':
        return <Move />;
      case 'eod':
        return <EOD />;
      default:
        return null; // Handle other cases or provide a default component
    }
  };

  return (
    <div>
      <CardContainer className={`flex flex-row scene-style ${combinedClass}`}>
        {/* First Column for the Mandatory Icon */}
        <div className="icon-col">
          <div className="mr-8">
            <FontAwesomeIcon icon={faBars} /> {/* Use the imported icon */}
          </div>
        </div>
        {/* Second Row for the Dropdowns and Columns */}
        <div className="col w-full">
          {renderComponentBasedOnType()}
        </div>
      </CardContainer>
    </div>
  );
}

export default ScheduleContainer;