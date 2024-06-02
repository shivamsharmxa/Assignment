import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const GlobalContext = React.createContext({
  monthIndex: 0,
  setMonthIndex: () => {},
  smallCalendarMonth: 0,
  setSmallCalendarMonth: () => {},
  daySelected: null,
  setDaySelected: () => {},
  showEventModal: false,
  setShowEventModal: () => {},
  dispatchCalEvent: () => {},
  savedEvents: [],
  selectedEvent: null,
  setSelectedEvent: () => {},
  setLabels: () => {},
  labels: [],
  updateLabel: () => {},
  updateLabelOrder: () => {},
  filteredEvents: [],
});

export const GlobalProvider = ({ children }) => {
  const [monthIndex, setMonthIndex] = useState(0);
  const [smallCalendarMonth, setSmallCalendarMonth] = useState(0);
  const [daySelected, setDaySelected] = useState(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [savedEvents, setSavedEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [labels, setLabels] = useState([
    { label: 'indigo', checked: true },
    { label: 'gray', checked: false },
    { label: 'green', checked: false },
    { label: 'blue', checked: false },
    { label: 'red', checked: false },
    { label: 'purple', checked: true },
  ]);
  const [filteredEvents, setFilteredEvents] = useState([]);

  const updateLabel = ({ label, checked }) => {
    setLabels(labels.map(lbl => (lbl.label === label ? { ...lbl, checked } : lbl)));
  };

  const updateLabelOrder = (updatedLabels) => {
    setLabels(updatedLabels);
  };

  const dispatchCalEvent = ({ type, payload }) => {
    switch (type) {
      case "push":
        setSavedEvents([...savedEvents, payload]);
        break;
      case "update":
        setSavedEvents(savedEvents.map(evt => evt.id === payload.id ? payload : evt));
        break;
      case "delete":
        setSavedEvents(savedEvents.filter(evt => evt.id !== payload.id));
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    setFilteredEvents(savedEvents.filter(evt =>
      labels
        .filter(lbl => lbl.checked)
        .map(lbl => lbl.label)
        .includes(evt.label)
    ));
  }, [savedEvents, labels]);

  return (
    <GlobalContext.Provider value={{
      monthIndex,
      setMonthIndex,
      smallCalendarMonth,
      setSmallCalendarMonth,
      daySelected,
      setDaySelected,
      showEventModal,
      setShowEventModal,
      dispatchCalEvent,
      savedEvents,
      selectedEvent,
      setSelectedEvent,
      labels,
      updateLabel,
      updateLabelOrder,
      filteredEvents,
    }}>
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.node.isRequired, // Ensure children is a valid React node and is required
};

export default GlobalContext;
