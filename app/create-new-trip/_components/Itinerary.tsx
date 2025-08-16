import { Button } from '@/components/ui/button';
import { Timeline } from '@/components/ui/timeline';
import { Clock, ExternalLinkIcon, Star, Ticket, Timer, Wallet2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import HotelCardItem from './HotelCardItem';

const trip_data = {
    "destination": "Bandung",
    "duration": "3 Days",
    "origin": "Jakarta",
    "budget": "Low",
    "group_size": "Solo",
    "hotels": [
      {
        "hotel_name": "Bobobox Alun-Alun",
        "hotel_address": "Jl. Kepatihan No.8, Balonggede, Regol, Bandung City, West Java 40251",
        "price_per_night": "IDR 200,000",
        "hotel_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "geo_coordinates": {
          "latitude": -6.92181,
          "longitude": 107.60452
        },
        "rating": 4.6,
        "description": "A modern capsule hotel with smart pods located centrally, perfect for solo travelers wanting easy access to the city."
      },
      {
        "hotel_name": "VK Pods Bandung",
        "hotel_address": "Jl. Raya Kopo No.399, Kb. Lega, Kec. Bojongloa Kidul, Kota Bandung, Jawa Barat 40235",
        "price_per_night": "IDR 150,000",
        "hotel_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "geo_coordinates": {
          "latitude": -6.9463,
          "longitude": 107.5925
        },
        "rating": 4.5,
        "description": "An affordable and comfortable pod hotel offering a clean and futuristic sleeping experience for budget-conscious travelers."
      }
    ],
    "itinerary": [
      {
        "day": 1,
        "day_plan": "Arrive from Jakarta, check in, and dive into Bandung's legendary central culinary scene.",
        "activities": [
          {
            "place_name": "Batagor Kingsley",
            "place_details": "A legendary spot to try Bandung's most famous dish, Batagor (fried fish dumplings and tofu served with peanut sauce). A must-visit for any food lover.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.92001,
              "longitude": 107.61433
            },
            "place_address": "Jl. Veteran No.25, Kb. Pisang, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40112",
            "ticket_pricing": "IDR 40,000 per portion",
            "time_travel_each_location": "1 hour",
            "best_time_to_visit": "Lunch (12:00 PM - 2:00 PM)"
          },
          {
            "place_name": "Alun-Alun Bandung",
            "place_details": "The city's main square, featuring a large synthetic grass field, the beautiful Grand Mosque of Bandung, and proximity to historic Jalan Asia-Afrika. Great for relaxing and people-watching.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.9217,
              "longitude": 107.6070
            },
            "place_address": "Jl. Asia Afrika, Balonggede, Kec. Regol, Kota Bandung, Jawa Barat",
            "ticket_pricing": "Free",
            "time_travel_each_location": "1.5 hours",
            "best_time_to_visit": "Afternoon (3:00 PM - 5:00 PM)"
          },
          {
            "place_name": "Cibadak Street Food Night Market",
            "place_details": "A vibrant street that comes alive at night, offering a massive variety of delicious and affordable food, from traditional Sundanese snacks to Chinese-Indonesian dishes.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.9189,
              "longitude": 107.5975
            },
            "place_address": "Jl. Cibadak, Jamika, Kec. Bojongloa Kaler, Kota Bandung, Jawa Barat",
            "ticket_pricing": "IDR 20,000 - 60,000 per dish",
            "time_travel_each_location": "2 hours",
            "best_time_to_visit": "Dinner (7:00 PM - 9:00 PM)"
          }
        ]
      },
      {
        "day": 2,
        "day_plan": "Explore the cooler northern area of Bandung for a unique breakfast, famous snacks, and a scenic Sundanese dinner.",
        "activities": [
          {
            "place_name": "Kupat Tahu Gempol",
            "place_details": "An iconic breakfast spot serving Kupat Tahu, a dish of rice cakes, tofu, and bean sprouts in a savory peanut sauce. A true taste of old Bandung.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.9015,
              "longitude": 107.6186
            },
            "place_address": "Jl. Gempol Kulon No.53, Citarum, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40115",
            "ticket_pricing": "IDR 25,000 per portion",
            "time_travel_each_location": "1 hour",
            "best_time_to_visit": "Breakfast (8:00 AM - 10:00 AM)"
          },
          {
            "place_name": "Tahu Susu Lembang",
            "place_details": "A famous culinary stop in Lembang known for its incredibly soft, savory 'milky tofu'. You can buy it freshly fried to eat immediately or packaged to take away.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.8143,
              "longitude": 107.6187
            },
            "place_address": "Jl. Raya Lembang No.177, Jayagiri, Lembang, Kabupaten Bandung Barat, Jawa Barat 40391",
            "ticket_pricing": "IDR 15,000 per box",
            "time_travel_each_location": "1 hour",
            "best_time_to_visit": "Afternoon (2:00 PM - 4:00 PM)"
          },
          {
            "place_name": "Punclut",
            "place_details": "A hilly area in North Bandung famous for its collection of traditional Sundanese restaurants (lesehan) that offer stunning views of the city lights at night.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.8485,
              "longitude": 107.6200
            },
            "place_address": "Jl. Punclut, Pagerwangi, Lembang, Kabupaten Bandung Barat, Jawa Barat",
            "ticket_pricing": "IDR 50,000 - 100,000 per person",
            "time_travel_each_location": "2.5 hours",
            "best_time_to_visit": "Dinner (6:30 PM - 8:30 PM)"
          }
        ]
      },
      {
        "day": 3,
        "day_plan": "Enjoy a traditional pancake breakfast, shop for Bandung's famous food souvenirs, and have a final hearty meal before departing.",
        "activities": [
          {
            "place_name": "Surabi Cihapit",
            "place_details": "A legendary stall that has been serving Surabi (traditional rice flour pancakes) for decades. Try the classic oncom (fermented beans) or sweet kinca (palm sugar sauce) toppings.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.9103,
              "longitude": 107.6258
            },
            "place_address": "Jl. Cihapit No.65, Cihapit, Kec. Bandung Wetan, Kota Bandung, Jawa Barat 40114",
            "ticket_pricing": "IDR 10,000 - 20,000",
            "time_travel_each_location": "1 hour",
            "best_time_to_visit": "Breakfast (8:00 AM - 10:00 AM)"
          },
          {
            "place_name": "Kartika Sari",
            "place_details": "One of the most famous brands for 'Oleh-Oleh' (food souvenirs) from Bandung. A must-visit to buy their iconic Pisang Bolen (banana pastry), brownies, and other baked goods.",
            "place_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            "geo_coordinates": {
              "latitude": -6.9094,
              "longitude": 107.6006
            },
            "place_address": "Jl. H. Akbar No.4, Pasir Kaliki, Kec. Cicendo, Kota Bandung, Jawa Barat 40171",
            "ticket_pricing": "Varies (Shopping)",
            "time_travel_each_location": "1 hour",
            "best_time_to_visit": "Late Morning (10:30 AM - 11:30 AM)"
          }
        ]
      }
    ]
  }

  // const trip_data = {
//     "destination": "Bandung",
//     "duration": "1 day",
//     "origin": "Jakarta",
//     "budget": "Cheap: Stay conscious of costs",
//     "group_size": "1",
//     "hotels": [
//         {
//             "hotel_name": "Hotel Grandia Bandung",
//             "hotel_address": "Jl. Raya Cipunooting No.23, Sukasari, Kecamatan Sukajadi, Kota Bandung, Jawa Barat 40196, Indonesia",
//             "price_per_night": "IDR 350,000 - 700,000",
//             "hotel_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             "geo_coordinates": {
//                 "latitude": -6.914811,
//                 "longitude": 107.612569
//             },
//             "rating": 4,
//             "description": "Affordable and centrally located hotel with basic amenities."
//         },
//         {
//             "hotel_name": "Hotel Sari Indah",
//             "hotel_address": "Jl. Raya Cipunooting No.3, Sukasari, Kecamatan Sukajadi, Kota Bandung, Jawa Barat 40196, Indonesia",
//             "price_per_night": "IDR 250,000 - 500,000",
//             "hotel_image_url": "https://images.unsplash.com/photo-1455587734955-081b22074882?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
//             "geo_coordinates": {
//                 "latitude": -6.914811,
//                 "longitude": 107.612569
//             },
//             "rating": 3,
//             "description": "Budget-friendly hotel with a garden and free Wi-Fi."
//         }
//     ],
//     "itinerary": [
//         {
//             "day": 1,
//             "day_plan": "Explore Bandung's dining scene",
//             "activities": [
//                 {
//                     "place_name": "Warung Mie Siram Pak Min",
//                     "place_details": "A popular local eatery known for its delicious mie siram (boiled rice with meat and vegetables).",
//                     "place_image_url": "https://images.unsplash.com/photo-1596393436343-2287910de8a6?q=80&w=1932&auto=format&fit=crop",
//                     "geo_coordinates": {
//                         "latitude": -6.914811,
//                         "longitude": 107.612569
//                     },
//                     "place_address": "Jl. Raya Cipunooting No.23, Sukasari, Kecamatan Sukajadi, Kota Bandung, Jawa Barat 40196, Indonesia",
//                     "ticket_pricing": "IDR 25,000 - 50,000",
//                     "time_travel_each_location": "0.5 hours",
//                     "best_time_to_visit": "Lunch time"
//                 },
//                 {
//                     "place_name": "Cafe Sari Indah",
//                     "place_details": "A cozy cafe with a variety of local and international dishes.",
//                     "place_image_url": "https://images.unsplash.com/photo-1596393436343-2287910de8a6?q=80&w=1932&auto=format&fit=crop",
//                     "geo_coordinates": {
//                         "latitude": -6.914811,
//                         "longitude": 107.612569
//                     },
//                     "place_address": "Jl. Raya Cipunooting No.3, Sukasari, Kecamatan Sukajadi, Kota Bandung, Jawa Barat 40196, Indonesia",
//                     "ticket_pricing": "IDR 50,000 - 100,000",
//                     "time_travel_each_location": "0.5 hours",
//                     "best_time_to_visit": "Afternoon"
//                 }
//             ]
//         }
//     ]
// }

function Itinerary() {
  const data = [
    {
      title: "Recommended Hotels",
      content: (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
         {trip_data?.hotels?.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} />
         ))}
        </div>
      ),
    },
    ...(trip_data?.itinerary || []).map((dayData) => ({
      title: `Day ${dayData.day}`,
      content: (
        <div className="flex flex-col gap-2">
          {(dayData.activities || []).map((activity, idx) => (
            <div key={idx}>
              <p className="text-sm text-gray-700">
                Best time to visit: <span className="font-semibold">{activity.best_time_to_visit}</span>
              </p>
              <div className=''>
                <Image src={activity.place_image_url} width={400} height={200} alt={activity.place_name} className='object-cover rounded-xl ' />
                <h2 className='font-semibold text-lg'>{activity.place_name}</h2>
                <p className='text-gray-500 line-clamp-2'>{activity.place_details}</p>
                <h2 className='flex gap-2 text-blue-500 line-clamp-1'> <Ticket /> {activity.ticket_pricing}</h2>
                <h2 className='flex text-orange-400 gap-2 line-clamp-1'> <Clock /> {activity.time_travel_each_location}</h2>
                <Link href={`https://www.google.com/maps/search/?api=1&query=${activity.place_name}`} target='_blank'>
                  <Button variant={'outline'} className='w-full mt-2'>View <ExternalLinkIcon /> </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      )
    }))
  ];
  return (
    <div className="relative w-full overflow-clip">
      <Timeline data={data} tripData={trip_data} />
    </div>
  );
}

export default Itinerary