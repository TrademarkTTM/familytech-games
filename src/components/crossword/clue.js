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
    const [showHighlight, setShowHighlight] = useState(false); // State for hover highlight

    function handleContextMenu(event) {
        event.preventDefault();
        setDisplayClue(!displayClue);
    }

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

    const clueStyle = {
        cursor: 'pointer', // Change cursor on hover
        backgroundColor: showHighlight ? '#ADD8E6' : 'transparent', // Apply the highlight on hover
    };

    return (
        <>
            <div
                onContextMenu={handleContextMenu}
                onClick={displayClue ? null : handleNameClick}
                onMouseEnter={() => setShowHighlight(true)} // Add highlight on hover
                onMouseLeave={() => setShowHighlight(false)} // Remove highlight on hover out
                style={clueStyle} // Apply the inline style conditionally
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

