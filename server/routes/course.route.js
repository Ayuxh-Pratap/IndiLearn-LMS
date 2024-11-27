import express from 'express';
import isAuthenticated from '../middleware/isAuthencated.js';
import { createCourse, editCourse, getAllCreatorCourses, getCourseById } from '../controllers/course.controller.js';
import upload from '../utils/multer.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/').get(isAuthenticated, getAllCreatorCourses);
router.route('/:courseId').put(isAuthenticated,upload.single("courseThumbnail"), editCourse);
router.route('/:courseId').get(isAuthenticated, getCourseById);



export default router;