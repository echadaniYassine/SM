export default function StudentFilters({ onFilterChange }) {
  return (
    <div>
      <input type="text" placeholder="Search..." onChange={(e) => onFilterChange({ search: e.target.value })} />
      <select onChange={(e) => onFilterChange({ program_id: e.target.value })}>
        <option value="">All Programs</option>
      </select>
    </div>
  )
}

