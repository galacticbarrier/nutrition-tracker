import { useState } from 'react'
import { addMeal } from '../api'
import type { Meal } from '../api'

interface MealFormProps {
  onMealAdded: (meal: Meal) => void
}

const MealForm: React.FC<MealFormProps> = ({ onMealAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    calories: '',
    date: new Date().toISOString().split('T')[0],
    category: 'breakfast'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.calories) {
      alert('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      const mealData = {
        name: formData.name,
        calories: parseInt(formData.calories),
        date: formData.date,
        category: formData.category
      }
      
      const newMeal = await addMeal(mealData)
      onMealAdded(newMeal)
      
      // Reset form
      setFormData({
        name: '',
        calories: '',
        date: new Date().toISOString().split('T')[0],
        category: 'breakfast'
      })
      
      alert('Meal added successfully!')
    } catch (error) {
      console.error('Error adding meal:', error)
      alert('Error adding meal. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="meal-form">
      <div className="form-group">
        <label htmlFor="name">Meal Name *</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="e.g., Grilled Chicken Salad"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="calories">Calories *</label>
        <input
          type="number"
          id="calories"
          name="calories"
          value={formData.calories}
          onChange={handleChange}
          required
          min="0"
          placeholder="e.g., 350"
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="form-control"
        />
      </div>

      <div className="form-group">
        <label htmlFor="category">Category</label>
        <select
          id="category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="form-control"
        >
          <option value="breakfast">Breakfast</option>
          <option value="lunch">Lunch</option>
          <option value="dinner">Dinner</option>
          <option value="snack">Snack</option>
        </select>
      </div>

      <button 
        type="submit" 
        disabled={loading}
        className="btn btn-primary"
      >
        {loading ? 'Adding...' : 'Add Meal'}
      </button>
    </form>
  )
}

export default MealForm
