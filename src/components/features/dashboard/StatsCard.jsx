export default function StatsCard({ title, value, subtitle }) {
  return (
    <div>
      <h3>{title}</h3>
      <p>{value}</p>
      {subtitle && <small>{subtitle}</small>}
    </div>
  )
}