import React, { useEffect, useState } from 'react'
import CoreTypographyBody2 from '../paragraph/CoreTypographyBody2';
import { useDispatch } from 'react-redux';
import CoreClasses from '../../../styles/CoreClasses';
import CoreBox from '../../layouts/CoreBox';
import CoreTextButton from '../../inputs/CoreTextButton';

export default function CoreTimer({seconds, action, actionLabel, timerLabel}) {
    /***
     * Component should extend for hour and minutes
     */
    const [timer, setTimer] = useState(seconds)

    useEffect(() => {
        if(timer > 0){
            //Implementing the setInterval method
            const interval = setInterval(() => {
                setTimer(timer - 1);
            }, 1000);
      
            //Clearing the interval
            return () => clearInterval(interval);
        }
    }, [timer]);
  

  return (
    timer === 0?
        <CoreBox
            styleClasses={[CoreClasses.TEXT.TEXT_CENTER, CoreClasses.MARGIN.MT1]}>
            <CoreTextButton OnClick={action} label={actionLabel} />
        </CoreBox>
    :
        <CoreTypographyBody2 
            styleClasses={[CoreClasses.TEXT.TEXT_CENTER, CoreClasses.MARGIN.MT1]}
        >
            {timerLabel? timerLabel + "00:"+timer: "00:"+timer}
        </CoreTypographyBody2>
  )
}