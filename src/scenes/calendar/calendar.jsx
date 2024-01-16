import { useState, useEffect } from "react";
import FullCalendar, { formatDate } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import Header from "../../components/Header";
import { tokens } from "../../theme";
import axios from "axios";

const Calendar = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/getcalendar",
          {
            email: localStorage.getItem("email"),
          },
          {
            withCredentials: true,
          }
        );
        setCurrentEvents(response.data[0]);
      } catch (error) {
        setCurrentEvents([]);
        console.log(error);
      }
    };

    fetchData(); // Call the async function
  }, []);

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [currentEvents, setCurrentEvents] = useState([]);

  const updateCalendar = async () => {
    try {
      if (currentEvents) {
        const response = await axios.post(
          "http://localhost:8000/updatecalendar",
          {
            email: localStorage.getItem("email"),
            events: currentEvents,
          },
          {
            withCredentials: true,
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  window.addEventListener("beforeunload", updateCalendar);

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const calendarApi = selected.view.calendar;
    calendarApi.unselect();

    // Check if the title already exists among the current events
    const titleExists = currentEvents.some((event) => event.title === title);

    if (title && !titleExists) {
      const newEvent = {
        id: `${selected.dateStr}-${title}`,
        title,
        start: selected.startStr,
        end: selected.endStr,
        allDay: selected.allDay,
      };
      setCurrentEvents([...currentEvents, newEvent]); // Adding the new event to currentEvents
    } else if (titleExists) {
      alert("This title already exists. Please choose a different title.");
    }
  };

  const handleEventClick = (selected) => {
    if (
      window.confirm(
        `Are you sure you want to delete the event '${selected.event.title}'`
      )
    ) {
      const updatedEvents = currentEvents.filter(
        (event) => event.id !== selected.event.id
      );
      setCurrentEvents(updatedEvents); // Removing the event from currentEvents
    }
  };

  return (
    <Box m="20px">
      <Header title="Calendar" subtitle="Full Calendar Interactive Page" />

      <Box display="flex" justifyContent="space-between">
        {/* CALENDAR SIDEBAR */}
        <Box
          flex="1 1 20%"
          backgroundColor={colors.primary[400]}
          p="15px"
          borderRadius="4px"
        >
          <Typography variant="h5">Events</Typography>
          <List>
            {currentEvents
              .filter((event) => new Date(event.end) > new Date()) // Filter events with end date greater than current date

              .sort((a, b) => new Date(a.start) - new Date(b.start)) // Sort by start date
              .slice(0, 5) // Take the first 5 elements
              .map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: colors.greenAccent[500],
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        Start :{" "}
                        {formatDate(event.start, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                        <br />
                        End:{" "}
                        {formatDate(event.end, {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
          </List>
        </Box>

        {/* CALENDAR */}
        <Box flex="1 1 100%" ml="15px">
          <FullCalendar
            height="75vh"
            plugins={[
              dayGridPlugin,
              timeGridPlugin,
              interactionPlugin,
              listPlugin,
            ]}
            headerToolbar={{
              left: "prev,next today",
              center: "title",
              right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
            }}
            initialView="timeGridWeek"
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            select={handleDateClick}
            eventClick={handleEventClick}
            events={currentEvents}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Calendar;
