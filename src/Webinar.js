import React, { useEffect, useState } from 'react';
import { adminDB } from './api/firebase-admin-config';
import { ref, onValue } from "firebase/database";

function Webinar() {
  const [topic, setTopic] = useState("Inner Circle Training");
  const [meetingReplay, setMeetingReplay] = useState({});

  useEffect(() => {
    const meetingRef = ref(adminDB, `/meetingReplays/${topic}`);
    
    onValue(meetingRef, (snapshot) => {
      if (snapshot.exists()) {
        setMeetingReplay(snapshot.val());
      } else {
        console.log("No data available");
      }
    });
  }, [topic]);

  // Helper function to sort meeting replays by date in descending order
  const sortedMeetingReplays = () => {
    return Object.entries(meetingReplay).sort((a, b) => new Date(b[0]) - new Date(a[0]));
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Meeting Replay Details for {topic}</h2>
        <select 
          className="block w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          value={topic} 
          onChange={(e) => setTopic(e.target.value)}
        >
          <option value="Basic Forex Training">Standard</option>
          <option value="Advanced Training">Elite</option>
          <option value="Inner Circle Training">Inner Circle</option>
          <option value="Weekend Planning">Weekend Planning - Elite</option>
        </select>
      </header>

      {/* Table to display YouTube links */}
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Date
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Video Link
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedMeetingReplays().map(([date, videoId]) => (
              <tr key={date}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {date}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-900">
                    Watch Video
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

export default Webinar;
