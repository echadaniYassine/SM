export default function RecentActivity({ activities = [] }) {
  return (
    <div>
      <h2>Recent Activity</h2>
      <ul>
        {activities.map((activity, idx) => (
          <li key={idx}>{activity.message}</li>
        ))}
      </ul>
    </div>
  )
}