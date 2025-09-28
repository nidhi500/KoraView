import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const monasteries = [
  {
    name: "Rumtek Monastery",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/f/f2/Rumtek_Monastery%2C_Sikkim.jpg",
    history:
      "Rumtek Monastery, also called the Dharma Chakra Centre, is the seat of the Karmapa. Built in the 16th century, it houses rare Buddhist art and relics. It is one of the most important monasteries of the Kagyu sect.",
    audio: {
      hindi: "/audio/rumtek_hindi.mp3",
      nepali: "/audio/rumtek_nepali.mp3",
    },
    manuscripts: "Rare manuscripts of the Kagyu lineage are preserved here.",
  },
  {
    name: "Pemayangtse Monastery",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/7/71/Pemayangtse_Monastery%2C_Sikkim.jpg",
    history:
      "Founded in 1705, Pemayangtse Monastery is one of the oldest in Sikkim. It follows the Nyingma tradition and is famous for the unique wooden sculpture 'Zangdok Palri'.",
    audio: {
      hindi: "/audio/pemayangtse_hindi.mp3",
      nepali: "/audio/pemayangtse_nepali.mp3",
    },
    manuscripts:
      "Ancient scrolls and texts related to the Nyingma order are kept here.",
  },
  {
    name: "Tashiding Monastery",
    image:
      "https://upload.wikimedia.org/wikipedia/commons/4/4d/Tashiding_Monastery.jpg",
    history:
      "Tashiding Monastery, built in the 17th century, is considered the holiest monastery in Sikkim. It is famous for the annual Bumchu festival, where a sacred vase’s water level predicts the year’s fortunes.",
    audio: {
      hindi: "/audio/tashiding_hindi.mp3",
      nepali: "/audio/tashiding_nepali.mp3",
    },
    manuscripts:
      "Religious manuscripts and ritual texts connected to Buddhist ceremonies are preserved here.",
  },
];

const Monasteries = () => {
  return (
    <div className="py-16 bg-gray-50">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Featured Monasteries of Sikkim
      </h2>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-6">
        {monasteries.map((monastery, index) => (
          <Card
            key={index}
            className="shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden"
          >
            <img
              src={monastery.image}
              alt={monastery.name}
              className="w-full h-56 object-cover"
            />
            <CardContent className="p-6 space-y-4">
              <h3 className="text-2xl font-semibold text-indigo-700">
                {monastery.name}
              </h3>
              <p className="text-gray-600">{monastery.history}</p>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => new Audio(monastery.audio.hindi).play()}
                >
                  🎧 Hindi
                </Button>
                <Button
                  variant="outline"
                  onClick={() => new Audio(monastery.audio.nepali).play()}
                >
                  🎧 Nepali
                </Button>
              </div>
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white">
                📜 View Manuscripts
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Monasteries;
