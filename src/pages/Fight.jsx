import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {toast} from 'react-toastify';
import {HotKeys} from "react-hotkeys";
import useSound from 'use-sound';

import {POKEMON} from '../gql/queries';
import {useQuery} from '@apollo/client';

import vsLogo from '../assets/VS_logo.png';
import laughSound from '../assets/sounds/laugh.mp3';
import touchedSound from '../assets/sounds/touched.mp3';



import Pills from '../components/Pills';
import {INCREMENT_COMPUTER_SCORE, INCREMENT_USER_SCORE, NEXT_TURN, RESET_GAME, SET_COMPUTER_HEALTH, SET_COMPUTER_USED_ATTACKS, SET_USER_HEALTH, SET_USER_USED_ATTACKS, TOGGLE_GAME_TURN} from '../store/actions/gameActions';
import HealthBar from '../components/HealthBar';
import {useHistory} from 'react-router-dom';




const Fight = () => {

  const gameState = useSelector(state => state.game);

  const history = useHistory();

  const {userHealth, userScore, computerScore, computerHealth, isUserTurn, availableComputerFighters, availableUserFighters, computerUsedAttacks, userUsedAttacks} = gameState;

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

  const [laughSoundActive] = useSound(
    laughSound,
    {volume: 1}
  );

  const [touchedSoundActive] = useSound(
    touchedSound,
    {volume: 1}
  );


  const notify = (text, position, duration, type, action) => {
    toast(text, {
      position: position,
      autoClose: duration || 1000,
      hideProgressBar: true,
      closeOnClick: true,
      type: type || "info",
      onClose: () => {
        switch (action) {
          case 'next':
            return dispatch({type: NEXT_TURN});
          case 'end':
            dispatch({type: RESET_GAME});
            return history.push("/");
          default:
            return null;
        }
      }
    });
  };

  useEffect(() => {

  }, [userHealth, computerHealth]);

  useEffect(() => {
    let message;
    if (userHealth === 0) {
      dispatch({type: INCREMENT_COMPUTER_SCORE});
      return notify("Computer Win !", "top-center", 5000, "info", 'next');
    }
    if (computerHealth === 0) {
      dispatch({type: INCREMENT_USER_SCORE});
      laughSoundActive();
      return notify("You Win !", "top-center", 5000, "info", 'next');
    }
    if (isUserTurn && userUsedAttacks.length === 4) {
      if (userHealth < computerHealth) {
        dispatch({type: INCREMENT_COMPUTER_SCORE});
        message = "You loose";
      }
      if (userHealth === computerHealth) {
        message = "No winner ! ";
      }
      if (userHealth > computerHealth) {
        laughSoundActive();
        message = "You win !";
        dispatch({type: INCREMENT_USER_SCORE});
      }
      if (availableUserFighters.length === 1) {
        let message;
        if (userScore > computerScore) message = "You win the game !";
        if (userScore < computerScore) message = "You loose the game !";
        if (userScore === computerScore) message = "No winner for this game !";
        return notify(message, "top-center", 5000, "info", 'end');
      }
      return notify(message, "top-center", 5000, "info", 'next');
    }

    if (!isUserTurn && computerUsedAttacks.length === 4) {
      if (userHealth < computerHealth) {
        dispatch({type: INCREMENT_COMPUTER_SCORE});
        message = "You loose";
      }
      if (userHealth === computerHealth) {
        message = "No winner ! ";
      }
      else {
        dispatch({type: INCREMENT_USER_SCORE});
        laughSoundActive();
        message = "You win !";
      }
      if (availableComputerFighters.length === 1) {
        let message;
        if (userScore > computerScore) message = "You win the game !";
        if (userScore < computerScore) message = "You loose the game !";
        if (userScore === computerScore) message = "No winner  !";
        return notify(message, "top-center", 5000, "info", 'end');
      }
      return notify(message, "top-center", 5000, "info", 'next');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUserTurn, userHealth, computerHealth]);


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



  const attack = (type) => {

    let damageUser = 0;
    let damageComputer = 0;
    let notified = false;

    const computerAttacks = selectComputerFighter.attacks;
    const computerResistant = selectComputerFighter.resistant;
    const computerWeaknesses = selectComputerFighter.weaknesses;

    const userAttacks = selectUserFighter.attacks;
    const userResistant = selectUserFighter.resistant;
    const userWeaknesses = selectUserFighter.weaknesses;


    let attack;
    if (type === 'a' && isUserTurn) {
      if (userUsedAttacks.includes('a')) {
        return notify("Attack already used !", "top-left", 1000, "warning");
      }
      attack = userAttacks.fast[0];
    }
    if (type === 'a' && !isUserTurn) {
      if (computerUsedAttacks.includes('a')) {
        return notify("Attack already used !", "top-right", 1000, "warning");
      }
      attack = computerAttacks.fast[0];
    }
    if (type === 'b' && isUserTurn) {
      if (userUsedAttacks.includes('b')) {
        return notify("Attack already used !", "top-left", 1000, "warning");
      }
      attack = userAttacks.fast[1];
    }
    if (type === 'b' && !isUserTurn) {
      if (computerUsedAttacks.includes('b')) {
        return notify("Attack already used !", "top-right", 1000, "warning");
      }
      attack = computerAttacks.fast[1];
    }
    if (type === 'c' && isUserTurn) {
      if (userUsedAttacks.includes('c')) {
        return notify("Attack already used !", "top-left", 1000, "warning");
      }
      attack = userAttacks.special[0];
    }
    if (type === 'c' && !isUserTurn) {
      if (computerUsedAttacks.includes('c')) {
        return notify("Attack already used !", "top-right", 1000, "warning");
      }
      attack = computerAttacks.special[0];
    }
    if (type === 'd' && isUserTurn) {
      if (userUsedAttacks.includes('d')) {
        return notify("Attack already used !", "top-left", 1000, "warning");
      }
      attack = userAttacks.special[1];
    }
    if (type === 'd' && !isUserTurn) {
      if (computerUsedAttacks.includes('d')) {
        return notify("Attack already used !", "top-right", 1000, "warning");
      }
      attack = computerAttacks.special[1];
    }
    if (!attack) return notify("Attack not available !", "top-right", 1000, "warning");
    if (isUserTurn ? computerResistant.includes(attack.type) : userResistant.includes(attack.type)) {
      laughSoundActive();
      notify(isUserTurn ? "Your adversaire resist !!" : "Nice you resist to this attack !", "top-center", 1000, "warning");
      notified = true;
    }
    if (isUserTurn ? computerWeaknesses.includes(attack.type) : userWeaknesses.includes(attack.type)) {
      touchedSoundActive();
      notify(isUserTurn ? "Your adversaire has been touch !!" : "You have been touch !", "top-center", 1000, "error");
      notified = true;
      isUserTurn ? damageComputer = damageComputer + attack.damage : damageUser = damageUser + attack.damage;
    }
    if (!notified) notify("Attack has no effect !!", "top-center", 1000, "info");
    if (isUserTurn) {
      dispatch({type: SET_COMPUTER_HEALTH, payload: damageComputer});
      dispatch({type: SET_USER_USED_ATTACKS, payload: type});

    } else if (!isUserTurn) {
      dispatch({type: SET_USER_HEALTH, payload: damageUser});
      dispatch({type: SET_COMPUTER_USED_ATTACKS, payload: type});
    }
    dispatch({type: TOGGLE_GAME_TURN});

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