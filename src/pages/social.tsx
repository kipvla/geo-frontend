import React, { useState, useEffect } from 'react';
import Navbar from '../components/presentational/Navbar';
import { FriendList, AddFriend, PendingRequests } from '../components/social';
import { useUserContext } from '../lib/context';

const tabBarNames = [
  { label: 'friends', selected: true },
  { label: 'add friend', selected: false },
  { label: 'pending requests', selected: false },
];

const componentsList = [<FriendList />, <AddFriend />, <PendingRequests />];

const Social: React.FC = () => {
  const [tabBarsState, setTabBarsState] =
    useState<{ label: string; selected: boolean }[]>(tabBarNames);
  const [selectedComponent, setSelectedComponent] = useState(<FriendList />);
  const { user } = useUserContext();
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
    setTabBarsState([
      { label: 'friends', selected: true },
      { label: 'add friend', selected: false },
      { label: 'pending requests', selected: false },
    ]);
  }, []);

  return (
    <div className="page__container">
      <Navbar auth notifications={user?.gameInvites.length} />
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
