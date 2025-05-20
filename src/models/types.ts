
// User models based on UML diagram
export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface Student {
  id: string;
  matricNo: string; // matric_no in UML
  name: string;
  email: string;
  role: "student";
}

export interface Lecturer {
  id: string;
  staffId: string; // staff_id in UML
  name: string;
  email: string;
  role: "lecturer";
}

// Course model
export interface Course {
  id: string;
  courseId: string; // course_id in UML
  lecturerId: string; // lecturer_id in UML
  title: string;
  description: string;
  department: string;
  createdAt: Date;
}

// CourseEnrollment model
export interface CourseEnrollment {
  id: string;
  registrationId: string; // registration_id in UML
  courseId: string; // course_id in UML
  studentMatricNo: string; // student_matric in UML
  enrollmentDate: Date; // enrollment_date in UML
}

// Quiz model
export interface Quiz {
  id: string; // quiz_id in UML
  courseId: string; // course_id in UML
  title: string;
  instructions: string;
  startTime: Date; // start_time in UML
  endTime: Date; // end_time in UML
  duration: number; // duration_mins in UML
  isActive: boolean; // is_active in UML
  createdAt: Date; // created_at in UML
}

// Question model
export interface Question {
  id: string; // question_id in UML
  quizId: string; // quiz_id in UML
  text: string;
  point: number; // point in UML
}

// AnswerOption model
export interface AnswerOption {
  id: string; // option_id in UML
  questionId: string; // question_id in UML
  text: string;
  isCorrect: boolean; // is_correct in UML
}

// StudentAnswer model
export interface StudentAnswer {
  id: string; // student_answer_id in UML
  attemptId: string; // attempt_id in UML
  questionId: string; // question_id in UML
  selectedOptionId: string; // selected_option_id in UML
  isCorrect: boolean; // is_correct in UML
}

// StudentQuizAttempt model
export interface StudentQuizAttempt {
  id: string; // attempt_id in UML
  quizId: string; // quiz_id in UML
  studentMatricNo: string; // student_matric in UML
  score: number;
  attemptTime: Date; // attempt_time in UML
  endTime: Date; // end_time in UML
}

// Mock data for development
export const MOCK_COURSES: Course[] = [
  {
    id: "c1",
    courseId: "CSC101",
    lecturerId: "l1",
    title: "Introduction to Computer Science",
    description: "Foundational concepts in computer science",
    department: "Computer Science",
    createdAt: new Date("2024-01-05")
  },
  {
    id: "c2",
    courseId: "MTH201",
    lecturerId: "l2",
    title: "Calculus II",
    description: "Advanced calculus concepts",
    department: "Mathematics",
    createdAt: new Date("2024-01-10")
  }
];

export const MOCK_QUIZZES: Quiz[] = [
  {
    id: "q1",
    courseId: "c1",
    title: "Week 1 Quiz: Computing Basics",
    instructions: "Answer all questions. Each question carries equal marks.",
    startTime: new Date("2025-05-20T10:00:00"),
    endTime: new Date("2025-05-20T23:59:59"),
    duration: 30,
    isActive: true,
    createdAt: new Date("2025-05-19")
  },
  {
    id: "q2",
    courseId: "c1",
    title: "Week 2 Quiz: Algorithms",
    instructions: "Answer all questions. Time limit is strict.",
    startTime: new Date("2025-05-27T10:00:00"),
    endTime: new Date("2025-05-27T23:59:59"),
    duration: 45,
    isActive: false,
    createdAt: new Date("2025-05-26")
  },
  {
    id: "q3",
    courseId: "c2",
    title: "Integration Techniques",
    instructions: "Show all your working for full marks.",
    startTime: new Date("2025-05-21T14:00:00"),
    endTime: new Date("2025-05-21T16:00:00"),
    duration: 60,
    isActive: true,
    createdAt: new Date("2025-05-18")
  }
];

export const MOCK_QUESTIONS: Question[] = [
  {
    id: "que1",
    quizId: "q1",
    text: "What is a computer?",
    point: 5
  },
  {
    id: "que2",
    quizId: "q1",
    text: "Which of the following is not an input device?",
    point: 5
  },
  {
    id: "que3",
    quizId: "q1",
    text: "What does CPU stand for?",
    point: 5
  },
  // More questions for other quizzes
  {
    id: "que4",
    quizId: "q2",
    text: "What is an algorithm?",
    point: 10
  },
  {
    id: "que5",
    quizId: "q3",
    text: "Find the integral of x²",
    point: 20
  }
];

export const MOCK_OPTIONS: AnswerOption[] = [
  // Options for question 1
  {
    id: "opt1",
    questionId: "que1",
    text: "An electronic device that processes data",
    isCorrect: true
  },
  {
    id: "opt2",
    questionId: "que1",
    text: "A mechanical calculator",
    isCorrect: false
  },
  {
    id: "opt3",
    questionId: "que1",
    text: "A type of smartphone",
    isCorrect: false
  },
  // Options for question 2
  {
    id: "opt4",
    questionId: "que2",
    text: "Keyboard",
    isCorrect: false
  },
  {
    id: "opt5",
    questionId: "que2",
    text: "Mouse",
    isCorrect: false
  },
  {
    id: "opt6",
    questionId: "que2",
    text: "Monitor",
    isCorrect: true
  },
  // Options for question 3
  {
    id: "opt7",
    questionId: "que3",
    text: "Central Processing Unit",
    isCorrect: true
  },
  {
    id: "opt8",
    questionId: "que3",
    text: "Computer Processing Unit",
    isCorrect: false
  },
  {
    id: "opt9",
    questionId: "que3",
    text: "Central Program Unit",
    isCorrect: false
  }
  // More options for other questions would be added here
];

export const MOCK_ENROLLMENTS: CourseEnrollment[] = [
  {
    id: "e1",
    registrationId: "reg1",
    courseId: "c1",
    studentMatricNo: "S12345",
    enrollmentDate: new Date("2024-02-01")
  },
  {
    id: "e2",
    registrationId: "reg2",
    courseId: "c2",
    studentMatricNo: "S12345",
    enrollmentDate: new Date("2024-02-01")
  },
  {
    id: "e3",
    registrationId: "reg3",
    courseId: "c1",
    studentMatricNo: "S67890",
    enrollmentDate: new Date("2024-02-02")
  }
];

export const MOCK_ATTEMPTS: StudentQuizAttempt[] = [
  {
    id: "a1",
    quizId: "q1",
    studentMatricNo: "S12345",
    score: 15,
    attemptTime: new Date("2025-05-20T10:30:00"),
    endTime: new Date("2025-05-20T10:55:00")
  }
];

export const MOCK_STUDENT_ANSWERS: StudentAnswer[] = [
  {
    id: "sa1",
    attemptId: "a1",
    questionId: "que1",
    selectedOptionId: "opt1",
    isCorrect: true
  },
  {
    id: "sa2",
    attemptId: "a1",
    questionId: "que2",
    selectedOptionId: "opt5",
    isCorrect: false
  },
  {
    id: "sa3",
    attemptId: "a1",
    questionId: "que3",
    selectedOptionId: "opt7",
    isCorrect: true
  }
];
