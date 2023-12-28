import React, { useState } from "react";
import Calendar from "./Calendar";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [bookedSlots, setBookedSlots] = useState({});

  const [availableSlots, setAvailableSlots] = useState([
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "1:00 PM",
    "2:00 PM",
  ]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    if (!bookedSlots[date.toISOString()]) {
      setBookedSlots({ ...bookedSlots, [date.toISOString()]: [] });
    }
  };

  const handleSlotSelect = (slot) => {
    const selectedDateISO = selectedDate.toISOString();
    if (!bookedSlots[selectedDateISO].includes(slot)) {
      setSelectedSlot(slot);
      setShowForm(true);
    } else {
      console.log("Slot is already booked");
      window.alert("Requested Slot is Already booked");
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const name = e.target.elements.name.value.trim();
    const email = e.target.elements.email.value.trim();
    const mobile = e.target.elements.mobile.value.trim();

    if (name === "" || email === "" || mobile === "") {
      window.alert("Please fill in all fields");
      return;
    }

    const selectedDateISO = selectedDate.toISOString();
    setBookedSlots({
      ...bookedSlots,
      [selectedDateISO]: [...bookedSlots[selectedDateISO], selectedSlot],
    });
    setConfirmation(true);
    setShowForm(false);
    setSelectedSlot("");
  };

  const isSlotBooked = (slot) => {
    const selectedDateISO = selectedDate.toISOString();
    return (
      bookedSlots[selectedDateISO] &&
      bookedSlots[selectedDateISO].includes(slot)
    );
  };

  const closeConfirmation = () => {
    setConfirmation(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-center font-bold text-3xl mb-8">
        Book an Appointment
      </h1>
      <Calendar onSelectDate={handleDateSelect} />

      {selectedDate && availableSlots.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">
            Available Slots for {selectedDate.toLocaleDateString()}
          </h2>
          <ul className="grid grid-cols-2 gap-4">
            {availableSlots.map((slot, index) => (
              <li
                key={index}
                onClick={() => handleSlotSelect(slot)}
                className={`border p-2 rounded cursor-pointer ${
                  isSlotBooked(slot) ? "bg-gray-300" : "bg-white"
                }`}
              >
                {slot}
              </li>
            ))}
          </ul>
        </div>
      )}

      {showForm && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">
            Book {selectedSlot} on {selectedDate?.toLocaleDateString()}
          </h3>
          <form
            onSubmit={handleFormSubmit}
            className="flex flex-col items-center"
          >
            {/* Input fields for booking details */}
            <input
              type="text"
              placeholder="Enter your FullName"
              className="mb-4 p-2 border rounded"
              name="name"
            />
            <input
              type="email"
              placeholder="Enter your Email ID"
              className="mb-4 p-2 border rounded"
              name="email"
            />
            <input
              type="number"
              placeholder="Enter your Mobile No."
              className="mb-4 p-2 border rounded"
              name="mobile"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Book Slot
            </button>
          </form>
        </div>
      )}

      {confirmation && (
        <div className="mt-8 bg-green-100 border-green-400 border text-green-700 px-4 py-2 rounded">
          <p>
            Appointment for {selectedSlot} on{" "}
            {selectedDate?.toLocaleDateString()} booked successfully!
          </p>
          <button
            onClick={closeConfirmation}
            className="mt-2 bg-green-500 text-white py-1 px-2 rounded hover:bg-green-600"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
