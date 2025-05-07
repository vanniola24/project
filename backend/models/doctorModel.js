import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    image: {type: String, required: true},
    speciality: {type: String, required: true},
    degree: {type: String, required: true},
    experience: {type: String, required: true},
    about: {type: String, required: true},
    available: {type: Boolean, default: true},
    fee: {type: Number, required: true},
    adress: {type: Object, required: true},
    date: {type: Number, required: true},
    availability: {
      type: Map,
      of: [String], // Array of time slots like ["09:00", "10:30"]
      default: new Map()
    },
    slots_booked: {
      type: Map,
      of: [String], // Array of booked slots like ["2023-11-20 09:00"]
      default: new Map()
    }
}, {minimize: false})

// More robust model definition
let doctorModel;
try {
    doctorModel = mongoose.model('doctor');
} catch {
    doctorModel = mongoose.model('doctor', doctorSchema);
}

export default doctorModel;
