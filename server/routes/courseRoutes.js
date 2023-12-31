import { Router } from "express";
import Course from "../controllers/course.js";
import Auth from "../middleware/auth.js";
import multer from "../middleware/multer.js";
const courseRouter = Router();

courseRouter.route("/courses").get(Course.getAllCourses);
courseRouter
  .route("/create")
  .post(Auth.isLoggedIn, Auth.isAdmin, multer, Course.createCourse);
  courseRouter
  .route("/update/:courseId")
  .put(Auth.isLoggedIn, Auth.isAdmin, multer, Course.updateCourse);
courseRouter
  .route("/course/:courseId")
  .get(Auth.isLoggedIn, Auth.isSubscribed, Course.getCourseLecture)
  .post(Auth.isLoggedIn, Auth.isAdmin, multer, Course.createCourseLecture)
  .delete(Auth.isLoggedIn, Auth.isAdmin, Course.deleteCourse);
courseRouter.route("/course/lecture/update").put(Auth.isLoggedIn,Auth.isAdmin,multer,Course.updateCourseLecture)
courseRouter
  .route("/lecture")
  .delete(Auth.isLoggedIn, Auth.isAdmin, Course.deleteLecture);
courseRouter
  .route("/admin/courses")
  .get(Auth.isLoggedIn, Auth.isAdmin, Course.getAllCoursesDetails);
export default courseRouter;
