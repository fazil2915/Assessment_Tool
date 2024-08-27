import {Course, Teacher,Assessment, Question} from "../database/index.js"

//course
export const createCourse=async (req,res)=>{
    try {
      const{
        title,
        description,
        resources,
        teacher
      } =req.body 
      const newCourse=await new Course({
        title,
        description,
        resources,
        teacher
      });
      const savedCourse= await newCourse.save()

      res.status(201).json(savedCourse);
    } catch (error) {
        res.status(500).json({err:error.message})
    }
}

//assessment
export const createAsessment=async (req,res)=>{
  
  try {
    const {id:teach_id}=req.params
    const teacher=await Teacher.findById(teach_id)
    if(!teacher){
    return res.status(404).json({message:"teacher not found!!"})
  }
    const{
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
  
    }=req.body
    
    const newAssessment=new Assessment({
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
      scheduled_at:status==="Published" && scheduled_at? scheduled_at:null,
      due,
      time_limit,
      teacher_id:teach_id
    })
    const savedAsessment= await newAssessment.save();

    res.status(201).json(savedAsessment)
  } catch (error) {
    res.status(500).json({err:error.message})
  }
  
}

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
      return res.status(404).json({message:"Assessment not found"})
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
      attempt
    }=req.body

    //find assessment id and update
    const updateAssessment=await Assessment.findByIdAndUpdate(id,
      {
        title,
        instruction,
        status,
        due,
        time_limit,
        attempt
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
    
    const {
      text,
      type,
      difficulty,
      subject,
      category,
      score,
      options,
      answer,
      teacher_id,
      isReusable
    } = req.body;
    const teacherExists = await Teacher.findById(teacher_id);
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
    teacher_id,
    isReusable
  });
   
     await newQuestion.save();

    
    res.status(201).json(newQuestion);
  }catch (error) {
    res.status(500).json({err:error.message})
  }
}

