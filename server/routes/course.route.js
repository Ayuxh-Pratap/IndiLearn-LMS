import express from 'express';
import isAuthenticated from '../middleware/isAuthencated.js';
import { createCourse, createLecture, editCourse, editLecture, getAllCreatorCourses, getCourseById, getCourseLecture, getLectureById, getPublishedCourses, removeLecture, togglePublishCourse } from '../controllers/course.controller.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/').get(isAuthenticated, getAllCreatorCourses);
router.route('/published').get(isAuthenticated, getPublishedCourses);
router.route('/:courseId').put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);
router.route('/:courseId/lecture').post(isAuthenticated, createLecture);
router.route('/:courseId/lecture').get(isAuthenticated, getCourseLecture);
router.route('/:courseId/lecture').put(isAuthenticated, upload.single("lectureVideo"), editCourse);
router.route('/:courseId/lecture/:lectureId').post(isAuthenticated, editLecture);
router.route('/:courseId/lecture/:lectureId').delete(isAuthenticated, removeLecture);
router.route('/:courseId/lecture/:lectureId').get(isAuthenticated, getLectureById);
router.route('/:courseId').patch(isAuthenticated, togglePublishCourse);

export default router;