import { useEffect, useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts'

const App = () => {
  const [btcData, setBtcData] = useState([])
  const [tomorrowPrice, setTomorrowPrice] = useState(null)

  // Función para obtener datos históricos de BTC desde el backend
  const fetchBtcData = async () => {
    //const response = await fetch('http://localhost:8000/btc_prices?asset=BTC')
    const response = await fetch('https://backpriceprediction-production.up.railway.app/btc_prices?asset=BTC')
    const data = await response.json()

    // Parsear los datos de precios de BTC
    const parsedData = JSON.parse(data)

    // Formatear datos
    const formattedData = parsedData.btc_prices.map(({ Date, 'Adj Close': price }) => ({
      date: Date,
      price: price
    }))
    setBtcData(formattedData)
  }

  // Función para obtener el precio estimado de "mañana" desde el backend
  const fetchTomorrowPrice = async () => {
    //const response = await fetch('http://localhost:8000/predict?asset=BTC')
    const response = await fetch('https://backpriceprediction-production.up.railway.app/predict?asset=BTC')
    const data = await response.json()

    const predictedPrice = JSON.parse(data).predicted_price
    setTomorrowPrice(predictedPrice.toFixed(2))
  }

  useEffect(() => {
    fetchBtcData()
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4'>
      <h1 className='text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-500 to-indigo-600 mb-8'>
        UN ia
      </h1>

      <h1 className='text-2xl font-bold mb-4'>Precio Histórico de BTC y Predicción Futura</h1>

      {/* Gráfico de línea */}
      <ResponsiveContainer width='100%' height={400}>
        <LineChart data={btcData}>
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type='monotone'
            dataKey='price'
            name='Precio BTC'
            stroke='#f2a900'
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Botón para mostrar el precio de "mañana" */}
      <button
        onClick={fetchTomorrowPrice}
        className='bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-black hover:text-gold transition duration-300 mt-10'
      >
        Mostrar Precio de Mañana
      </button>

      {/* Mostrar el precio de mañana si está disponible */}
      {tomorrowPrice && (
        <p className='mt-4 text-lg'>
          Precio estimado de BTC para mañana:{' '}
          <span className='font-bold'>${tomorrowPrice}</span>
        </p>
      )}
    </div>
  )
}

export default App
