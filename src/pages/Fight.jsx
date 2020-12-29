import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {HotKeys} from "react-hotkeys";

import {POKEMON} from '../gql/queries';
import {useQuery} from '@apollo/client';

import vsLogo from '../assets/VS_logo.png';
import Pills from '../components/Pills';
import {SET_COMPUTER_HEALTH, SET_COMPUTER_USED_ATTACKS, SET_USER_HEALTH, SET_USER_USED_ATTACKS, TOGGLE_GAME_TURN} from '../store/actions/gameActions';
import HealthBar from '../components/HealthBar';




const Fight = () => {

  const gameState = useSelector(state => state.game);


  const {userHealth, computerHealth, isUserTurn, availableComputerFighters, availableUserFighters, computerUsedAttacks, userUsedAttacks} = gameState;

  const dispatch = useDispatch();

  const handlers = {
    ATTACK_A: () => handleAttack("a"),
    ATTACK_B: () => handleAttack("b"),
    ATTACK_C: () => handleAttack("c"),
    ATTACK_D: () => handleAttack("d"),
  };

  const keyMap = {
    ATTACK_A: "ctrl+a",
    ATTACK_B: "ctrl+b",
    ATTACK_C: "ctrl+c",
    ATTACK_D: "ctrl+d"
  };


  let selectComputerFighter = availableComputerFighters[availableComputerFighters.length - 1] || '';
  const selectUserFighter = availableUserFighters[availableUserFighters.length - 1];

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
    let fast = [...data.pokemon.attacks.fast];
    let special = [...data.pokemon.attacks.special];
    let attacks = {fast: fast.splice(0, 2), special: special.splice(0, 2)};
    let pokemon = {...data.pokemon, attacks};
    selectComputerFighter = pokemon;
  };

  const notify = (text) => {
    toast.info(text, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
    });
  };

  const attack = (type) => {
    let damageUser = 0;
    let damageComputer = 0;
    let notified = false;
    let attacks = ["a", "b", "c", "d"];

    const computerAttacks = selectComputerFighter.attacks;
    const computerResistant = selectComputerFighter.resistant;
    const computerWeaknesses = selectComputerFighter.weaknesses;

    const userAttacks = selectUserFighter.attacks;
    const userResistant = selectUserFighter.resistant;
    const userWeaknesses = selectUserFighter.weaknesses;

    let attack;
    if (type === 'a' && isUserTurn) {
      if (userUsedAttacks.includes('a')) {
        return notify("Attack already used !");
      }
      attack = userAttacks.fast[0];
    }
    if (type === 'a' && !isUserTurn) {
      if (computerUsedAttacks.includes('a')) {
        return notify("Attack already used !");
      }
      attack = computerAttacks.fast[0];
    }
    if (type === 'b' && isUserTurn) {
      if (userUsedAttacks.includes('b')) {
        return notify("Attack already used !");
      }
      attack = userAttacks.fast[1];
    }
    if (type === 'b' && !isUserTurn) {
      if (computerUsedAttacks.includes('b')) {
        return notify("Attack already used !");
      }
      attack = computerAttacks.fast[1];
    }
    if (type === 'c' && isUserTurn) {
      if (userUsedAttacks.includes('c')) {
        return notify("Attack already used !");
      }
      attack = userAttacks.special[0];
    }
    if (type === 'c' && !isUserTurn) {
      if (computerUsedAttacks.includes('c')) {
        return notify("Attack already used !");
      }
      attack = computerAttacks.special[0];
    }
    if (type === 'd' && isUserTurn) {
      if (userUsedAttacks.includes('d')) {
        return notify("Attack already used !");
      }
      attack = userAttacks.special[1];
    }
    if (type === 'd' && !isUserTurn) {
      if (computerUsedAttacks.includes('d')) {
        return notify("Attack already used !");
      }
      attack = computerAttacks.special[1];
    }
    if (isUserTurn ? computerResistant.includes(attack.type) : userResistant.includes(attack.type)) {
      notify("Your adversaire resist !!");
      notified = true;
    }
    if (isUserTurn ? computerWeaknesses.includes(attack.type) : userWeaknesses.includes(attack.type)) {
      notify("Your adversaire has been touch !!");
      notified = true;
      isUserTurn ? damageComputer = damageComputer + attack.damage : damageUser = damageUser + attack.damage;
    }
    if (!notified) notify("Attack has no effect !!");

    if (isUserTurn) {
      dispatch({type: SET_COMPUTER_HEALTH, payload: damageComputer});
      dispatch({type: SET_USER_USED_ATTACKS, payload: type});
      dispatch({type: TOGGLE_GAME_TURN});
      // const attackType = attacks[Math.floor(Math.random() * attacks.length)];
      // toast.info("Computer turn", {
      //   position: "top-center",
      //   autoClose: 2000,
      //   hideProgressBar: true,
      //   closeOnClick: true,
      //   onClose: () => handleAttack(attackType)
      // });

    } else if (!isUserTurn) {
      dispatch({type: SET_USER_HEALTH, payload: damageUser});
      dispatch({type: SET_COMPUTER_USED_ATTACKS, payload: type});
      dispatch({type: TOGGLE_GAME_TURN});
    }
  };

  const handleAttack = (type) => {
    attack(type);
  };

  const RenderFighter = ({fighter}) =>
    <>
      <div className="fight-image-background">
        <img src={fighter.image} alt={fighter.name} />
      </div>
      <h1 style={{textAlign: 'center', margin: 0}}>{fighter.name}</h1>
    </>;

  const RenderPills = ({title, datas}) => {
    const label = title === "Fast Attacks" ? ["a", "b"] : ["c", "d"];
    return (
      <>
        <h5 >{title}</h5>
        <div className="fight-pills-container">
          {
            loading ?
              <p>Loading...</p>
              :
              datas.map((attack, i) => <div key={attack.name} ><Pills title={attack.name} type={attack.type} />
                <span >ctrl+{label[i]}</span></div>)
          }
        </div>
      </>
    );
  };

  return (
    <HotKeys keyMap={keyMap} handlers={handlers} allowChanges>
      <div className="fight content-padding">
        <div className="fight-team-container" style={{opacity: isUserTurn ? 1 : 0.4}}>
          <HealthBar completed={userHealth} />
          <RenderFighter fighter={selectUserFighter} />
          <div>
            <RenderPills title={'Fast Attacks'} datas={selectUserFighter.attacks.fast} />
            <RenderPills title={'Special Attacks'} datas={selectUserFighter.attacks.special} />
          </div>
        </div>
        <img src={vsLogo} alt="vs logo" />
        <div className="fight-team-container" style={{opacity: !isUserTurn ? 1 : 0.4}}>
          <HealthBar completed={computerHealth} />
          <RenderFighter fighter={selectComputerFighter} />
          <RenderPills title={'Fast Attacks'} datas={selectComputerFighter.attacks.fast} />
          <RenderPills title={'Special Attacks'} datas={selectComputerFighter.attacks.special} />
        </div>
      </div>
    </HotKeys>
  );
};

export default Fight;