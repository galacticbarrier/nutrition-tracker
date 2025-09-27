// Netlify Functions API endpoint for meals collection
// GET /api/meals - Get all meals

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
const meals: Meal[] = [
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
  },
  {
    id: '3',
    name: 'Greek Yogurt with Berries',
    calories: 180,
    date: new Date().toISOString().split('T')[0],
    category: 'snack'
  },
  {
    id: '4',
    name: 'Baked Salmon with Vegetables',
    calories: 520,
    date: new Date().toISOString().split('T')[0],
    category: 'dinner'
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
      case 'GET':
        // Return all meals
        return {
          statusCode: 200,
          headers,
          body: JSON.stringify(meals)
        }
      
      default:
        return {
          statusCode: 405,
          headers,
          body: JSON.stringify({ error: 'Method not allowed' })
        }
    }
  } catch (error) {
    console.error('Error in meals function:', error)
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Internal server error' })
    }
  }
}

export { handler }
