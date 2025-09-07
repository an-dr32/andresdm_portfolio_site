"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";

const games = [
    {
        id: 1,
        name: "Nuclear Chicken",
        description: "A fun and chaotic chicken game.",
        url: "https://an-dr32.github.io/nuclear_chicken_game/",
        color: "bg-gradient-to-br from-red-500 to-yellow-500",
    },
    {
        id: 2,
        name: "Quoridor",
        description: "Classic Quoridor board game.",
        url: "https://an-dr32.github.io/quoridor_game/",
        color: "bg-gradient-to-br from-blue-500 to-indigo-500",
    },
];

export default function GamesPage() {
    const [hoveredGame, setHoveredGame] = useState<number | null>(null);

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-6 lg:p-12 mt-16">
                <div className="max-w-4xl w-full">
                    {/* Hero Section */}
                    <div className="mb-12 lg:mb-16">
                        <div className="relative">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-2 lg:mb-6 leading-tight text-gray-900 dark:text-white">
                                Games
                            </h1>
                            <p className="text-lg lg:text-xl max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300">
                                Explore a collection of fun and engaging games designed to
                                entertain and challenge you.
                            </p>
                        </div>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {games.map((game) => (
                            <a
                                key={game.id}
                                href={game.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group cursor-pointer block"
                                onMouseEnter={() => setHoveredGame(game.id)}
                                onMouseLeave={() => setHoveredGame(null)}
                            >
                                {/* Game Card */}
                                <div
                                    className={`${game.color} rounded-2xl h-48 lg:h-64 mb-4 flex items-center justify-center transition-transform duration-300 ${hoveredGame === game.id ? "scale-105" : ""
                                        }`}
                                >
                                    <div className="text-white dark:text-white text-center p-6">
                                        <div className="w-12 h-12 bg-white/20 dark:bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                            <div className="w-6 h-6 bg-white rounded"></div>
                                        </div>
                                        <h3 className="text-lg font-semibold">{game.name}</h3>
                                    </div>
                                </div>

                                {/* Game Info */}
                                <div>
                                    <div className="flex items-center justify-between mb-1">
                                        <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                            {game.name}
                                        </h3>
                                    </div>
                                    <p className="text-sm leading-relaxed text-gray-500 dark:text-gray-400">
                                        {game.description}
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

