import { Inter } from '@next/font/google'
import Header from './components/Header'
import RestaurantCard from './components/RestaurantCard'
import { Cuisine, PrismaClient, Location, PRICE, Review } from '@prisma/client'

export interface RestaurantCardType {
  id: number,
  name: string,
  main_image: string,
  cuisine: Cuisine,
  slug: string,
  location: Location,
  price: PRICE,
  reviews: Review[]
}

const prisma = new PrismaClient()

const fetchRestaurants = async (): Promise<RestaurantCardType[]> => {
  const restaurants = await prisma.restaurant.findMany({
    select: {
      id: true,
      name: true,
      main_image: true,
      cuisine: true,
      slug: true,
      location: true,
      price: true,
      reviews: true
    }
  })
  return restaurants
}

export default async function Home() {
  const restaurants = await fetchRestaurants()
  console.log(restaurants[2])

  return (
    <main>
      <Header />
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {restaurants.map(restaurant => (
          <RestaurantCard restaurant={restaurant} />
        ))}

      </div>
    </main>
  )
}
