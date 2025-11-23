import React from "react";
import Image from "next/image";

import { getPeople } from "@/models/tmdb/peopleModel";
import PeopleFilmography from "./people-filmography";
import ImageFallback from "@/components/ui/image-fallback";

interface SinglePeopleProps {
  params: Promise<{
    id: string;
  }>;
}

const SinglePeoplePage: React.FC<SinglePeopleProps> = async ({ params }) => {
  const { id } = await params;
  const data = await getPeople(id);

  return (
    <div className="w-full relative overflow-x-hidden overflow-y-auto">
      <div className="mx-auto flex flex-col md:flex-row p-4 gap-8 items-start justify-center max-w-300 mt-10">
        <Image
          src={`https://image.tmdb.org/t/p/w1280${data.profile_path}`}
          alt={data.name}
          width={790}
          height={1080}
          className="border-4 border-[#1f2022] w-56 md:w-72 object-cover aspect-[10/16] mx-auto"
        />
        <div className="flex flex-col md:p-4 gap-6">
          <h1 className="text-4xl text-center md:text-start font-bold">
            {data.name}
          </h1>
          <div>
            <h2 className="font-bold text-md border-b-2 pb-2 mb-2">
              BIOGRAPHY
            </h2>
            <div className="opacity-80">{data.biography}</div>
            <div className="text-sm opacity-80 mt-4">
              <div className="grid grid-cols-[max-content_1fr] lg:grid-cols-[max-content_1fr_max-content_1fr] gap-3">
                {data.known_for_department && (
                  <>
                    <div>Known For</div>
                    <div>{data.known_for_department}</div>
                  </>
                )}
                {data.gender && (
                  <>
                    <div>Gender</div>
                    <div>
                      {data.gender === 1
                        ? "Female"
                        : data.gender === 2
                        ? "Male"
                        : data.gender === 3
                        ? "Non-binary"
                        : "Unknown"}
                    </div>
                  </>
                )}
                {data.birthday && (
                  <>
                    <div>Birthday</div>
                    <div>
                      {new Date(data.birthday).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </>
                )}
                {data.deathday && (
                  <>
                    <div>Death Day</div>
                    <div>
                      {new Date(data.deathday).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </div>
                  </>
                )}
                {data.place_of_birth && (
                  <>
                    <div>Place of Birth</div>
                    <div>{data.place_of_birth}</div>
                  </>
                )}
                {data.also_known_as?.length > 0 && (
                  <>
                    <div>Also Known As</div>
                    <div>{data.also_known_as.join(", ")}</div>
                  </>
                )}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-bold text-md border-b-2 pb-2 mb-2">MEDIA</h2>
            <div className="flex gap-2 max-w-fit overflow-x-scroll">
              {data.images.profiles.map((item: any, index: number) => (
                <ImageFallback
                  key={index}
                  defaultSrc={`https://image.tmdb.org/t/p/w1280${item.file_path}`}
                  fallback="/no-image.png"
                  alt="Example 1"
                  width={1280}
                  height={720}
                  className="w-48"
                />
              ))}
            </div>
          </div>

          <PeopleFilmography data={data} />
        </div>
      </div>
    </div>
  );
};

export default SinglePeoplePage;
