import  Course  from "../models/course.model.js";

export const createCourse = async (req, res) => {
    try {
        const { courseTitle, category } = req.body;
        if (!courseTitle || !category) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }
        const course = await Course.create({
            courseTitle,
            category,
            creator: req.id,
        });
        res.status(201).json({ message: "bn gya bhai tera course", course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllCreatorCourses = async (req, res) => {
    try {
        const courses = await Course.find({ creator: req.id }).populate("creator");
        if (!courses) {
            return res.status(404).json({ message: "No courses found" , courses: []});
        }
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}