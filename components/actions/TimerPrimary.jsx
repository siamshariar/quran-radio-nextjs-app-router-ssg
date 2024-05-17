import { useEffect, useState } from "react";
import { IonIcon, IonPicker, useIonPicker } from "@ionic/react";
import { setPlaying } from "@/store";

const TimerSet = ({ classes, icon, handleSetTimer }) => {
	const [present] = useIonPicker();

	return (
		<>
			<div
				className={classes.btn}
				onClick={() =>
					present({
						columns: [
							{
								name: "hour",
								options: [
									{ text: "Hours", value: 0, disabled: true },
									{ text: "0", value: 0 },
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
									{ text: "Minutes", value: 0, disabled: true },
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
						buttons: [
							{
								text: "Cancel",
								handler: () => null,
							},
							{
								text: "Confirm",
								handler: (selected) => {
									handleSetTimer(
										(selected.hour.value * 60 + selected.minute.value) * 60
									);
								},
							},
						],
					})
				}>
				<IonIcon icon={icon} slot="start" class={classes.icon} />
			</div>
		</>
	);
};

const UnsetTimer = ({ classes, icon, timeRemaining, setIsSet }) => {
	const [isOpen, setIsOpen] = useState(false);

	function formatDur(s) {
		// ~~ => math.floor()
		const h = ~~(s / 3600);
		const m = ~~((s % 3600) / 60);
		const rs = ~~(s % 60);

		const formattedTime = `${
			h > 0 ? String(h).padStart(2, "0").concat(":") : ""
		}${String(m).padStart(2, "0")}:${String(rs).padStart(2, "0")}`;

		return formattedTime;
	}

	return (
		<>
			<div className={classes.btn} onClick={() => setIsOpen(true)}>
				<IonIcon icon={icon} slot="start" class={classes.icon} />
			</div>
			<IonPicker
				isOpen={isOpen}
				onDidDismiss={() => setIsOpen(false)}
				columns={[
					{
						name: "time",
						options: [
							{
								text: `Stop after ${formatDur(timeRemaining)}`,
								value: timeRemaining,
							},
						],
					},
				]}
				buttons={[
					{
						text: "Cancel Timer",
						handler: () => setIsSet(false),
					},
					{
						text: "Hide",
						handler: () => null,
					},
				]}></IonPicker>
		</>
	);
};

const Timer = ({ classes, icon }) => {
	const [timer, setTimer] = useState(-1);
	const [isSet, setIsSet] = useState(false);

	const handleSetTimer = (v) => {
		setIsSet(true);
		setTimer(v);
	};

	const triggerPause = () => {
		setPlaying(false);
		console.log("trigger pause");
	};

	useEffect(() => {
		let timerID;

		if (isSet) {
			timerID = setInterval(() => setTimer((prev) => prev - 1), 1000);
		}

		return () => {
			console.log(timerID);
			clearInterval(timerID);
		};
	}, [isSet]);

	useEffect(() => {
		if (timer < 1) {
			setIsSet(false);
			triggerPause();
		}
	}, [timer]);

	return (
		<div className={classes.root}>
			{isSet ? (
				<div className={classes.btn}>
					<UnsetTimer
						classes={classes}
						icon={icon.added}
						timeRemaining={timer}
						setIsSet={setIsSet}
					/>
				</div>
			) : (
				<div className={classes.btn}>
					<TimerSet
						classes={classes}
						icon={icon.removed}
						handleSetTimer={handleSetTimer}
					/>
				</div>
			)}
		</div>
	);
};

export default Timer;
