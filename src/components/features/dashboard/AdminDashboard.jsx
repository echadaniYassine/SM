export default function AdminDashboard({ stats }) {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <div>
          <h3>Students</h3>
          <p>{stats?.students?.total || 0}</p>
        </div>
        <div>
          <h3>Teachers</h3>
          <p>{stats?.teachers?.total || 0}</p>
        </div>
        <div>
          <h3>Guardians</h3>
          <p>{stats?.users?.by_role?.guardians || 0}</p>
        </div>
      </div>
    </div>
  )
}