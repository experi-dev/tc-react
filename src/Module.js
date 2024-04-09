// src/Module.js
import React, { useEffect, useState } from 'react';
import { adminDB } from './api/firebase-admin-config';
import { ref, onValue } from "firebase/database";
import { Link } from 'react-router-dom';

function Module() {
  const [courses, setCourses] = useState({});

  useEffect(() => {
    const courseRef = ref(adminDB, "courses"); // Make sure the path matches your Firebase structure.
    onValue(courseRef, (snapshot) => {
      if (snapshot.exists()) {
        setCourses(snapshot.val());
        console.log(courses);
      } else {
        console.log("No data available");
      }
    });
  }, []); // Removed 'topic' from dependency array since it's not being used in the effect.

  // Convert courses object to an array for mapping
  const coursesArray = courses ? Object.entries(courses).map(([key, value]) => ({
    id: key,
    ...value
  })) : [];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <header className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Courses</h2>
      </header>

      {/* Table to display courses */}
      <div className="overflow-x-auto">
        <table className="min-w-full leading-normal">
          <thead>
            <tr>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Chapter
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Level
              </th>
              <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                Title
              </th>
            </tr>
          </thead>
          <tbody>
            {coursesArray.map((course, index) => (
              <tr key={course.id}>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {course.id}
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {/* Assuming 'course' object has a 'title' property */}
                  {course.accessLevel || "No Level"} 
                </td>
                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                  {/* Assuming 'course' object has a 'title' property */}
                  <Link to={"/module/view?chapter="+ course.id} className="text-indigo-600 hover:text-indigo-900">
                    {course.title || "No title"} 
                    </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Module;
