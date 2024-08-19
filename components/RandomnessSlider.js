export default function RandomnessSlider({ value, onChange }) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="randomness">
          Randomness
        </label>
        <input
          type="range"
          className="w-full"
          id="randomness"
          min="0"
          max="100"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
        />
      </div>
    )
  }