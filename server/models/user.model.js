import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["instructor", "student"], 
        required: true,
        default: "student",
    },
    enrollledCourses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Course",
        },
    ],
    photoUrl: {
        type: String,
        default:""
    }
}, {
    timestamps: true,
});

export default mongoose.model("User", userSchema);