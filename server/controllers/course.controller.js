import Course from "../models/course.model.js";
import Lecture from "../models/lecture.model.js";
import { deleteMediaFromCloudinary, deleteVideoFromCloudinary, uploadMedia } from "../utils/cloudinary.js";

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

export const getCourseLecture = async (req, res) => {
    try {
        const { courseId } = req.params
        const course = await Course.findById(courseId).populate("lectures")
        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }
        res.status(200).json({ lectures: course.lectures });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const editLecture = async (req, res) => {
    try {

        const { lectureTitle, videoInfo, isPreviewFree } = req.body;

        const { courseId, lectureId } = req.params;

        if (!lectureTitle || !courseId || !lectureId) {
            return res.status(400).json({ message: "Please fill all the fields" });
        }

        // if (!videoInfo?.videoUrl || !videoInfo?.publicId) {
        //     return res.status(400).json({ message: "Please upload video" });
        // }

        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            })
        }

        // update lecture
        if (lectureTitle) lecture.lectureTitle = lectureTitle;
        if (videoInfo?.videoUrl) lecture.videoUrl = videoInfo.videoUrl;
        if (videoInfo?.publicId) lecture.publicId = videoInfo.publicId;
        lecture.isPreviewFree = isPreviewFree;

        await lecture.save();

        // Ensure the course still has the lecture id if it was not aleardy added;
        const course = await Course.findById(courseId);
        if (course && !course.lectures.includes(lecture._id)) {
            course.lectures.push(lecture._id);
            await course.save();
        };
        return res.status(200).json({
            lecture,
            message: "Lecture updated successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to edit lectures"
        })
    }
}

export const removeLecture = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findByIdAndDelete(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        // delete the lecture from couldinary as well
        if (lecture.publicId) {
            await deleteVideoFromCloudinary(lecture.publicId);
        }

        // Remove the lecture reference from the associated course
        await Course.updateOne(
            { lectures: lectureId }, // find the course that contains the lecture
            { $pull: { lectures: lectureId } } // Remove the lectures id from the lectures array
        );

        return res.status(200).json({
            message: "Lecture removed successfully."
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to remove lecture"
        })
    }
}
export const getLectureById = async (req, res) => {
    try {
        const { lectureId } = req.params;
        const lecture = await Lecture.findById(lectureId);
        if (!lecture) {
            return res.status(404).json({
                message: "Lecture not found!"
            });
        }
        return res.status(200).json({
            lecture
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get lecture by id"
        })
    }
}

export const togglePublishCourse = async (req, res) => {
    try {
        const { courseId } = req.params;
        const { publish } = req.query
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({
                message: "Course not found!"
            });
        }
        course.isPublished = publish === 'true';
        await course.save();

        const statusMessage = course.isPublished ? "published" : "unpublished";
        return res.status(200).json({
            message: `Course ${statusMessage}.`
        })
        return res.status(200).json({
            message: "Course published successfully."
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to toggle publish course"
        })
    }
}

export const getPublishedCourses = async (req, res) => {
    try {
        const courses = await Course.find({ isPublished: true }).populate({path : "creator" , select : "name photoUrl"});
        if (!courses) {
            return res.status(404).json({
                message: "No published courses found!"
            });
        }
        return res.status(200).json({
            courses
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Failed to get published courses"
        })
    }
}