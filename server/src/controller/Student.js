
import {Assessment} from "../database/index.js";

export const getAssessment=async(req,res)=>{
    try {
        const {id}=req.params
        console.log(id);
        
        //find the assessment assigned to student
        const assessment=await Assessment.find({visibility:{$in:[id]}});

        if(!assessment|| assessment.length === 0){
          return res.status(404).json({message:"No Assessment assigned!!"})
        }
        res.status(200).json(assessment)
    } catch (error) {
     res.status(500).json({err:error.message})        
    }
}

// export const getOverdueAssessments = async (req, res) => {
//     try {
//       // Get the current date and time
//       const currentDate = new Date();
  
//       // Find assessments where the due date is less than the current date
//       const overdueAssessments = await Assessment.find({ due: { $lt: currentDate } });
  
//       if (!overdueAssessments || overdueAssessments.length === 0) {
//         return res.status(404).json({ message: 'No overdue assessments found' });
//       }
  
//       res.status(200).json(overdueAssessments);
//     } catch (error) {
//       res.status(500).json({ err: error.message });
//     }
//   };