import React from "react";
import { motion } from "framer-motion";
import { FaBriefcase, FaMapMarkerAlt, FaClock } from "react-icons/fa";

const careersData = [
  {
    id: 1,
    title: "Frontend Developer",
    location: "Lahore, Pakistan",
    type: "Full-Time",
    description:
      "We are looking for a passionate React.js developer to join our dynamic frontend team.",
  },
  {
    id: 2,
    title: "Backend Developer",
    location: "Karachi, Pakistan",
    type: "Remote",
    description:
      "Join our backend team to build scalable APIs using Node.js and modern frameworks.",
  },
  {
    id: 3,
    title: "UI/UX Designer",
    location: "Islamabad, Pakistan",
    type: "Internship",
    description:
      "If you love designing smooth, elegant user experiences — this role is for you!",
  },
];

const CareersPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-400 to-black text-white flex flex-col items-center py-16 px-4">
      {/* Header Section */}
      <motion.h1
        className="text-4xl sm:text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Join Our <span className="text-yellow-300">Creative Team</span>
      </motion.h1>

      <motion.p
        className="text-center text-gray-200 max-w-2xl mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        We’re always on the lookout for talented individuals who want to make an
        impact. Explore our current openings below.
      </motion.p>

      {/* Career Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
        {careersData.map((job, index) => (
          <motion.div
            key={job.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-yellow-300/30 hover:scale-105 transition-transform duration-300"
          >
            <h2 className="text-xl font-semibold mb-2">{job.title}</h2>
            <p className="text-gray-300 text-sm mb-4">{job.description}</p>

            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-200 gap-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt className="text-yellow-300" />
                {job.location}
              </div>
              <div className="flex items-center gap-2">
                <FaClock className="text-yellow-300" />
                {job.type}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 w-full bg-yellow-400 text-black font-semibold py-2 rounded-lg hover:bg-yellow-300 transition"
            >
              Apply Now
            </motion.button>
          </motion.div>
        ))}
      </div>

      {/* Footer CTA */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <p className="text-gray-300 mb-4">Didn’t find a suitable position?</p>
        <button className="bg-white text-black px-6 py-2 rounded-lg font-semibold hover:bg-yellow-200 transition">
          Send Your Resume
        </button>
      </motion.div>
    </div>
  );
};

export default CareersPage;
