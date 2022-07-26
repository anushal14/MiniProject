import React from "react";
import './Dialogue.css';
function LogoutDialog({ onDialog, onLogout }) {
  return (
    <div className="dialoguePage" onClick={() => onDialog(false)}>
      <div className="dialogueBox">
        <h2 className="DialogueTitle">Log Out?</h2>
        <p className="DialoguePara">Are you sure want to log out?</p>
        <div className="dialogueButtons">
          <button className="DialogueCancel" onClick={() => onDialog(false)}>Cancel</button>
          <button className="DialogueLogout" onClick={onLogout}>Log out</button>
        </div>
      </div>
    </div>
  );
}
export default LogoutDialog;