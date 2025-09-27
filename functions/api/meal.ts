// Netlify Functions API endpoint for individual meal operations
// POST /api/meal - Add a new meal
// DELETE /api/meal/:id - Delete a meal

import { Handler, HandlerEvent, HandlerContext } from '@netlify/functions'

interface Meal {
  id: string
  name: string
  calories: number
  date: string
  category: string
}

// In-memory storage for demo purposes
// In a real application, this would be a database
let meals: Meal[] = [
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

const handler: Handler = async (event: HandlerEvent, context: HandlerContext) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS'
  }

  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: ''
    }
  }

  try {
    switch (event.httpMethod) {
      case 'POST':
        // Add a new meal
        const newMealData = JSON.parse(event.body || '{}')
        const newMeal: Meal = {
          id: Date.now().toString(),
          name: newMealData.name,
          calories: newMealData.calories,
          date: newMealData.date,
          category: newMealData.category
        }
        
        // Basic validation
        if (!newMeal.name || !newMeal.calories) {
          return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Missing required fields: name and calories' })
          }
        }
        
        meals.push(newMeal)
        
        return {
          statusCode: 201,
          headers,
          body: JSON.stringify(newMeal)
        }
      
      case 'DELETE':
        // Delete a meal
        const pathParts = event.path.split('/')
        const mealId = pathParts[pathParts.length - 1]
        
        const mealIndex = meals.findIndex(meal => meal.id === mealId)
        if (mealIndex === -1) {
          return {
            statusCode: 404,
            headers,
            body: JSON.stringify({ error: 'Meal not found' })
          }
        }
        
        meals.splice(mealIndex, 1)
        
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify({ success: true })
        }
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        }
    }
  } catch (error) {
    console.error('Error in meal function:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

export { handler }
