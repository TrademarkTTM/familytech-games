import { useState } from "react";
import { Modal } from "@mui/material";
import Person from "@/components/person";
import { useUser } from "@/contexts/UserContext";

function Clue(props) {
    const { number, word, clue } = props;
    const [displayClue, setDisplayClue] = useState(true);
    const [showPersonInfo, setShowPersonInfo] = useState(false);
    const [currentPerson, setCurrentPerson] = useState(null);
    const { userFSData } = useUser();

    // Switches between clue and answer
    function handleContextMenu(event) {
        event.preventDefault();
        setDisplayClue(!displayClue);
    }

    // Shows the person Modal when their name is clicked (little convoluted, maybe fix later)
    function handleNameClick() {
        if (!displayClue) {
            const transformedMap = new Map(
                [...userFSData.entries()].map(([key, value]) => [
                    value.name.compressedName,
                    { key },
                ])
            );
            const foundPerson = transformedMap.get(word);
            const realFoundPerson = userFSData.get(
                Object.values(foundPerson)[0]
            );
            if (foundPerson) {
                setCurrentPerson(realFoundPerson);
                setShowPersonInfo(true);
            }
        }
    }

    //Shows only a percentage of the word as a hind instead of the answer
    function hint(word) {
        // Step 1: Define your string
        const inputString = word;

        // Step 2: Calculate 20% of the length of the string
        const percentToTake = 0.2;
        const stringLength = inputString.length;
        const substringLength = Math.floor(stringLength * percentToTake);

        // Step 3: Slice the string to extract the first 10% of its characters
        const substring = inputString.slice(0, substringLength);

        // Print the result
        return substring;
    }

    // useEffect(() => {
    //   setDisplayClue(false);
    // }, []);

    return (
        <>
            <div
                onContextMenu={handleContextMenu}
                onClick={displayClue ? null : handleNameClick}
            >
                {number + ". " + (displayClue ? clue : hint(word))}
            </div>
            <Modal
                open={showPersonInfo}
                onClose={() => setShowPersonInfo(false)}
            >
                <Person personData={currentPerson} />
            </Modal>
        </>
    );
}

export default Clue;
