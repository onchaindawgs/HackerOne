"use client";

import { Header, PageContainer, SectionContainer } from "@/components/layout";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, ChevronRight, Clock, Github, Globe, Mail, MessageCircle, Phone, Users } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { BackgroundGradient } from "@/components/shared";

const user = {
  personalInfo: {
    fullName: "Agul",
    email: "atul@gmail.com",
    phone: "+918958318394",
    profilePicture:
      "https://hackerone.exadrivecdn.com/profilePhoto/walletAddress/0x298e51b0b1e15e9d8ed37f5d6d27fa8a2a1286bd786a9b6d7941031225757061/Hackerone.png",
  },
  professionalDetails: {
    githubProfile: "https://github.com/atulbhatt-system32",
    twitterHandle: "",
    telegramUsername: "",
    personalWebsite: "",
  },
  skills: {
    primarySkills: "React",
    yearsOfExperience: 0,
    learningGoals: "",
  },
  preferences: {
    preferredRole: "Fe",
    availability: "Yes",
    preferredWorkStyle: "Small Team",
  },
  devScore: 150,
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};
export default function page() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <PageContainer header={<Header />}>
      <SectionContainer>
        <BackgroundGradient className="rounded-lg">
          <motion.div
            className="w-full max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className="overflow-hidden rounded-lg shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <motion.div className="flex flex-col gap-8 lg:flex-row lg:gap-12" variants={itemVariants}>
                  <div className="flex flex-col items-center text-center lg:w-1/3">
                    <motion.div
                      className="relative w-48 h-48 mb-6 overflow-hidden border-4 border-purple-200 rounded-full shadow-lg sm:w-64 sm:h-64"
                      whileHover={{ scale: 1.05 }}
                      onHoverStart={() => setIsHovered(true)}
                      onHoverEnd={() => setIsHovered(false)}
                    >
                      <Image
                        src={user.personalInfo.profilePicture}
                        alt={user.personalInfo.fullName}
                        layout="fill"
                        objectFit="cover"
                      />
                    </motion.div>
                    <motion.h1 className="mb-3 text-3xl font-bold text-gray-800 sm:text-4xl" variants={itemVariants}>
                      {user.personalInfo.fullName}
                    </motion.h1>
                    <motion.p className="mb-6 text-xl text-gray-600" variants={itemVariants}>
                      {user.preferences.preferredRole} Developer
                    </motion.p>
                    <motion.div className="flex flex-wrap justify-center gap-3 mb-6" variants={itemVariants}>
                      <Badge variant="secondary" className="px-3 py-1 text-base text-white bg-purple-500 sm:text-lg">
                        React
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-1 text-base text-white bg-pink-500 sm:text-lg">
                        Frontend
                      </Badge>
                      <Badge variant="secondary" className="px-3 py-1 text-base text-white bg-red-500 sm:text-lg">
                        Small Team
                      </Badge>
                    </motion.div>
                    <motion.div variants={itemVariants}>
                      <Button className="px-4 py-2 text-lg text-white bg-purple-600 hover:bg-purple-700 sm:py-3 sm:px-6">
                        <MessageCircle className="w-5 h-5 mr-2" />
                        Contact Me
                      </Button>
                    </motion.div>
                  </div>
                  <div className="space-y-6 lg:w-2/3 sm:space-y-8">
                    <motion.div className="grid grid-cols-1 gap-6 md:grid-cols-2 sm:gap-8" variants={containerVariants}>
                      <motion.section variants={itemVariants} className="p-4 rounded-lg bg-gray-50 sm:p-6">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                          <Mail className="w-6 h-6 mr-3 text-purple-500" />
                          Contact Information
                        </h3>
                        <p className="flex items-center mb-2 text-base text-gray-600 sm:text-lg">
                          <Mail className="w-5 h-5 mr-2 text-gray-400" />
                          {user.personalInfo.email}
                        </p>
                        <p className="flex items-center text-base text-gray-600 sm:text-lg">
                          <Phone className="w-5 h-5 mr-2 text-gray-400" />
                          {user.personalInfo.phone}
                        </p>
                      </motion.section>
                      <motion.section variants={itemVariants} className="p-4 rounded-lg bg-gray-50 sm:p-6">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                          <Github className="w-6 h-6 mr-3 text-purple-500" />
                          Professional Details
                        </h3>
                        <a
                          href={user.professionalDetails.githubProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center mb-2 text-base text-purple-600 hover:underline sm:text-lg"
                        >
                          <Github className="w-5 h-5 mr-2" />
                          GitHub Profile
                          <ChevronRight className="w-4 h-4 ml-1" />
                        </a>
                        {user.professionalDetails.personalWebsite && (
                          <a
                            href={user.professionalDetails.personalWebsite}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center text-base text-purple-600 hover:underline sm:text-lg"
                          >
                            <Globe className="w-5 h-5 mr-2" />
                            Personal Website
                            <ChevronRight className="w-4 h-4 ml-1" />
                          </a>
                        )}
                      </motion.section>
                      <motion.section variants={itemVariants} className="p-4 rounded-lg bg-gray-50 sm:p-6">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                          <Briefcase className="w-6 h-6 mr-3 text-purple-500" />
                          Skills & Experience
                        </h3>
                        <p className="mb-2 text-base text-gray-600 sm:text-lg">
                          Primary Skills: {user.skills.primarySkills}
                        </p>
                        <p className="text-base text-gray-600 sm:text-lg">
                          Years of Experience: {user.skills.yearsOfExperience}
                        </p>
                      </motion.section>
                      <motion.section variants={itemVariants} className="p-4 rounded-lg bg-gray-50 sm:p-6">
                        <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                          <Users className="w-6 h-6 mr-3 text-purple-500" />
                          Preferences
                        </h3>
                        <p className="mb-2 text-base text-gray-600 sm:text-lg">
                          Preferred Role: {user.preferences.preferredRole}
                        </p>
                        <p className="mb-2 text-base text-gray-600 sm:text-lg">
                          Availability: {user.preferences.availability}
                        </p>
                        <p className="text-base text-gray-600 sm:text-lg">
                          Preferred Work Style: {user.preferences.preferredWorkStyle}
                        </p>
                      </motion.section>
                    </motion.div>
                    <motion.div variants={itemVariants} className="p-4 rounded-lg bg-gray-50 sm:p-6">
                      <h3 className="flex items-center mb-4 text-xl font-semibold text-gray-800 sm:text-2xl">
                        <Clock className="w-6 h-6 mr-3 text-purple-500" />
                        Dev Score
                      </h3>
                      <div className="h-4 overflow-hidden bg-gray-200 rounded-full sm:h-6">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-purple-400 to-pink-500"
                          initial={{ width: 0 }}
                          animate={{ width: `${(user.devScore / 200) * 100}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                      <p className="mt-3 text-lg font-semibold text-center text-gray-800 sm:text-xl">
                        {user.devScore} / 200
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </BackgroundGradient>
      </SectionContainer>
    </PageContainer>
  );
}
