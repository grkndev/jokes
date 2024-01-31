"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const [jokes, setJokes] = useState([]);
  const [currentJokeIndex, setCurrentJokeIndex] = useState(0);

  const getNextJoke = () => {
    // Rastgele bir şaka indeksi seç
    const randomIndex = Math.floor(Math.random() * jokes.length);

    // Seçilen indeksi güncelle
    setCurrentJokeIndex(randomIndex);
  };

  useEffect(() => {
    async function fetchJokes() {
      try {
        const response = await fetch("/api/jokes");
        //fetch için useSWR apisini inceleyebilirsin :)
        //ve serverSideProps apisinede bi ara bak :)
        if (!response.ok) {
          throw new Error("veri alınamadı");
        }

        const data = await response.json();
        setJokes(data.data);
      } catch (error) {
        console.error("fetch hatası", error);
      }
    }

    // Şakaları ilk yükleme
    fetchJokes();
  }, []);

  // Eğer şakalar yüklenmediyse
  if (jokes.length === 0) {
    return <div>Şakalar yükleniyor...</div>;
  }

  // Mevcut şaka
  const currentJoke = jokes[currentJokeIndex];
  // console.log(currentJoke.text);
  // console.log(currentJoke.image);
  // console.log(currentJoke.xLink);

  return (
    <>
      <div className="relative bg-purple-400">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'url("/background.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        <div className="relative z-10 flex flex-col justify-center items-center min-h-screen">
          <div className="max-w-full mx-auto p-8 bg-sky-600 rounded-lg text-center ">
            <h2 className="text-4xl font-bold mb-3 mt-2 text-zinc-100 opacity-1">
              Elf Şakaları
            </h2>
            <div className="flex flex-col items-center justify-center ">
              <Image
                className="border rounded-md bg-white m-4 w-1/2 "
                src={currentJoke.image}
                width={300}
                height={300}
                alt="sakalar"
              ></Image>

              <h3 className="text-4xl font-bold mt-4 text-zinc-100">
              &quot;{currentJoke.text}&quot;
              {/* NextJS " gibi karaterelri işleyemez o yüzden ASCII kodu ver */}
              </h3>
            </div>
          </div>

          <div className="flex flex-row items-center justify-center">
          <button
            onClick={getNextJoke}
            className="text-base font-semibold bg-amber-500 rounded-lg m-3 p-3 text-zinc-100"
          >
            Yenisini Getir
          </button>
          <Link
          href={currentJoke.xLink}
            className="text-base font-semibold bg-purple-500 rounded-lg  m-3 p-3 text-zinc-100"
          >
           Tweete git
          </Link>
          </div>
        </div>
      </div>
    </>
  );
}
