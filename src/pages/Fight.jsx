import React from 'react';
import {useSelector} from 'react-redux';

import {POKEMON} from '../gql/queries';
import {useQuery} from '@apollo/client';

import vsLogo from '../assets/VS_logo.png';
import CustomButton from '../components/CustomButton';
import Pills from '../components/Pills';




const Fight = () => {

  const state = useSelector(state => state);
  const {myTeam, computerTeam} = state;

  const selectFighter = (team) => {
    return team.find(elt => elt.played === false);
  };

  let selectComputerFighter = selectFighter(computerTeam);
  const selectMyTeamFighter = selectFighter(myTeam);

  const {loading, error, data} = useQuery(POKEMON, {
    variables: {id: selectComputerFighter.id},
  });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    selectComputerFighter = data.pokemon;
  }

  const RenderFighter = ({fighter}) =>
    <>
      <div className="fight-image-background">
        <img src={fighter.image} alt={fighter.name} />
      </div>
      <h1 style={{textAlign: 'center', margin: 0}}>{fighter.name}</h1>
    </>;

  const RenderPills = ({title, datas}) => {
    return (
      <div className="drawer-pills">
        <h5 >{title}</h5>
        <div className="drawer-pills-container">
          {
            loading ?
              <p>Loading...</p>
              :
              datas.map(attack => <Pills key={attack.name} title={attack.name} type={attack.type} />)
          }
        </div>
      </div>
    );
  };

  return (
    <div className="fight content-padding">
      <div className="fight-team-container">
        <RenderFighter fighter={selectMyTeamFighter} />
        <div>
          <RenderPills title={'Fast Attacks'} datas={selectMyTeamFighter.attacks.fast} />
          <RenderPills title={'Special Attacks'} datas={selectMyTeamFighter.attacks.special} />
        </div>
      </div>
      <img src={vsLogo} alt="vs logo" />
      <div className="fight-team-container">
        <RenderFighter fighter={selectComputerFighter} />
        <div>
          <RenderPills title={'Fast Attacks'} datas={selectComputerFighter.attacks.fast} />
          <RenderPills title={'Special Attacks'} datas={selectComputerFighter.attacks.special} />
        </div>
      </div>
      <CustomButton title={"Start"} pulse />
    </div>
  );
};

export default Fight;