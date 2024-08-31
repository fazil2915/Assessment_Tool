
import {Assessment,Student,Submission} from "../database/index.js";

export const getAssessment=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id);
        
        //Find the assessment assigned to student
        const assessment=await Assessment.find({visibility:{$in:[id]}});

        if(!assessment|| assessment.length === 0){
          return res.status(404).json({message:"No Assessment assigned!!"})
        }
        res.status(200).json(assessment)
    } catch (error) {
     res.status(500).json({err:error.message})        
    }
}
//getallstudents


export const getOverdueAssessments = async (req, res) => {
    try {
      // Get the current date and time
      const currentDate = new Date()
  
      // Find assessments where the due date is less than the current date
      const overdueAssessments = await Assessment.find({ due: { $lt: currentDate } });
  
      if (!overdueAssessments || overdueAssessments.length === 0) {
        return res.status(404).json({ message: 'No overdue assessments found' });
      }
  
      res.status(200).json(overdueAssessments);
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  };

  //submit assessment

  export const submitAssessment = async (req, res) => {
    try {
      const { student_id, description, answers, assessment } = req.body
      console.log(student_id);
      
      // Find the assessment document
      const assessments = await Assessment.findById(assessment).populate('question_bank');
  
      if (!assessments) {
        return res.status(404).json({ message: "Assessment not found!" });
      }
  
      // Initialize variables for grading
      let grade = 0;
      let totalScore = 0;
  
      // Check the grading option
      if (assessments.grading_options.type === 'Automated') {
        // Automated grading logic
        for (let question of assessments.question_bank) {
          const correctOption = question.options.find(option => option.is_Correct);
          const userAnswer = answers.find(answer => answer.questionId === question._id.toString());
  
          if (question.type === 'Multiple' && correctOption && userAnswer) {
            totalScore += question.score || 0; // Add question score to total
            if (userAnswer.selectedOption === correctOption.option) {
              grade += question.score || 0; // Add score to grade if the answer is correct
            }
          }
        }
      } else if (assessments.grading_options.type === 'Manual') {
        // Manual grading logic: No grade calculation, just submission
        for (let question of assessments.question_bank) {
          const userAnswer = answers.find(answer => answer.questionId === question._id.toString());
  
          if (userAnswer) {
            if (question.type === 'short Answer' || question.type === 'Essay') {
              // Store the submitted short answer/essay as is for manual review
              userAnswer.answerText = userAnswer.answerText || '';
            }
            // In manual grading, the grade is not calculated here
          }
        }
        grade = null; 
      }
  
      // Create a new submission document
      const newSubmission = new Submission({
        student_id: student_id,
        description,
        assessment,
        answer: answers,
        grade
      });
  
      // Save the submission to the database
      await newSubmission.save();
  
      // Respond with the created submission and, if applicable, the calculated grade
      res.status(201).json({
        submission: newSubmission,
        message: assessments.grading_options.type === 'Automated'
          ? "Submission graded automatically."
          : "Submission received and pending manual grading."
      });
    } catch (error) {
      res.status(500).json({ err: error.message });
    }
  };