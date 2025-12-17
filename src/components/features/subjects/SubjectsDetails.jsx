export default function SubjectDetails({ subject }) {
    return (
        <div>
            <h2>{subject.name}</h2>
            <p>Code: {subject.code}</p>
            <p>Description: {subject.description}</p>
            <p>Teacher: {subject.teacher?.name || `Teacher ID: ${subject.teacher_id}`}</p>
            <p>Program: {subject.program?.name || `Program ID: ${subject.program_id}`}</p>
        </div>
    )
}