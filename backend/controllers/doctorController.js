import doctorModel from "../models/doctorModel.js"

const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;
    
    // Validate input
    if (!doctorId || !date || !time) {
      return res.json({ success: false, message: "Missing required fields" });
    }

    // Find doctor and check availability
    const doctor = await doctorModel.findById(doctorId);
    if (!doctor) {
      return res.json({ success: false, message: "Doctor not found" });
    }

    // Check if slot is available
    const availableSlots = doctor.availability.get(date) || [];
    if (!availableSlots.includes(time)) {
      return res.json({ success: false, message: "Time slot not available" });
    }

    // Check if already booked
    const bookedSlots = doctor.slots_booked.get(date) || [];
    if (bookedSlots.includes(time)) {
      return res.json({ success: false, message: "Slot already booked" });
    }

    // Update availability and booked slots
    const updatedAvailability = availableSlots.filter(slot => slot !== time);
    doctor.availability.set(date, updatedAvailability);
    
    doctor.slots_booked.set(date, [...bookedSlots, time]);
    
    await doctor.save();

    return res.json({ 
      success: true, 
      message: "Appointment booked successfully",
      appointment: { date, time }
    });

  } catch (error) {
    console.error(error);
    return res.json({ success: false, message: error.message });
  }
};

const changeAvailability = async (req, res) => {
    try {
        const {docId} = req.body
        const docData = await doctorModel.findById(docId)
        await doctorModel.findByIdAndUpdate(docId, {available: !docData.available})
        res.json({success: true, message: 'Availability changed successfully'})
    } catch (error) {
        console.log(error)
        res.json({success: false, message: error.message})
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password','-email'])
        res.json({success: true, doctors})
    } catch (error) {
        console.log(error);
        res.json({success: false, message: error.message})
    }
}

export { changeAvailability, doctorList, bookAppointment }
