const Purchase = require("../model/Purchase");
const Course = require("../model/Course");
// Purchase course 
async function purchaseCourse(req, res) {
  const userId = req.user.id;
  const { courseId } = req.body;
  const course = await Course.findById(courseId);
  if (!course) return res.status(404).json({ message: "Course not found" });

  const purchase = Purchase({
    userId,
    courseId,
    amount: course.price,
    date: new Date(),
  });
  await purchase.save();

  res.status(200).json(purchase);
}
// List all purchase course
async function getUserPurchases(req, res) {
  const userId = req.user.id;
  const purchases = await Purchase.find({ userId }).populate(
    "courseId",
    "title description price instructor"
  );
  res.json(purchases);
}

module.exports = { purchaseCourse, getUserPurchases };
