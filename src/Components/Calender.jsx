import { useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import  '../App.css'

const localizer = momentLocalizer(moment)

function Calender() {

    const [events, setEvents] = useState([])
    const [showModal, setShowModal] = useState(false)
    const [selectedDate, setSelectedDate] = useState(null)
    const [eventTitle, setEventTitle] = useState('')
    const [selectedEvent, setSelectedEvent] = useState(null)
    const handleSelectSlot = (slotInfo) => {
        setShowModal(true)
        setSelectedDate(slotInfo?.start)
        setSelectedEvent(null)
    }

    const handleSelectedEvent = (e) => {
        setShowModal(true)
        setSelectedEvent(e)
        setEventTitle(e.title)
    }
    function generateUniqueId() {
        // Generate a random number between 0 and 9999
        const randomNumber = Math.floor(Math.random() * 10000);
    
        // Get the current timestamp
        const timestamp = Date.now();
    
        // Combine the timestamp and random number to create a unique ID
        const uniqueId = timestamp.toString() + randomNumber.toString();
    
        return uniqueId;
    }
    const saveEvent = () => {
        // if (eventTitle && selectedDate) {
        //     const newEvent = {
        //         title: eventTitle,
        //         start: selectedDate,
        //         end: moment(selectedDate).add(1, 'hours').toDate()
        //     }

        //     setEvents([...events, newEvent])
        //     setShowModal(false)
        //     setEventTitle('')
        // }

        if (eventTitle && selectedDate) {
            if (selectedEvent) {
                const updateEvent = { ...selectedEvent, title: eventTitle };
                const updatedEvents = events.map(event =>
                    event.id === selectedEvent.id ? updateEvent : event
                );
                
                setEvents(updatedEvents);
            } else {
                const newEvent = {
                    id: generateUniqueId(),
                    title: eventTitle,
                    start: selectedDate,
                    end: moment(selectedDate).add(1, 'hours').toDate()
                };
                setEvents([...events, newEvent])
            }
            setShowModal(false)
            setEventTitle('')
            setSelectedEvent(null)
        }
    }


    const deleteEvent = () => {
        if (selectedEvent) {
            const remainEvents = events.filter(e => e.id !== selectedEvent.id)
            setEvents(remainEvents)
            setShowModal(false)
            setEventTitle('')
            setSelectedEvent(null)
        }
    }

    return (
        <>
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ margin: '50px' }}
                    selectable={true}
                    onSelectSlot={handleSelectSlot}
                    onSelectEvent={handleSelectedEvent}
                    views={["month", "week", "day"]}
                />
            </div>

            {/* Modal */}

            {showModal && (
                <div
                    class="modal"
                    style={{
                        display: 'block',
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        position: 'fixed',
                        top: 0,
                        bottom: 0,
                        left: 0,
                        right: 0
                    }}
                >
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title">
                                    {selectedEvent ? 'Edit Event' : 'Add Event'}
                                </h5>
                                <button
                                    type="button"
                                    class="btn-close"
                                    onClick={() => {
                                        setShowModal(false)
                                        setEventTitle()
                                        setSelectedEvent(null)
                                    }}
                                ></button>
                            </div>
                            <div class="modal-body">
                                <label>Event Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="evenTitle"
                                    value={eventTitle}
                                    name="eventTitle"
                                    onChange={(e) =>
                                        setEventTitle(e.target.value)
                                    }
                                />
                            </div>
                            <div class="modal-footer">
                                {
                                    selectedEvent && (
                                        <button type='button' className='btn btn-danger me-2' onClick={deleteEvent}>
                                            Delete
                                        </button>
                                    )
                                }
                                <button
                                    type="button"
                                    class="btn btn-primary"
                                    onClick={saveEvent}
                                >
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default Calender
