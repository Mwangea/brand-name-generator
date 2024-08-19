export default function GeneratedNameList({ names, checkDomains }) {
    return (
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Generated Names:</h2>
        <ul className="space-y-2">
          {names.map(({ name, domainAvailable, error }, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{name}</span>
              {checkDomains && (
                <span className={`text-sm ${
                  error ? 'text-yellow-500' : 
                  domainAvailable ? 'text-green-500' : 'text-red-500'
                }`}>
                  {error ? error : 
                   domainAvailable ? 'Available' : 'Unavailable'}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>
    )
  }