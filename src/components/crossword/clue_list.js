import Clue from "./clue";
import { useEffect, useState } from "react";
import moment from "moment";

function ClueList(props) {
    let { verticalClues, horizontalClues, result } = props;
    const [clueList, setClueList] = useState({
        VERTICAL: verticalClues,
        HORIZONTAL: horizontalClues,
    });
    const [timerValue, setTimerValue] = useState(1 * 60); // 10 minutes in seconds

    useEffect(() => {
        function startTimer() {
            const timerInterval = setInterval(() => {
                setTimerValue((prevTimerValue) => {
                    if (prevTimerValue <= 0) {
                        clearInterval(timerInterval);
                        window.alert("Time's up!"); // Display an alert when the timer is up
                        return 0;
                    } else {
                        return prevTimerValue - 1;
                    }
                });
            }, 1000);
            return () => clearInterval(timerInterval); // Clean up the timer interval when the component unmounts
        }

        startTimer(); // Start the timer when the component mounts
    }, []);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        const formattedSeconds = remainingSeconds.toString().padStart(2, "0");
        return `${minutes}:${formattedSeconds}`;
    }

    useEffect(() => {
        setClueList(makeClueList());
    }, []);
    function makeClueList() {
        for (let i = 0; i < verticalClues.length; i++) {
            verticalClues[i].CLUE = verticalClues[i].WORD;
        }
        for (let i = 0; i < horizontalClues.length; i++) {
            horizontalClues[i].CLUE = horizontalClues[i].WORD;
        }
        let clues = { VERTICAL: verticalClues, HORIZONTAL: horizontalClues };
        return clues;
    }
    clueList.VERTICAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER);
    clueList.HORIZONTAL.sort((a, b) => a.CLUE_NUMBER - b.CLUE_NUMBER);

    for (let i = 0; i < clueList.VERTICAL.length; i++) {
        let hint = result.find(
            (item) => item.answer === clueList.VERTICAL[i].WORD
        );
        if (hint != null) {
            clueList.VERTICAL[i].CLUE = hint.clue;
        }
    }

    for (let i = 0; i < clueList.HORIZONTAL.length; i++) {
        let hint = result.find(
            (item) => item.answer === clueList.HORIZONTAL[i].WORD
        );
        if (hint != null) {
            clueList.HORIZONTAL[i].CLUE = hint.clue;
        }
    }

    return (
        <>
            <div>
                <div id="timer">
                    {timerValue > 0
                        ? `Time remaining: ${formatTime(timerValue)}`
                        : "Time's up!"}
                </div>
                <h1>Clues</h1>
                <h2>Down</h2>
                {clueList.VERTICAL.map((clues) => {
                    return (
                        <div key={clues.CLUE_NUMBER}>
                            <Clue
                                number={clues.CLUE_NUMBER}
                                word={clues.WORD}
                                clue={clues.CLUE}
                            />
                        </div>
                    );
                })}
                <h2>Across</h2>
                {clueList.HORIZONTAL.map((clues) => {
                    return (
                        <div key={clues.CLUE_NUMBER}>
                            <Clue
                                number={clues.CLUE_NUMBER}
                                word={clues.WORD}
                                clue={clues.CLUE}
                            />
                        </div>
                    );
                })}
                <h3>Hints can be seen by right-clicking the clue</h3>
            </div>
        </>
    );
}
export default ClueList;
