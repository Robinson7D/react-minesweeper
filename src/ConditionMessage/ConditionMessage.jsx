import React from 'react';
import './ConditionMessage.css';

const CONDITION_MESSAGES_MAP = getConditionMessagesMap();

export default ConditionMessage;

// Functions:
function ConditionMessage ({gameCondition}){
  let conditionText = CONDITION_MESSAGES_MAP.get(gameCondition);

  return (<h3 className="ConditionMessage">{conditionText}</h3>);
}

function getConditionMessagesMap(){
  return new Map([
    ['new', 'Click a cell to begin!'],
    ['active', 'Game in progress'],
    ['lose', 'YOU LOSE!'],
    ['win', 'YOU WIN!!!'],
  ]);
}