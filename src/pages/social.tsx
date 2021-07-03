import React, { useState } from 'react';
import Navbar from '../components/presentational/Navbar';
import FriendList from '../components/social/FriendList';
import AddFriend from '../components/social/AddFriend';
import PendingRequests from '../components/social/PendingRequests';
import MultiplayerGames from '../components/social/MultiplayerGames';

const tabBarNames = [
  { label: 'Friends', selected: true },
  { label: 'Send Request', selected: false },
  { label: 'Pending Request', selected: false },
  { label: 'Multiplayer Games', selected: false },
];

const componentsList = [
  <FriendList />,
  <AddFriend />,
  <PendingRequests />,
  <MultiplayerGames />,
];

const Social: React.FC = () => {
  const [tabBarsState, setTabBarsState] =
    useState<{ label: string; selected: boolean }[]>(tabBarNames);
  const [selectedComponent, setSelectedComponent] = useState(<FriendList />);

  const handleTab = (index: number) => {
    setTabBarsState((prevState) => {
      const copyState = [...prevState];
      for (let i = 0; i < copyState.length; i++) {
        if (i !== index) {
          copyState[i].selected = false;
        }
      }
      copyState[index].selected = true;
      return copyState;
    });
    setSelectedComponent(componentsList[index]);
  };

  return (
    <div className="page__container">
      <Navbar auth />
      <div className="social__tab__component__container">
        <div className="tab__container">
          {tabBarsState.map((tabName, index) => (
            <div
              style={{ borderBottom: tabName.selected && '1px solid black' }}
              key={index}
              onClick={() => handleTab(index)}
            >
              {tabName.label}
            </div>
          ))}
        </div>
        {selectedComponent}
      </div>
    </div>
  );
};

export default Social;
