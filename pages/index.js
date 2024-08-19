import BrandNameGenerator from '../components/BrandNameGenerator'

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Generate brand names in seconds.</h1>
      <BrandNameGenerator />
    </div>
  )
}