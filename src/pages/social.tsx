import React, { useState, useEffect } from 'react';
import Navbar from '../components/presentational/Navbar';
import {
  FriendList,
  AddFriend,
  PendingRequests,
  MultiPlayerGames,
} from '../components/social';

const tabBarNames = [
  { label: 'friends', selected: true },
  { label: 'send request', selected: false },
  { label: 'pending request', selected: false },
  { label: 'multiplayer games', selected: false },
];

const componentsList = [
  <FriendList />,
  <AddFriend />,
  <PendingRequests />,
  <MultiPlayerGames />,
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

  useEffect(() => {
    setSelectedComponent(<FriendList />);
  }, []);

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
