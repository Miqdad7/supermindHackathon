import React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Brain } from 'lucide-react';

const AccordionComponent = () => {
  const accordionStyles = {
    backgroundColor: 'transparent !important',
    backgroundImage: 'none !important',
    boxShadow: 'none',
    '&:before': {
      display: 'none',
    },
    '& .MuiAccordionSummary-root': {
      backgroundColor: 'transparent',
      padding: '0',
      minHeight: 'auto !important',
      '& .MuiAccordionSummary-content': {
        margin: '0 !important',
      },
    },
    '& .MuiAccordionDetails-root': {
      backgroundColor: 'transparent',
      padding: '0',
    },
  };

  return (
    <div className="p-4 md:p-6 mt-4 md:mt-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex items-center justify-center gap-2 mb-6 md:mb-12">
          <Brain className="w-5 h-5 md:w-6 md:h-6 text-teal-400" />
          <h2 className="text-xl md:text-2xl font-bold text-white text-center">Analysis Insights</h2>
        </div>

        <div className="mx-auto space-y-2 md:space-y-3">
          {/* State-specific save rates */}
          <Accordion sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2DD4BF' }} />}>
              <div className="w-full p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                <p className="text-sm md:text-base text-gray-400">
                  Analyzing state specific save rates and patterns
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-2 p-4 md:p-6 rounded-lg bg-white bg-opacity-[0.03] space-y-3 md:space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">Haryana leads with high save rates, particularly for #FestiveVibes carousel posts</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">Andaman & Nicobar Islands shows consistent save performance across post types</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">Assam, Jharkhand, and West Bengal demonstrate strong carousel post saves</span>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Content themes */}
          <Accordion sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2DD4BF' }} />}>
              <div className="w-full p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                <p className="text-sm md:text-base text-gray-400">
                  Popular content themes and save rates
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-2 p-4 md:p-6 rounded-lg bg-white bg-opacity-[0.03] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">#HiddenTreasures</p>
                    <p className="text-lg md:text-xl font-semibold text-white mt-1">High</p>
                    <p className="text-xs text-gray-500 mt-1">save rate</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">#CulturalJourney</p>
                    <p className="text-lg md:text-xl font-semibold text-white mt-1">High</p>
                    <p className="text-xs text-gray-500 mt-1">save rate</p>
                  </div>
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">#NatureLove</p>
                    <p className="text-lg md:text-xl font-semibold text-white mt-1">High</p>
                    <p className="text-xs text-gray-500 mt-1">save rate</p>
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-teal-400 bg-opacity-5 border border-teal-400 border-opacity-20">
                  <p className="text-xs md:text-sm text-teal-400">Carousel posts consistently show higher save rates across all themes, suggesting users prefer multi-image format for saving content.</p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Impression-to-reach ratio */}
          <Accordion sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2DD4BF' }} />}>
              <div className="w-full p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                <p className="text-sm md:text-base text-gray-400">
                  Impression-to-reach ratio analysis
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-2 p-4 md:p-6 rounded-lg bg-white bg-opacity-[0.03] space-y-4">
                <p className="text-sm md:text-base text-gray-300">Performance ranking by post type:</p>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { rank: 1, type: 'Reels', desc: 'Highest ratio & repeated views' },
                    { rank: 2, type: 'Carousel', desc: 'Moderate ratio' },
                    { rank: 3, type: 'Static', desc: 'Lowest ratio' }
                  ].map((item) => (
                    <div key={item.rank} className="flex justify-between items-center p-3 rounded-lg bg-white bg-opacity-[0.03]">
                      <div className="flex items-center gap-3">
                        <div className="text-teal-400 font-bold">{item.rank}</div>
                        <div>
                          <p className="text-sm md:text-base text-white">{item.type}</p>
                          <p className="text-xs md:text-sm text-gray-400">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Day of week impact */}
          <Accordion sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2DD4BF' }} />}>
              <div className="w-full p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                <p className="text-sm md:text-base text-gray-400">
                  Day of week impact on content reach
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-2 p-4 md:p-6 rounded-lg bg-white bg-opacity-[0.03] space-y-4">
                <p className="text-sm md:text-base text-gray-300">Key findings from the analysis:</p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">No significant correlation between specific days and post reach</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">Content quality and type have more impact than posting day</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-teal-400 mt-2"></div>
                    <span className="text-sm md:text-base text-gray-400">Audience engagement varies based on content relevance rather than timing</span>
                  </li>
                </ul>
              </div>
            </AccordionDetails>
          </Accordion>

          {/* Scenic content correlation */}
          <Accordion sx={accordionStyles}>
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#2DD4BF' }} />}>
              <div className="w-full p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                <p className="text-sm md:text-base text-gray-400">
                  Correlation between scenic content and save rates
                </p>
              </div>
            </AccordionSummary>
            <AccordionDetails>
              <div className="mt-2 p-4 md:p-6 rounded-lg bg-white bg-opacity-[0.03] space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">Nature</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-lg md:text-xl font-semibold text-white">High</p>
                      <p className="text-xs text-teal-400">saves</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">Sunsets</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-lg md:text-xl font-semibold text-white">High</p>
                      <p className="text-xs text-teal-400">saves</p>
                    </div>
                  </div>
                  <div className="p-3 md:p-4 rounded-lg bg-white bg-opacity-[0.03]">
                    <p className="text-sm text-gray-400">Beaches</p>
                    <div className="flex items-baseline gap-2 mt-1">
                      <p className="text-lg md:text-xl font-semibold text-white">High</p>
                      <p className="text-xs text-teal-400">saves</p>
                    </div>
                  </div>
                </div>
                <div className="p-3 md:p-4 rounded-lg bg-teal-400 bg-opacity-5 border border-teal-400 border-opacity-20">
                  <p className="text-xs md:text-sm text-teal-400">Note: While initial data suggests a positive correlation, more analysis is needed to confirm the strength of this relationship.</p>
                </div>
              </div>
            </AccordionDetails>
          </Accordion>
        </div>
      </div>
    </div>
  )
}

export default AccordionComponent;