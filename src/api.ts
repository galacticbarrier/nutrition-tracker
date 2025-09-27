// API functions for nutrition tracker

export interface Meal {
  id: string
  name: string
  calories: number
  date: string
  category: string
}

const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? '/.netlify/functions' 
  : '/api'

// Get all meals
export async function getMeals(): Promise<Meal[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/meals`)
    if (!response.ok) {
      throw new Error('Failed to fetch meals')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching meals:', error)
    // Return dummy data for development
    return [
      {
        id: '1',
        name: 'Breakfast Oatmeal',
        calories: 350,
        date: new Date().toISOString().split('T')[0],
        category: 'breakfast'
      },
      {
        id: '2',
        name: 'Grilled Chicken Salad',
        calories: 425,
        date: new Date().toISOString().split('T')[0],
        category: 'lunch'
      }
    ]
  }
}

// Add a new meal
export async function addMeal(meal: Omit<Meal, 'id'>): Promise<Meal> {
  try {
    const response = await fetch(`${API_BASE_URL}/meal`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(meal),
    })
    if (!response.ok) {
      throw new Error('Failed to add meal')
    }
    return await response.json()
  } catch (error) {
    console.error('Error adding meal:', error)
    // Return dummy response for development
    return {
      id: Date.now().toString(),
      ...meal
    }
  }
}

// Delete a meal
export async function deleteMeal(id: string): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/meal/${id}`, {
      method: 'DELETE',
    })
    return response.ok
  } catch (error) {
    console.error('Error deleting meal:', error)
    return false
  }
}
