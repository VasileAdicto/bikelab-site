"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const INSTAGRAM_PHOTOS = [
  "/team/189133724_295658525532197_1980416985193719294_n.jpg",
  "/team/470597147_1112117800552928_411063209783700537_n.jpg",
  "/team/470668848_1111509297280445_7610964990174402747_n.jpg",
  "/team/473188228_1128213855609989_6028438532367776445_n.jpg",
  "/team/476835262_1148912630206778_4894564428553084030_n.jpg",
  "/team/476858637_1149951423436232_4905419100628643454_n.jpg",
  "/team/487239556_1385971252821108_4296054187511228807_n.jpg",
  "/team/488209288_1391041532314080_1956860062492896315_n.jpg",
  "/team/488572730_1391041512314082_6968043216555659026_n.jpg",
  "/team/490107972_1402585534493013_2303849373563560771_n.jpg",
  "/team/490351244_1402593151158918_4836592385950887100_n.jpg",
  "/team/589139143_18074321729252633_7922891989151677289_n.jpg",
  "/instagram/ig-extra-1.png",
  "/instagram/ig-extra-2.png",
  "/instagram/ig-extra-3.png",
  "/instagram/ig-extra-4.png",
  "/instagram/ig-extra-5.png",
  "/instagram/ig-extra-6.png",
  "/instagram/ig-extra-7.png",
  "/instagram/ig-extra-8.png",
  "/instagram/ig-extra-9.png",
  "/instagram/ig-extra-10.png",
  "/instagram/ig-extra-11.png",
  "/instagram/ig-extra-12.png",
  "/instagram/ig-extra-13.png",
];

const ROTATE_MS = 5000;

export function InstagramPhotoRotator() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % INSTAGRAM_PHOTOS.length);
    }, ROTATE_MS);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="absolute inset-0">
      {INSTAGRAM_PHOTOS.map((src, i) => (
        <div
          key={src}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: i === index ? 1 : 0, zIndex: i === index ? 1 : 0 }}
        >
          <Image
            src={src}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 40vw"
            priority={i === 0}
          />
        </div>
      ))}
    </div>
  );
}
