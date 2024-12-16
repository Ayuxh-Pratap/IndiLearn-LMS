import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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
            return res.status(404).json({ message: "No courses found", courses: [] });
        }
        res.status(200).json({ courses });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editCourse = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const { courseTitle, subTitle, description, category, courseLevel, coursePrice } = req.body;
        const thumbnail = req.file;

        let course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        let courseThumbnail;
        if (thumbnail) {
            if (course.courseThumbnail) {
                const publicId = course.courseThumbnail.split('/').pop().split('.')[0];
                await deleteMediaFromCloudinary(publicId);
            }

            courseThumbnail = await uploadMedia(thumbnail.path);
        }

        const updateData = {
            courseTitle,
            subTitle,
            description,
            category,
            courseLevel,
            coursePrice,
            courseThumbnail
        };

        course = await Course.findByIdAndUpdate(courseId, updateData, { new: true });

        res.status(200).json({ message: "Course updated successfully", course });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getCourseById = async (req, res) => {
    try {
        const courseId = req.params.courseId;
        const course = await Course.findById(courseId)
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ course });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const createLecture = async (req, res) => {
    try {
        const { lectureTitle } = req.body;
        const { courseId } = req.params;

        if (!lectureTitle || !courseId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        const lecture = await Lecture.create({ lectureTitle });
        // const course = await Course.findByIdAndUpdate(courseId, {
        //     $push: { lectures: lecture._id }
        // }, { new: true });

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        course.lectures.push(lecture._id);
        await course.save();

        res.status(201).json({ message: "Lecture created successfully", lecture });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            error
        })
    }
};
