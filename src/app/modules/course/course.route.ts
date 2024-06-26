import { Router } from 'express'
import requestValidator from '../../middlewares/requestValidator'
import {
  createCourseValidationSchema,
  updateCourseValidationSchema,
} from './course.validation'
import {
  createCourseController,
  getAllCourseController,
  getBestCourseController,
  getSingleCourseController,
  getSingleCourseFromReviewController,
  updateCourseController,
} from './course.controller'
import auth from '../../middlewares/auth'
import { USER_ROLE } from '../user/user.constant'

const router = Router()

//  Create a Course
router.post(
  '/courses',
  auth(USER_ROLE.admin),
  requestValidator(createCourseValidationSchema),
  createCourseController,
)
// Get Paginated and Filtered Courses
router.get('/courses', getAllCourseController)
// gte best course
router.get('/course/best', getBestCourseController)
// get single course
router.get('/courses/:id', getSingleCourseController)
// Update a Course (Partial Update with Dynamic Update)
router.put(
  '/courses/:id',
  auth(USER_ROLE.admin),
  requestValidator(updateCourseValidationSchema),
  updateCourseController,
)
// Get Course by ID with Reviews
router.get('/courses/:id/reviews', getSingleCourseFromReviewController)
export const CourseRoute = router
