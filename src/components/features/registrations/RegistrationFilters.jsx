export default function RegistrationFilters({ onFilterChange }) {
  return (
    <div>
      <select onChange={(e) => onFilterChange({ status: e.target.value })}>
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="confirmed">Confirmed</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  )
}