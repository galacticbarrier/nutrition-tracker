import { useState, useEffect } from 'react'
import MealForm from './components/MealForm'
import HistoryTable from './components/HistoryTable'
import { getMeals } from './api'
import './App.css'

interface Meal {
  id: string
  name: string
  calories: number
  date: string
  category: string
}

function App() {
  const [meals, setMeals] = useState<Meal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadMeals()
  }, [])

  const loadMeals = async () => {
    try {
      const data = await getMeals()
      setMeals(data)
    } catch (error) {
      console.error('Error loading meals:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleMealAdded = (newMeal: Meal) => {
    setMeals(prev => [...prev, newMeal])
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Nutrition Tracker</h1>
        <p>Track your daily meals and nutrition</p>
      </header>
      
      <main className="app-main">
        <section className="meal-form-section">
          <h2>Add New Meal</h2>
          <MealForm onMealAdded={handleMealAdded} />
        </section>
        
        <section className="history-section">
          <h2>Meal History</h2>
          {loading ? (
            <p>Loading meals...</p>
          ) : (
            <HistoryTable meals={meals} />
          )}
        </section>
      </main>
    </div>
  )
}

export default App
