export default function SubjectCard({ subject }) {
    return (
        <div>
            <h3>{subject.name}</h3>
            <p>Code: {subject.code}</p>
            <p>Description: {subject.description}</p>
            <p>Teacher ID: {subject.teacher_id}</p>
            <p>Program ID: {subject.program_id}</p>
        </div>
    )
}