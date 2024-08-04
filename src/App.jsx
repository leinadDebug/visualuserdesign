import { useEffect, useState } from "react";
import "./App.css";

function App() {
  // State variables to manage the speech-to-text feature
  const [transcript, setTranscript] = useState(""); // Holds the text converted from speech
  const [isListening, setIsListening] = useState(false); // Indicates if the app is currently listening to speech

  // Check if the browser supports speech recognition
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition; // Use the browser's speech recognition if available
  const recognition = SpeechRecognition ? new SpeechRecognition() : null; // Create a new speech recognition object if supported

  useEffect(() => {
    // Run this code when the component mounts or when `isListening` or `recognition` changes
    if (recognition) {
      recognition.continuous = true; // Keep listening and processing speech without stopping
      recognition.interimResults = true; // Get results while speech is still ongoing, not just after it finishes

      // This function is called when speech is detected
      recognition.onresult = (event) => {
        // Combine all pieces of speech result into one text
        const currentTranscript = Array.from(event.results)
          .map((result) => result[0].transcript) // Get the text from each result
          .join(""); // Combine the texts into one string
        setTranscript(currentTranscript); // Update the transcript state with the new text
      };

      // This function is called when speech recognition stops
      recognition.onend = () => {
        if (isListening) {
          recognition.start(); // Restart listening if we are supposed to be listening
        }
      };

      // Cleanup when the component is removed or when `isListening` or `recognition` changes
      return () => {
        if (recognition) {
          recognition.stop(); // Stop speech recognition to free up resources
        }
      };
    }
  }, [isListening, recognition]); // Depend on `isListening` and `recognition` to rerun the effect if they change

  // Function to start speech recognition
  const startListening = () => {
    if (recognition) {
      recognition.start(); // Begin listening for speech
      setIsListening(true); // Update the state to indicate that we are now listening
    }
  };

  // Function to stop speech recognition
  const stopListening = () => {
    if (recognition) {
      recognition.stop(); // Stop listening for speech
      setIsListening(false); // Update the state to indicate that we are no longer listening
    }
  };

  const Mic = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
      height={25}
      width={35}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z"
      />
    </svg>
  );

  const play = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
      />
    </svg>
  );

  const stop = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.25 7.5A2.25 2.25 0 0 1 7.5 5.25h9a2.25 2.25 0 0 1 2.25 2.25v9a2.25 2.25 0 0 1-2.25 2.25h-9a2.25 2.25 0 0 1-2.25-2.25v-9Z"
      />
    </svg>
  );

  return (
    <div style={{ padding: "3rem" }}>
      <h1
        className="Header"
        style={{
          fontFamily: "fantasy",
          fontWeight: "lighter",
          fontSize: "larger",
          textDecoration: "underline",
        }}
      >
        Speech-To-Text
      </h1>
      <p
        style={{
          margin: "1rem",
        }}
      >
        <span
          style={{
            fontSize: "20px",
            fontWeight: "light",
            fontFamily: "fantasy",
          }}
        >
          Overview:{" "}
        </span>{" "}
        A Voice User Interface (VUI) allows users to interact with a system
        through spoken language. Implementing a VUI involves integrating
        speech-to-text (STT) software, which converts spoken language into text
        that the system can process. Here's a detailed look at how this is
        achieved:
      </p>

      <p
        style={{
          height: "200px",
          border: "2px solid white",
          borderRadius: "20px",
          padding: "10px",
          overflow: "auto",
          color: "whitesmoke",
        }}
      >
        {Mic}
        {transcript}
      </p>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          alignContent: "center",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        <button
          style={{
            padding: "6px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            display: "flex",
          }}
          onClick={startListening}
          disabled={isListening}
        >
          {play}
          Start Listening
        </button>
        <button
          style={{
            padding: "6px",
            backgroundColor: "transparent",
            borderRadius: "5px",
            textDecoration: "underline",
            display: "flex",
          }}
          onClick={stopListening}
          disabled={!isListening}
        >
          {stop}
          Stop Listening
        </button>
      </div>
      <footer
        style={{
          position: "fixed",
          color: "gray",
          bottom: 0,
          right: 0,
          opacity: "10%",
        }}
      >
        <small>&#169; created by l3</small>
      </footer>
    </div>
  );
}

export default App;
