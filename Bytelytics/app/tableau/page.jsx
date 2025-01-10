"use client"; // Ensures this component runs only on the client in Next.js

import React, { useEffect, useRef } from "react";

const TableauDashboard = () => {
    const vizUrl = "https://public.tableau.com/views/SuperMined/Dashboard1";

    return (
        <div className="w-full min-h-screen">
            <iframe
                src={`${vizUrl}?:showVizHome=no&:embed=true&:toolbar=yes&:animate_transition=yes`}
                // style={{ width: "100%", height: "100%", border: "none" }}
                className="min-h-screen w-full border-none"
                allowFullScreen
                title="Tableau Dashboard"
            ></iframe>
        </div >
    );
};

export default TableauDashboard;