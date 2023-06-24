/*
Need to update
*/

import { useEffect, useState } from "react";
import { PlayerStore, setTimer } from "../../store";

import dynamic from "next/dynamic";

const useIonPicker = dynamic(
  () => import("@ionic/react").then((mod) => mod.useIonPicker),
  {
    ssr: false,
  }
);

const TimerSet = ({ classes, icon }) => {
  const timer = PlayerStore.useState((s) => s.timer);
  const [value, setValue] = useState(timer.value);
  const [present] = useIonPicker();

  const handleSetTimer = (hour, minute) => {
    setTimer(true, hour * 60 + minute);
  };

  return (
    <div
      className={classes.btn}
      // expand="block"
      onClick={() =>
        present(
          [
            {
              name: "hour",
              options: [
                { text: "1", value: 1 },
                { text: "2", value: 2 },
                { text: "3", value: 3 },
                { text: "4", value: 4 },
                { text: "5", value: 5 },
                { text: "6", value: 6 },
                { text: "7", value: 7 },
                { text: "8", value: 8 },
                { text: "9", value: 9 },
                { text: "10", value: 10 },
                { text: "11", value: 11 },
                { text: "12", value: 12 },
              ],
            },
            {
              name: "minute",
              options: [
                { text: "5", value: 5 },
                { text: "10", value: 10 },
                { text: "15", value: 15 },
                { text: "20", value: 20 },
                { text: "25", value: 25 },
                { text: "30", value: 30 },
                { text: "35", value: 35 },
                { text: "40", value: 40 },
                { text: "45", value: 45 },
                { text: "50", value: 50 },
                { text: "55", value: 55 },
                { text: "60", value: 60 },
              ],
            },
          ],
          [
            {
              text: "Confirm",
              handler: (selected) => {
                handleSetTimer(selected.hour.value, selected.minute.value);
              },
            },
            {
              text: "Cancel",
              handler: () => null,
            },
          ]
        )
      }
    >
      <ion-icon icon={icon} slot="start" class={classes.icon} />
    </div>
  );
};

const UnsetTimer = ({ classes, icon }) => {
  const timer = PlayerStore.useState((s) => s.timer);
  const [value, setValue] = useState(timer.value);
  const [present] = useIonPicker();

  const handleSetTimer = () => {
    setTimer(false, 0);
  };

  return (
    <div
      className={classes.btn}
      // expand="block"
      onClick={() =>
        present(
          [
            {
              name: "hour",
              options: [
                { text: `Timer is set to ${timer.value} mins`, value: 5 },
              ],
            },
          ],
          [
            {
              text: "Cancel Timer",
              handler: () => handleSetTimer(),
            },
            {
              text: "Hide",
              handler: () => null,
            },
          ]
        )
      }
    >
      <ion-icon icon={icon} slot="start" class={classes.icon} />
    </div>
  );
};

const Timer = ({ classes, icon }) => {
  const timer = PlayerStore.useState((s) => s.timer);

  return (
    <div className={classes.root}>
      {console.log(timer.value)}

      {!timer.isSet && (
        <div className={classes.btn}>
          <TimerSet classes={classes} icon={icon.removed} />
        </div>
      )}

      {timer.isSet && (
        <div className={classes.btn}>
          <UnsetTimer classes={classes} icon={icon.added} />
        </div>
      )}
    </div>
  );
};

export default Timer;
