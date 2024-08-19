import { useState } from 'react'
import NameTypeDropdown from './NameTypeDropdown'
import RandomnessSlider from './RandomnessSlider'
import GeneratedNameList from './GeneratedNameList'
import { generateBrandNames } from '../utils/generateBrandNames'
import { checkDomainAvailability } from '../utils/checkDomainAvailability'

export default function BrandNameGenerator() {
  const [description, setDescription] = useState('')
  const [nameType, setNameType] = useState('Invented')
  const [randomness, setRandomness] = useState(50)
  const [checkDomains, setCheckDomains] = useState(false)
  const [generatedNames, setGeneratedNames] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      if (!description.trim()) {
        throw new Error('Please provide a company description.')
      }

      const names = generateBrandNames(description, nameType, randomness)
      
      if (checkDomains) {
        const namesWithDomains = await Promise.all(
          names.map(async (name) => {
            const domainAvailable = await checkDomainAvailability(name)
            return {
              name,
              domainAvailable,
              error: domainAvailable === null ? 'Error checking domain' : null
            }
          })
        )
        setGeneratedNames(namesWithDomains)
      } else {
        setGeneratedNames(names.map(name => ({ name, domainAvailable: null, error: null })))
      }
    } catch (err) {
      setError(err.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
            Describe your company
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="description"
            placeholder="Paste here any info about your company, products or services."
            rows="4"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NameTypeDropdown value={nameType} onChange={setNameType} />
          <RandomnessSlider value={randomness} onChange={setRandomness} />
        </div>
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox"
              checked={checkDomains}
              onChange={(e) => setCheckDomains(e.target.checked)}
            />
            <span>Check domains</span>
          </label>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <div>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? 'Generating...' : 'Generate brand names'}
          </button>
        </div>
      </form>
      {generatedNames.length > 0 && (
        <GeneratedNameList names={generatedNames} checkDomains={checkDomains} />
      )}
    </div>
  )
}