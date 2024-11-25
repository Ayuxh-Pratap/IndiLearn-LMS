import express from 'express';
import isAuthenticated from '../middleware/isAuthencated.js';
import { createCourse, getAllCreatorCourses } from '../controllers/course.controller.js';

const router = express.Router();

router.route('/').post(isAuthenticated, createCourse);
router.route('/').get(isAuthenticated, getAllCreatorCourses);



export default router;