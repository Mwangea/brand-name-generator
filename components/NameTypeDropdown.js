export default function NameTypeDropdown({ value, onChange }) {
    return (
      <div>
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="nameType">
          Type of name
        </label>
        <select
          className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          id="nameType"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        >
          <option>Descriptive</option>
          <option>Misspelled</option>
          <option>Invented</option>
          <option>Metaphorical</option>
        </select>
      </div>
    )
  }