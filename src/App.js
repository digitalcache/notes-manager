import React, {useRef} from 'react'
import Checklist from './components/Checklist';
import './App.css';

function App() {
  const notesRef = useRef()
  const checklistRef = useRef()
  const reminderRef = useRef()

  const openSection = (evt, type) => {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    if(type === "notes"){
      notesRef.current.style.display = "block"
    } else if(type === "checklist"){
      checklistRef.current.style.display = "block"
    } else if(type === "reminder"){
      reminderRef.current.style.display = "block"
    }
    evt.currentTarget.className += " active";
  }
  return (
    <>
      <h2>Notes Manager</h2>

      <div className="tab">
        <button className="tablinks" onClick={(e) => openSection(e, 'notes')}>NOTES</button>
        <button className="tablinks" onClick={(e) => openSection(e, 'checklist')}>Checklist</button>
        <button className="tablinks" onClick={(e) => openSection(e, 'reminder')}>Reminder</button>
      </div>

      <div ref={notesRef} className="tabcontent">
        Notes
      </div>

      <div ref={checklistRef} className="tabcontent">
        <Checklist />
      </div>

      <div ref={reminderRef} className="tabcontent">
        Reminders
      </div>
    </>
  );
}

export default App;
