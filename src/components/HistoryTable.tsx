import { deleteMeal } from '../api'
import type { Meal } from '../api'

interface HistoryTableProps {
  meals: Meal[]
}

const HistoryTable: React.FC<HistoryTableProps> = ({ meals }) => {
  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this meal?')) {
      try {
        const success = await deleteMeal(id)
        if (success) {
          // In a real app, we would update the parent component's state
          // For now, just reload the page or show a success message
          alert('Meal deleted successfully! Please refresh the page.')
        } else {
          alert('Failed to delete meal. Please try again.')
        }
      } catch (error) {
        console.error('Error deleting meal:', error)
        alert('Error deleting meal. Please try again.')
      }
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString()
  }

  const getTotalCalories = () => {
    return meals.reduce((total, meal) => total + meal.calories, 0)
  }

  if (meals.length === 0) {
    return (
      <div className="no-meals">
        <p>No meals recorded yet. Add your first meal above!</p>
      </div>
    )
  }

  return (
    <div className="history-table-container">
      <div className="summary">
        <p><strong>Total meals:</strong> {meals.length}</p>
        <p><strong>Total calories:</strong> {getTotalCalories()}</p>
      </div>
      
      <table className="meals-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Meal Name</th>
            <th>Category</th>
            <th>Calories</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {meals.map((meal) => (
            <tr key={meal.id}>
              <td>{formatDate(meal.date)}</td>
              <td>{meal.name}</td>
              <td className={`category-${meal.category}`}>
                {meal.category.charAt(0).toUpperCase() + meal.category.slice(1)}
              </td>
              <td>{meal.calories} cal</td>
              <td>
                <button 
                  onClick={() => handleDelete(meal.id)}
                  className="btn btn-danger btn-sm"
                  title="Delete meal"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default HistoryTable
