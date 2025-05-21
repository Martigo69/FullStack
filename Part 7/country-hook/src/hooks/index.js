import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (e) => setValue(e.target.value)

  return { type, value, onChange }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (!name) {
      setCountry(null)     
      return
    }

    const fetchCountry = async () => {
      try {
        const { data } = await axios.get(
          `https://restcountries.com/v3.1/name/${name}`
        )

        const match = data.find(
          (c) => c.name.common.toLowerCase() === name.toLowerCase()
        )

        if (match) {
          setCountry({ found: true, data: match })
        } else {
          setCountry({ found: false })
        }
      } catch (err) {
        setCountry({ found: false })
      }
    }

    fetchCountry()
  }, [name])

  return country
}
