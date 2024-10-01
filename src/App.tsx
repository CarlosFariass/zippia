import { useState } from "react"
import axios from "axios"

interface User {
  id: number
  name: string
  username: string
  email: string
  phone: string
  address: {
    city: string
  }
  company: {
    name: string
  }
}

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const response = await axios.get<User[]>("https://jsonplaceholder.typicode.com/users")
      setUsers(response.data)
      setFilteredUsers(response.data)
      setError("")
    } catch (error) {
      setError("Failed to fetch users. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase()
    setSearchTerm(value)

    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(value)
    )
    setFilteredUsers(filtered)
  }

  const clearSearch = () => {
    setSearchTerm("")
    setFilteredUsers([])
  }

  return (
    <div className="container">
      <h1 className="title">User Management Dashboard</h1>

      <input
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={handleSearch}
      />

      <button onClick={fetchUsers} className="btn-search" disabled={loading}>
        {loading ? "Loading..." : "Fetch Users"}
      </button>
      <button onClick={clearSearch} disabled={filteredUsers.length === 0} className="btn-clear">Clear Search</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    <div className="overflow-y">
    <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>City</th>
            <th>Company</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.address.city}</td>
                <td>{user.company.name}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </div>
  )
}

export default App
