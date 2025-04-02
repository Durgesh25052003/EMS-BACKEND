const Event = require('../Models/eventModel');
const { StatusCodes } = require('http-status-codes');

// Create new event
exports.createEvent = async (req, res) => {
  try {
    console.log(req.body)
    const event = await Event.create(req.body);
    res.status(StatusCodes.CREATED).json({ event });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.status(StatusCodes.OK).json({ events });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Get single event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Event not found' });
    }
    res.status(StatusCodes.OK).json({ event });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};

// Update event
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findById({_id:req.params.eventId});
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Event not found' });
    }
    event.participants.push(req.body._id)
    await event.save()
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Event not found' });
    }
    res.status(StatusCodes.OK).json({ event });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
  }
};

// Delete event
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(StatusCodes.NOT_FOUND).json({ msg: 'Event not found' });
    }
    res.status(StatusCodes.OK).json({ msg: 'Event deleted successfully' });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: error.message });
  }
};
