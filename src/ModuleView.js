import React, { useEffect, useState } from 'react';
import { adminDB } from './api/firebase-admin-config';
import { ref, onValue } from "firebase/database";
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function ModuleView() {
  const [episodes, setEpisodes] = useState([]);
  let query = useQuery();
  let chapter = query.get("chapter");

  useEffect(() => {
    const chapterRef = ref(adminDB,'courses/' + chapter); // Adjust according to your Firebase data structure
    onValue(chapterRef, (snapshot) => {
      if (snapshot.exists()) {
        const episodesData = snapshot.val().episodes;
        // Assuming episodesData is an array with possible null values, filter out non-object entries.
        const filteredEpisodes = episodesData.filter(ep => ep !== null);
        setEpisodes(filteredEpisodes);
      } else {
        console.log("No data available");
      }
    });
  }, [chapter]); // Added chapter as a dependency to re-run this effect if chapter changes


  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Chapter</h2>
      </header>
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Chapter
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Topic
              </th>
            </tr>
          </thead>
        <tbody>
          {episodes.map((episode, index) => (
            <tr key={index}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {index + 1}
                </td>

              <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                <a href={`https://www.youtube.com/watch?v=${episode.videoID}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                {episode.title}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}

export default ModuleView;
