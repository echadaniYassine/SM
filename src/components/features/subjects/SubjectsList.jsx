import { useSubjects } from '@/api/hooks/useSubjects'

export default function SubjectList() {
    const { data, isLoading, error } = useSubjects()

    if (isLoading) return <div>Loading...</div>
    if (error) return <div>Error loading subjects</div>

    const subjects = data?.data || data || []

    if (subjects.length === 0) {
        return <div>No subjects found</div>
    }

    return (
        <div>
            <h2>Subjects</h2>
            <ul>
                {subjects.map((subject) => (
                    <li key={subject.id}>
                        {subject.name} ({subject.code})
                    </li>
                ))}
            </ul>
        </div>
    )
}