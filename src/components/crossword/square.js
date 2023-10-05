import styles from "@/styles/crossword.module.css";

function Square(props) {
    let {
        character,
        key_character,
        handleSquareInput,
        handleKeyDown,
        row,
        col,
        clueNumber,
        dimensions,
        inputLocation,
    } = props;

    function handleChange(event) {
        if (event.button === 0) {
            const clickInput = event.target;
            const clickNewValue = event.target.value;

            clickInput.setSelectionRange(
                clickNewValue.length,
                clickNewValue.length
            );

            console.log(clickInput);
            console.log(clickNewValue);
        } else {
            const input = event.target;
            const newValue = event.target.value;
            // Check if the new value has an asterisk and remove it
            const updatedValue = newValue.replace("*", "");
            // Clear the input field when you start typing
            if (updatedValue.length > 0) {
                input.value = "";
            }
            // Append the new character to the input value
            const finalValue = input.value + updatedValue;
            // Update the input value
            input.value = finalValue;
            // Move the cursor to the right of the letter
            input.setSelectionRange(finalValue.length, finalValue.length);
            // Call your handleSquareInput function
            handleSquareInput(finalValue, row, col, inputLocation);
        }
    }

    function handleDownKey(event) {
        //Added this if statement so when you tab left or up the cursor stays to the right of the letter
        if (
            event.key === "Tab" ||
            event.key === "ArrowLeft" ||
            event.key === "ArrowUp"
        ) {
            event.preventDefault();
        }
        handleKeyDown(event, row, col, inputLocation);
    }

    return (
        <>
            <div className={styles.div}>
                {clueNumber != 0 ? (
                    <p className={styles.number}>{clueNumber}</p>
                ) : null}
                <input
                    ref={(element) =>
                        (inputLocation.current[row * dimensions + col] =
                            element)
                    }
                    className={styles.square}
                    readOnly={key_character === "*" || key_character === "&"}
                    style={
                        key_character == "*"
                            // ? { backgroundColor: "#ADD8E6", borderColor: "#ADD8E6" }
                            ? { backgroundColor: "white", borderColor: "white" }
                            : key_character == "&"
                            ? {
                                  backgroundColor: "white",
                                  height: 0,
                                  width: 0,
                                  border: 0,
                              }
                            : { backgroundColor: "#1842b3", borderColor: "white" }
                    }
                    maxLength={1}
                    type="text"
                    onChange={handleChange}
                    onKeyDown={handleDownKey}
                    onClick={handleChange}
                    disabled={key_character === "*" || key_character === "&"}
                ></input>
            </div>
        </>
    );
}

export default Square;
