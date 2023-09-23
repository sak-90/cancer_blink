import React, { useState } from "react";
import doctorsData from "./store";

const Chatbot = () => {
  const [chatbotOpened, setChatbotOpened] = useState(false);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const openChatbotInNewTab = () => {
    if (name.trim() !== "" && number.trim() !== "") {
      window.open("http://localhost:8000/", "_blank");
      setChatbotOpened(true);
    } else {
      alert("Please fill in both name and number fields.");
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setIsValid(e.target.value.trim() !== "" && number.trim() !== "");
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
    setIsValid(name.trim() !== "" && e.target.value.trim() !== "");
  };

  return (
    <div style={{ display: "flex" }}>
      {chatbotOpened ? (
        <div>
          <div
            style={{
              fontSize: "1.8rem",
              marginLeft: "2rem",
              marginBottom: "3rem",
              fontWeight: 700,
            }}
          >
            Based on your predicted severity of cancer, we will let you know
            your appointment shortly.
          </div>
          <div
            style={{
              fontSize: "1.2rem",
              marginLeft: "3rem",
              marginBottom: "1rem",
              fontWeight: 500,
            }}
          >
            Here are some doctors we recommend you to consult:
          </div>
          <div style={{ fontSize: "1rem", marginLeft: "3rem" }}>
            {doctorsData.map((data, index) => {
              return (
                <>
                  <div>
                    {index + 1}) Doctor's name: {data.name}
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    Address: {data.address}
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    Area served: {data.areasServed}
                  </div>
                  <div style={{ marginLeft: "1rem" }}>
                    Closing time: {data.closed}
                  </div>
                  <br />
                </>
              );
            })}
          </div>
        </div>
      ) : (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              height: "100vh",
              backgroundColor: "#55ccff",
              width: "60rem",
            }}
          >
            <div
              style={{
                fontSize: "24px",
                fontWeight: "bold",
                marginBottom: "20px",
                textAlign: "center",
              }}
            >
              Checkout our chatbot
            </div>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              style={{
                width: "73%",
                padding: "12px 20px",
                margin: "8px 0",
                boxSizing: "border-box",
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
              }}
            />
            <input
              type="number"
              placeholder="Mobile number"
              value={number}
              onChange={handleNumberChange}
              style={{
                marginBottom: "1.5rem",
                width: "73%",
                padding: "12px 20px",
                margin: "8px 0",
                boxSizing: "border-box",
                backgroundColor: "white",
                border: "1px solid black",
                color: "black",
              }}
            />
            <div
              style={{
                textAlign: "center",
                marginBottom: "1rem",
                fontSize: "0.8rem",
                fontFamily: "monospace",
                color: "black",
                width: "73%",
              }}
            >
              Please fill out these details before accessing chatbot
            </div>
            <button
              onClick={openChatbotInNewTab}
              style={{
                backgroundColor: "black",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "5px",
                cursor: "pointer",
                border: "none",
                outline: "none",
              }}
            >
              Click here
            </button>
          </div>
          <div
            style={{
              color: "white",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginLeft: "2rem",
              textAlign: "center",
              fontSize: "1.1rem",
              fontFamily: "monospace",
            }}
          >
            The chatbot will assess the malignancy potential of skin lesions,
            providing a severity evaluation based on the likelihood of
            malignancy. Patients with higher probabilities of malignancy in
            their lesions will be prioritized for expedited
            appointment scheduling.
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
