"use client"

import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useDispatch, useSelector } from "react-redux"
import { clearError, clearMessage } from "../../../redux/reducers/profileReducer"
import { updateUserProfile } from "../../../redux/actions/profileAction"
import UserChangePassword from "../../common/UserChangePassword"

function EditProfile() {
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  })

  // Custom loyalty points data
  const [loyaltyData] = useState({
    currentPoints: 2450,
    totalEarned: 5680,
    pointsToNextTier: 550,
    currentTier: "Gold",
    nextTier: "Platinum",
    recentTransactions: [
      { id: 1, description: "Purchase Reward", points: 150, date: "2024-01-15", type: "earned" },
      { id: 2, description: "Birthday Bonus", points: 200, date: "2024-01-10", type: "earned" },
      { id: 3, description: "Redeemed Discount", points: -100, date: "2024-01-08", type: "redeemed" },
      { id: 4, description: "Review Bonus", points: 50, date: "2024-01-05", type: "earned" },
      { id: 5, description: "Referral Bonus", points: 300, date: "2024-01-02", type: "earned" },
    ],
  })

  const { user } = useSelector((state) => state.auth)
  const { loading, error, message } = useSelector((state) => state.profile)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    setFormData({
      username: user?.username,
      email: user?.email,
    })
  }, [user])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(updateUserProfile(formData))
  }

  useEffect(() => {
    if (error) {
      toast.error(error.message)
      dispatch(clearError())
    }
    if (message) {
      toast.success(message)
      dispatch(clearMessage())
    }
  }, [error, message, dispatch, toast])

  const getTierColor = (tier) => {
    switch (tier) {
      case "Gold":
        return "text-yellow-600"
      case "Platinum":
        return "text-gray-600"
      case "Diamond":
        return "text-blue-600"
      default:
        return "text-gray-600"
    }
  }

  const getTierBgColor = (tier) => {
    switch (tier) {
      case "Gold":
        return "bg-yellow-100"
      case "Platinum":
        return "bg-gray-100"
      case "Diamond":
        return "bg-blue-100"
      default:
        return "bg-gray-100"
    }
  }

  return (
    <>
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-10">
        <form onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
                Username
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="username"
                placeholder="Enter the Username"
                value={formData.username}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
            <div>
              <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                type="email"
                name="email"
                placeholder="Enter the Email"
                value={formData.email}
                onChange={handleChange}
                required
                readOnly={!editMode}
              />
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setEditMode(true)}
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                editMode ? "hidden" : ""
              }`}
            >
              Edit
            </button>
            <button
              disabled={loading}
              type="submit"
              className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                !editMode ? "hidden" : ""
              }`}
            >
              {loading ? "Loading...." : "Update"}
            </button>
          </div>
        </form>
      </div>

      {/* Loyalty Points Section */}
      <div className="max-w-5xl mx-auto bg-white shadow-lg rounded px-10 py-10 mt-6">
        <h2 className="text-2xl font-bold mb-6">Loyalty Points</h2>

        {/* Points Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Current Points</h3>
            <p className="text-3xl font-bold">{loyaltyData.currentPoints.toLocaleString()}</p>
          </div>

          <div className="bg-gradient-to-r from-green-500 to-green-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Total Earned</h3>
            <p className="text-3xl font-bold">{loyaltyData.totalEarned.toLocaleString()}</p>
          </div>

          <div className={`${getTierBgColor(loyaltyData.currentTier)} p-6 rounded-lg border-2 border-gray-200`}>
            <h3 className="text-lg font-semibold mb-2 text-gray-700">Current Tier</h3>
            <p className={`text-3xl font-bold ${getTierColor(loyaltyData.currentTier)}`}>{loyaltyData.currentTier}</p>
          </div>
        </div>

        {/* Progress to Next Tier */}
        <div className="bg-gray-50 p-6 rounded-lg mb-8">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold text-gray-700">Progress to {loyaltyData.nextTier}</h3>
            <span className="text-sm text-gray-600">{loyaltyData.pointsToNextTier} points needed</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3">
            <div
              className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-300"
              style={{
                width: `${((3000 - loyaltyData.pointsToNextTier) / 3000) * 100}%`,
              }}
            ></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {Math.round(((3000 - loyaltyData.pointsToNextTier) / 3000) * 100)}% complete
          </p>
        </div>

        {/* Recent Transactions */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-gray-700">Recent Activity</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                    Description
                  </th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Points</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Date</th>
                  <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">Type</th>
                </tr>
              </thead>
              <tbody>
                {loyaltyData.recentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-700">{transaction.description}</td>
                    <td
                      className={`border border-gray-300 px-4 py-3 font-semibold ${
                        transaction.type === "earned" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {transaction.type === "earned" ? "+" : ""}
                      {transaction.points}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-gray-600">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 px-4 py-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          transaction.type === "earned" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                        }`}
                      >
                        {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Points Redemption Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="text-lg font-semibold text-blue-800 mb-3">How to Use Your Points</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-700">
            <div>
              <p className="font-medium mb-1">• 100 points = $1 discount</p>
              <p className="font-medium mb-1">• 500 points = Free shipping</p>
              <p className="font-medium mb-1">• 1000 points = 10% off next purchase</p>
            </div>
            <div>
              <p className="font-medium mb-1">• 2000 points = Exclusive product access</p>
              <p className="font-medium mb-1">• 3000 points = Tier upgrade</p>
              <p className="font-medium mb-1">• 5000 points = VIP customer support</p>
            </div>
          </div>
        </div>
      </div>

      <UserChangePassword />
    </>
  )
}

export default EditProfile
