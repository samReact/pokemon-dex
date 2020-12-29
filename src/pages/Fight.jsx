import React, {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';

import {POKEMON} from '../gql/queries';
import {useQuery} from '@apollo/client';

import vsLogo from '../assets/VS_logo.png';
import CustomButton from '../components/CustomButton';
import Pills from '../components/Pills';
import {ADD_COMPUTER_TEAM, ADD_USER_TEAM, UPDATE_GAME_SCORE} from '../store/appActions';
import {useHistory} from 'react-router-dom';
import HealthBar from '../components/HealthBar';




const Fight = () => {

  const [isFighting, setIsFighting] = useState(false);

  const state = useSelector(state => state);
  const {myTeam, computerTeam, userDamage, computerDamage} = state;

  const dispatch = useDispatch();
  const history = useHistory();


  const selectFighter = (team) => {
    return team.find(elt => elt.played === false);
  };

  let selectComputerFighter = selectFighter(computerTeam) || '';
  const selectMyTeamFighter = selectFighter(myTeam);

  const computerFighterId = selectComputerFighter.id;

  const {loading, error, data} = useQuery(POKEMON, {
    variables: {id: computerFighterId},
  });

  if (error) {
    return <p>Error</p>;
  }
  if (loading) {
    return <p>Loading...</p>;
  }

  if (data) {
    selectComputerFighter = data.pokemon;
  }

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      onClose: () => history.push("/game")
    });
  };

  const handleFight = () => {
    setIsFighting(true);
    let damageUser = 0;
    let damageComputer = 0;

    const computerAttacks = selectComputerFighter.attacks;
    const computerResistant = selectComputerFighter.resistant;
    const computerWeaknesses = selectComputerFighter.weaknesses;

    const userAttacks = selectMyTeamFighter.attacks;
    const userResistant = selectMyTeamFighter.resistant;
    const userWeaknesses = selectMyTeamFighter.weaknesses;

    const attack = (attacks) => {
      attacks.fast.map(attack => {
        if (attacks === computerAttacks ? userResistant.includes(attack.type) : computerResistant.includes(attack.type)) {
          return attacks === computerAttacks ? damageUser : damageComputer;
        }
        if (attacks === computerAttacks ? userWeaknesses.includes(attack.type) : computerWeaknesses.includes(attack.type)) {
          attacks === computerAttacks ? damageUser = damageUser + attack.damage : damageComputer = damageComputer + attack.damage;
        }
        return attacks === computerAttacks ? damageUser : damageComputer;
      });
      attacks.special.map(attack => {
        if (attacks === computerAttacks ? userResistant.includes(attack.type) : computerResistant.includes(attack.type)) {
          return attacks === computerAttacks ? damageUser : damageComputer;
        }
        if (attacks === computerAttacks ? userWeaknesses.includes(attack.type) : computerWeaknesses.includes(attack.type)) {
          attacks === computerAttacks ? damageUser = damageUser + attack.damage : damageComputer = damageComputer + attack.damage;
        }
        return attacks === computerAttacks ? damageUser : damageComputer;
      });
    };
    attack(userAttacks);
    attack(computerAttacks);

    const filteredComputerTeam = computerTeam.filter(member => member.id !== selectComputerFighter.id);
    const filteredmyTeam = myTeam.filter(member => member.id !== selectMyTeamFighter.id);

    dispatch({type: UPDATE_GAME_SCORE, payload: {userDamage: userDamage + damageUser, computerDamage: computerDamage + damageComputer}});
    dispatch({type: ADD_COMPUTER_TEAM, payload: [...filteredComputerTeam, {...selectComputerFighter, played: true}]});
    dispatch({type: ADD_USER_TEAM, payload: [...filteredmyTeam, {...selectMyTeamFighter, played: true}]});


    if (damageUser === damageComputer) {
      notify("Draw no winner !");
    }
    if (damageUser < damageComputer) {
      notify("You win !");
    }
    if (damageUser > damageComputer) {
      notify("Computer win !");
    }
  };

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
      {
        isFighting ?
          <p>Fighting...</p>
          :
          <>
            <div className="fight-team-container">
              <HealthBar completed={100} />
              <RenderFighter fighter={selectMyTeamFighter} />
              <div>
                <RenderPills title={'Fast Attacks'} datas={selectMyTeamFighter.attacks.fast} />
                <RenderPills title={'Special Attacks'} datas={selectMyTeamFighter.attacks.special} />
              </div>
            </div>
            <img src={vsLogo} alt="vs logo" />
            <div className="fight-team-container">
              <HealthBar completed={50} />
              <RenderFighter fighter={selectComputerFighter} />
              <div>
                <RenderPills title={'Fast Attacks'} datas={selectComputerFighter.attacks.fast} />
                <RenderPills title={'Special Attacks'} datas={selectComputerFighter.attacks.special} />
              </div>
            </div>
            <CustomButton title={"Fight !"} pulse onClick={handleFight} />
          </>
      }
    </div>
  );
};

export default Fight;