"use client";
import { useEffect, useState } from "react";
import { client } from "../../sanity/lib/client";

import Navbar from "../components/Navbar";
import Footer from "../components/footer";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const weekData = [
  { week: "WEEK 4", dates: "OCT 16 - 22" },
  { week: "WEEK 5", dates: "OCT 23 - 29" },
  { week: "WEEK 6", dates: "OCT 30 - NOV 5" },
  { week: "WEEK 7", dates: "NOV 6 - 12" },
  { week: "WEEK 8", dates: "NOV 13 - 19" },
  { week: "WEEK 9", dates: "NOV 20 - 26" },
  { week: "WEEK 10", dates: "NOV 27 - DEC 3" },
  { week: "WEEK 11", dates: "DEC 4 - 10" },
];

export default function GamesPage() {
  const [currentWeekIndex, setCurrentWeekIndex] = useState(0);
  const [activeDivision, setActiveDivision] = useState<"Men" | "Women">("Men");
  const [matches, setMatches] = useState<any[]>([]);

  const handleWeekClick = (index: number) => setCurrentWeekIndex(index);
  const handleDivisionClick = (division: "Men" | "Women") =>
    setActiveDivision(division);

  const activeColor = "#1a1a1a";
  const inactiveColor = "#777777";

  const segmentBaseStyle =
    "py-2 px-6 text-sm font-semibold transition-colors duration-200";
  const segmentActiveStyle = "bg-[#012752] text-white shadow-inner";
  const segmentInactiveStyle =
    "bg-transparent text-white hover:bg-[#a80f0f]";

  // Fetch matches from Sanity for the selected division
  useEffect(() => {
    const fetchMatches = async () => {
      const data = await client.fetch(`
        *[_type == "match" && division == "${activeDivision}"] | order(matchDay asc) {
          _id,
          matchDay,
          date,
          time,
          team1 { name, logo { asset-> { url } } },
          team2 { name, logo { asset-> { url } } }
        }
      `);
      setMatches(data);
    };

    fetchMatches();
  }, [activeDivision]);

  return (
    <>
      <Navbar linkTextColor="text-gray-800" />

      <main className="min-h-screen bg-white text-gray-800 pt-[160px]">
        {/* --- Top Section --- */}
        <div className="px-4 sm:px-6 md:px-10 max-w-8xl mx-auto">
          <div className="w-full mb-10">
            <Image
              src="/games1.png"
              alt="CFFL Games Background"
              width={1200}
              height={400}
              className="w-full h-auto object-cover rounded-lg shadow-xl"
            />
          </div>

          {/* --- Week Scroller --- */}
          <section className="relative py-4 border-b border-gray-200 overflow-x-auto">
            <div className="flex items-center justify-between w-full select-none min-w-[320px]">
              <button
                onClick={() => handleWeekClick(currentWeekIndex - 1)}
                disabled={currentWeekIndex === 0}
                className={`p-2 rounded-full transition-all ${
                  currentWeekIndex === 0
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronLeft size={24} />
              </button>

              <div className="flex flex-wrap justify-center md:justify-between items-start flex-grow mx-2 sm:mx-4 gap-3 md:gap-0">
                {weekData.map((weekItem, index) => {
                  const isCurrent = index === currentWeekIndex;
                  return (
                    <div
                      key={index}
                      className={`flex flex-col items-center cursor-pointer px-1 transition-all duration-300 ${
                        isCurrent ? "scale-105" : "hover:opacity-75"
                      }`}
                      onClick={() => handleWeekClick(index)}
                    >
                      <span
                        className="font-bold uppercase text-center"
                        style={{
                          fontSize: "12px",
                          color: isCurrent ? activeColor : inactiveColor,
                        }}
                      >
                        {weekItem.week}
                      </span>
                      <span
                        className="font-normal uppercase text-center mt-1"
                        style={{
                          fontSize: "14px",
                          color: isCurrent ? "#333333" : inactiveColor,
                        }}
                      >
                        {weekItem.dates}
                      </span>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={() => handleWeekClick(currentWeekIndex + 1)}
                disabled={currentWeekIndex === weekData.length - 1}
                className={`p-2 rounded-full transition-all ${
                  currentWeekIndex === weekData.length - 1
                    ? "opacity-30 cursor-not-allowed"
                    : "hover:bg-gray-100"
                }`}
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </section>
        </div>

        {/* --- Fixtures Section --- */}
        <div className="bg-[#F7F7F7] py-12 mt-12">
          <div className="px-4 sm:px-6 md:px-10">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6 w-full">
              <h2
                className="text-[28px] md:text-[40px] font-extrabold text-[#002060] uppercase tracking-tight"
                style={{ fontFamily: "ITC Machine Std, sans-serif" }}
              >
                Game Fixtures
              </h2>

              <div className="flex rounded-md overflow-hidden bg-[#C90F0F] shadow-lg">
                <button
                  onClick={() => handleDivisionClick("Men")}
                  className={`${segmentBaseStyle} ${
                    activeDivision === "Men"
                      ? segmentActiveStyle
                      : segmentInactiveStyle
                  }`}
                >
                  Men
                </button>
                <button
                  onClick={() => handleDivisionClick("Women")}
                  className={`${segmentBaseStyle} ${
                    activeDivision === "Women"
                      ? segmentActiveStyle
                      : segmentInactiveStyle
                  }`}
                >
                  Women
                </button>
              </div>
            </div>

            {/* --- Fixtures List --- */}
            {activeDivision === "Men" && (
              <section className="w-full bg-[#F7F7F7] py-6 sm:py-12">
                <div className="space-y-8 max-w-7xl mx-auto px-2 sm:px-4">
                  {matches.map((match, i) => (
                    <div
                      key={match._id}
                      className="bg-white rounded-lg shadow-lg overflow-hidden"
                    >
                      <div className="relative w-full mb-[5px]">
                        {/* Keep background image unchanged */}
                        <img
                          src="/m2.png"
                          alt={`Match Background ${i + 1}`}
                          className="w-full h-auto object-contain rounded-t-lg"
                        />
                        <img
                          src="/matchday2.png"
                          alt="Overlay Graphic"
                          className="absolute inset-0 w-full h-full object-contain opacity-80 pointer-events-none hidden sm:block"
                        />

                        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-2 sm:px-4 z-10">
                          <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 space-y-2 sm:space-y-0">
                      <img
  src={match.team1.logo.asset.url}
  alt={match.team1.name}
  className="team-logo"
/>
                         <h2
  className="text-white uppercase drop-shadow-lg text-center"
  style={{
    fontFamily: "ITC Machine Std, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "70px",
    lineHeight: "100%",
    letterSpacing: "0%",
  }}
>
  {match.team1.name} <span className="text-white">vs</span> {match.team2.name}
</h2>

                          <img
  src={match.team2.logo.asset.url}
  alt={match.team2.name}
  className="team-logo"
/>
                          </div>
                        </div>
                      </div>

                      <div
                        className="flex flex-col sm:flex-row justify-between items-start sm:items-end p-3 gap-3 sm:gap-0"
                        style={{
                          fontFamily: "DM Sans, sans-serif",
                          fontWeight: 700,
                        }}
                      >
                        <div className="text-left text-xs text-gray-700 font-semibold">
                          <p className="text-sm text-gray-900">
                            MATCH DAY {match.matchDay}
                          </p>
                        <p
  style={{
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "129%",
    letterSpacing: "0%",
  }}
>
  {match.date}
</p>
<p
  style={{
    fontFamily: "DM Sans, sans-serif",
    fontWeight: 700,
    fontStyle: "normal",
    fontSize: "18px",
    lineHeight: "129%",
    letterSpacing: "0%",
  }}
>
  {match.time}
</p>

                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                          <button
                            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-md text-white font-medium text-sm transition duration-300 w-full sm:w-auto"
                            style={{
                              backgroundColor: "#012752",
                              border: "1px solid #012752",
                            }}
                          >
                            <span>Get Ticket</span>
                          </button>

                          <button
                            className="flex items-center justify-center space-x-1 py-2 px-3 rounded-md font-medium text-sm transition duration-300 w-full sm:w-auto"
                            style={{
                              backgroundColor: "white",
                              color: "#012752",
                              border: "1px solid #012752",
                            }}
                          >
                            <span>Add to Calendar</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* --- Women's Fixtures --- */}
            {activeDivision === "Women" && (
              <div className="text-xl text-gray-600 font-medium">
                Displaying <b>Women's</b> fixtures for{" "}
                <b>{weekData[currentWeekIndex].week}</b>...
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
