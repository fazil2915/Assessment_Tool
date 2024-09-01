import {Course, Teacher,Assessment, Question,Submission,Student} from "../database/index.js"
import mongoose from "mongoose"
//course
export const createCourse=async (req,res)=>{
    try {
      const {teach_id}=req.params
      const{
        title,
        description,
        resources,
        teacher,
      } =req.body 
      const newCourse= await new Course({
        title,
        description,
        resources,
        teacher:teach_id,
      });
      const savedCourse= await newCourse.save()

      res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//assessment
export const createAsessment = async (req, res) => {
  try {
      const { id: teach_id } = req.params;
      const teacher = await Teacher.findById(teach_id);

      if (!teacher) {
          return res.status(404).json({ message: "Teacher not found!" });
      }

      const {
          title,
          instruction,
          type,
          grading_options,
          question_bank,
          attachment,
          visibility,
          status,
          attempt,
          feedback,
          recent_Activities,
          scheduled_at,
          due,
          time_limit
      } = req.body;

      // Ensure dates are parsed correctly
      const parsedScheduledAt = scheduled_at ? new Date(scheduled_at) : null;
      const parsedDue = due ? new Date(due) : null;

      const newAssessment = new Assessment({
          title,
          instruction,
          type,
          grading_options,
          question_bank,
          attachment,
          visibility,
          status,
          attempt,
          feedback,
          recent_Activities,
          scheduled_at: status === "Published" && parsedScheduledAt ? parsedScheduledAt : null,
          due: parsedDue,
          time_limit,
          teacher_id: teach_id
      });

      const savedAssessment = await newAssessment.save();
      res.status(201).json(savedAssessment);
  } catch (error) {
      console.error("Error creating assessment:", error.message);
      res.status(500).json({ err: error.message });
  }
};
export const addResource=async (req,res)=>{
  try {
    const assess_Id=req.params.id;
    const {courseId}=req.body //take the course id
    const course=await Course.findById(courseId)

    if(!course){
      return res.status(404).json({message:"course not found!"})
    }

    const assessment=await Assessment.findByIdAndUpdate(assess_Id,
      {attachment:courseId},
      {new:true,runValidators:true}
    ).populate('attachment') //populate attachment as course

    if(!assessment){
      return res.status(404).json({message:"Assessment not found!"})
    }

    res.status(200).json(assessment)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}

//update Assessment
export const updateAssessment= async (req,res)=>{
  try {
    const {id}=req.params
    const{
      title,
      instruction,
      status,
      due,
      time_limit,
      attempt,
      visibility
    }=req.body

    //find assessment id and update
    const updateAssessment=await Assessment.findByIdAndUpdate(id,
      {
        title,
        instruction,
        status,
        due,
        time_limit,
        attempt,
        visibility
      },{new:true,runValidators:true}
    );
    if(!updateAssessment){
      return res.status(404).json({message:"Assessment not found!!"})
    }

    res.status(200).json(updateAssessment)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}

export const getAssessment=async (req,res)=>{
  try {
    const {id:teacher_id} =req.params;
 
    //check if the teacher exist
    const teacher=await Teacher.findById(teacher_id)

    if(!teacher){
      res.status(404).json({message:"Teacher not found!!"})
    }

    const assessments=await Assessment.find({teacher_id})
    .populate('question_bank')
    .populate('attachment')
    .populate('visibility')
    .exec()

    if(!assessments.length===0){
      res.status(404).json({message:"No assessments found for this teacher a teacher!!"})
    }

    res.status(200).json(assessments)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}
//get assessment specific
export const getPublishedAssessments = async (req, res) => {
  try {
    const { id: teacher_id } = req.params;

    // Check if the teacher exists
    const teacher = await Teacher.findById(teacher_id);
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found!" });
    }

    // Fetch assessments with status "Published" that belong to this teacher
    const assessments = await Assessment.find({ teacher_id, status: "Published" })
      .populate('question_bank')
      .populate('attachment')
      .populate('visibility')
      .exec();

    if (assessments.length === 0) {
      return res.status(404).json({ message: "No published assessments found for this teacher!" });
    }

    res.status(200).json(assessments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


export const deleteAssessment=async (req,res)=>{
  try {
    const {id}=req.params

    //find bt id and delete
    const deleteAsess=await Assessment.findByIdAndDelete(id);
    if(!deleteAsess){
      res.status(404).json({message:"Assessment not found!!"})
    }
  
    res.status(200).json(deleteAsess)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
 
}

//questions
export const createQuestion=async (req,res)=>{
  try {
    const{teacher_id}=req.params
    const {
      text,
      type,
      difficulty,
      subject,
      category,
      score,
      options,
      answer,
      resources,
      isReusable
    } = req.body;
    const teacherExists = await Teacher.findById(teacher_id)
    if (!teacherExists) {
      return res.status(404).json({ error: 'Teacher not found' });
    }
  // Create a new Question instance
  const newQuestion = new Question({
    text,
    type,
    difficulty,
    subject,
    category,
    score,
    options,
    answer,
    resources,
    isReusable
  });
   
     await newQuestion.save()

    
    res.status(201).json(newQuestion);
  }catch (error) {
    res.status(500).json({err:error.message})
  }
}

export const getQuestions=async (req,res)=>{
  try {
    const getQuestion=await Question.find({})
    if(!getQuestion){
      return res.status(404).json({message:"Question not found"})
    }

    res.status(200).json(getQuestion)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
}


export const addQuestionToAsses = async (req, res) => {
  try {
    const {id,assess_Id } = req.params

    const question = await Question.findById(id);

    if (!question) {
          return res.status(404).json({ message: "Question not found" });
    }

    const toAssessment = await Assessment.findByIdAndUpdate(
      assess_Id,
      { $push: { question_bank: question._id } }, 
      { new: true }
    );


    if (!toAssessment) {
      console.log("Assessment not found");
      return res.status(404).json({ message: "Assessment not found" });
    }

    res.status(200).json(toAssessment);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ err: error.message });
  }
};


export const getallstudents=async(req,res)=>{
  try {
    const users=await Student.find()
    if(!users){
      res.status(404).json({meassage:"Not found!!"})
    }
    res.status(200).json(users)
  } catch (error) {
    res.status(500).json({err:error.message})   
  }
}
export const getAggregatedData = async (req, res) => {
  try {
    const aggregationPipeline = [
      {
        $group: {
          _id: {
            type: "$type",
            gradingOptions: "$grading_options.type"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.type",
          gradingOptions: {
            $push: {
              option: "$_id.gradingOptions",
              count: "$count"
            }
          },
          total: { $sum: "$count" }
        }
      },
      {
        $project: {
          _id: 0,
          type: "$_id",
          gradingOptions: 1,
          total: 1
        }
      }
    ];

    const data = await Assessment.aggregate(aggregationPipeline);
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching aggregated data:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
//submission
//get submission done by the student


//give feedback



//recent Activities

//search filter



