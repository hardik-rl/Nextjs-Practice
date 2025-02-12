import "react-datepicker/dist/react-datepicker.css";
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from "@fullcalendar/interaction";
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { Modal, Box, Button, Typography, TextField, MenuItem, IconButton, Grid } from "@mui/material";

export function CustomCalendar() {
    const [value, setValue] = useState([null, null]); // Date range picker value
    const [events, setEvents] = useState([]); // Calendar events
    const [startDate, setStartDate] = useState(new Date());
    const [modalOpen, setModalOpen] = useState(false); // Modal state
    const [selectedDate, setSelectedDate] = useState(null); // Selected date
    const [formFields, setFormFields] = useState([
        {
            typeOfRoom: "",
            numberOfRooms: "",
            adults: "",
            children: "",
        },
    ]);
    const [formData, setFormData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
    });

    const handleDateClick = (info) => {
        setSelectedDate(info.dateStr); // Set the clicked date
        setModalOpen(true); // Open the modal
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleRoomFieldChange = (index, e) => {
        const updatedFields = [...formFields];
        updatedFields[index][e.target.name] = e.target.value;
        setFormFields(updatedFields);
    };

    const addNewRoom = () => {
        setFormFields([
            ...formFields,
            { typeOfRoom: "", numberOfRooms: "", adults: "", children: "" },
        ]);
    };

    const handleBookRoom = () => {
        if (!formData.firstname || !formData.lastname || !formData.email || !formData.phone) {
            alert("Please fill in all personal details.");
            return;
        }
        // Add new event to the calendar
        const newEvent = {
            id: Date.now(),
            start: selectedDate,
            end: selectedDate,
            title: `Booking: ${formData.firstname} ${formData.lastname}`,
            backgroundColor: "lightblue",
            display: "block",
        };

        setEvents((prevEvents) => [...prevEvents, newEvent]);
        setModalOpen(false); // Close the modal
    };

    const handleClose = () => setModalOpen(false);

    return (
        <div>
            <div style={{ marginBottom: "20px" }}>
                <h3>Select Date Range for Booking</h3>
                <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />
            </div>

            <div>
                <button
                    onClick={handleBookRoom}
                    style={{
                        padding: "10px 20px",
                        fontSize: "16px",
                        backgroundColor: "#007BFF",
                        color: "#FFF",
                        border: "none",
                        borderRadius: "5px",
                        cursor: "pointer",
                    }}
                >
                    Book Room
                </button>
            </div>

            <div style={{ marginTop: "40px" }}>
                <FullCalendar
                    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                    initialView="dayGridMonth"
                    events={events} // Dynamically added events
                    headerToolbar={{
                        left: "prev,next today",
                        center: "title",
                        right: "dayGridMonth,timeGridWeek,timeGridDay",
                    }}
                    dateClick={handleDateClick} // Handle date click
                    height="auto"
                />
            </div>

            <Modal
                open={modalOpen}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        maxHeight: 500,
                        overflowY: "auto",
                        m: "auto",
                        bgcolor: "background.paper",
                        // border: "2px solid #000",
                        // boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography id="modal-title" variant="h6" component="h2">
                        Book Room
                    </Typography>
                    <Typography id="modal-description" sx={{ mt: 2 }}>
                        Date Selected: {selectedDate}
                    </Typography>

                    <Box component="form" sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <TextField
                                    label="First Name"
                                    name="firstname"
                                    value={formData.firstname}
                                    onChange={handleFormChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Last Name"
                                    name="lastname"
                                    value={formData.lastname}
                                    onChange={handleFormChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleFormChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleFormChange}
                                    fullWidth
                                    margin="normal"
                                />
                            </Grid>
                        </Grid>

                        {formFields.map((field, index) => (
                            <Box key={index} sx={{ mt: 2 }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Type of Room"
                                            name="typeOfRoom"
                                            value={field.typeOfRoom}
                                            onChange={(e) => handleRoomFieldChange(index, e)}
                                            fullWidth
                                            margin="normal"
                                            select
                                        >
                                            <MenuItem value="Single">Single</MenuItem>
                                            <MenuItem value="Double">Double</MenuItem>
                                            <MenuItem value="Suite">Suite</MenuItem>
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Number of Rooms"
                                            name="numberOfRooms"
                                            value={field.numberOfRooms}
                                            onChange={(e) => handleRoomFieldChange(index, e)}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Adults"
                                            name="adults"
                                            value={field.adults}
                                            onChange={(e) => handleRoomFieldChange(index, e)}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            label="Children"
                                            name="children"
                                            value={field.children}
                                            onChange={(e) => handleRoomFieldChange(index, e)}
                                            fullWidth
                                            margin="normal"
                                        />
                                    </Grid>
                                </Grid>
                            </Box>
                        ))}

                        <Button
                            // startIcon={<AddCircleOutlineIcon />}
                            onClick={addNewRoom}
                            sx={{ mt: 2 }}
                        >
                            Add New Room
                        </Button>
                    </Box>
                    <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
                        <Button variant="contained" color="secondary" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleBookRoom}>
                            Confirm
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

function renderEventContent(eventInfo) {
    return (
        <>
            <b>{eventInfo.timeText}</b>
            <i>{eventInfo.event.title}</i>
        </>
    );
}
