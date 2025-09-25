"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

const games = [
    {
        id: 1,
        name: "Nuclear Chicken",
        description: "A fun and chaotic chicken game.",
        detailedDescription: "Nuclear Chicken is an exciting and chaotic action game where you control a radioactive chicken navigating through dangerous environments. Dodge obstacles, collect power-ups, and survive as long as possible in this fast-paced adventure. Features vibrant graphics, challenging gameplay, and endless entertainment for players of all ages.",
        image: "/imgs/chicken/banner (edited).png",
        images: [
            "/imgs/chicken/banner (edited).png",
            "/imgs/chicken/Front Cover (edited-enhanced).png",
            "/imgs/chicken/Back Cover (edited - enhanced).png",
            "/imgs/chicken/Screenshot 2025-05-29 at 11.31.29 AM.png",
            "/imgs/chicken/video.gif",
        ],
        url: "https://an-dr32.github.io/nuclear_chicken_game/",
        color: "bg-gradient-to-br from-red-500 to-yellow-500",
    },
    {
        id: 2,
        name: "Quoridor",
        description: "Classic Quoridor board game.",
        detailedDescription: "Quoridor is a strategic board game where players compete to be the first to reach the opposite side of the board. Use walls to block your opponent's path while finding the shortest route to victory. This digital adaptation brings the classic strategy game to life with smooth gameplay, intuitive controls, and the ability to play against AI or friends.",
        image: "/imgs/quoridor/logo (enhanced).png",
        images: [
            "/imgs/quoridor/logo (enhanced).png",
            "/imgs/quoridor/front (enhanced).png",
            "/imgs/quoridor/video.gif",
        ],
        url: "https://an-dr32.github.io/quoridor_game/",
        color: "bg-gradient-to-br from-blue-500 to-indigo-500",
    },
    {
        id: 3,
        name: "Koi No Yokan",
        description: "A dark, surreal adventure game made for Caribe Game Jam 2025.",
        detailedDescription: "Koi No Yokan is a haunting 3D adventure game created for Caribe Game Jam 2025, where I served as Game Designer, Game Developer, and Tech Lead. Developed entirely solo in less than 48 hours, this Unity-based experience follows a desperate diver who makes a dark pact with a demon. As the journey progresses, players witness their world transform under the weight of the agreement, unaware of the true price that must be paid. Features low-poly 3D graphics, surreal environments, and atmospheric storytelling. Use WASD to move and SHIFT to sprint through this creepy, short-form adventure.",
        image: "/api/placeholder/400/300",
        images: [
            "/imgs/kny/kny_001.png",
            "/imgs/kny/kny_002.png",
            "/imgs/kny/kny_003.png",
            "/imgs/kny/kny_004.png",
            "/imgs/kny/kny_005.png",
            "/imgs/kny/kny_006.png",
            "/imgs/kny/kny_007.png",
        ],
        url: "https://an-dr32.itch.io/koi-no-yokan",
        color: "bg-gradient-to-br from-purple-600 to-indigo-800",
    },
];

export default function GamesPage() {
    const [hoveredGame, setHoveredGame] = useState<number | null>(null);
    const [selectedGame, setSelectedGame] = useState<typeof games[0] | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carouselApi, setCarouselApi] = useState<any>(null);

    const handleGameClick = (game: typeof games[0]) => {
        setSelectedGame(game);
        setIsModalOpen(true);
        // Reset carousel to first slide when modal opens
        setTimeout(() => {
            if (carouselApi) {
                carouselApi.scrollTo(0);
            }
        }, 100);
    };

    const handlePlayGame = (url: string) => {
        window.open(url, '_blank', 'noopener,noreferrer');
    };

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
                                Explore a collection of fun and engaging games I designed and developed to
                                entertain and challenge you.
                            </p>
                        </div>
                    </div>

                    {/* Games Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                        {games.map((game) => (
                            <div
                                key={game.id}
                                className="group cursor-pointer block"
                                onMouseEnter={() => setHoveredGame(game.id)}
                                onMouseLeave={() => setHoveredGame(null)}
                                onClick={() => handleGameClick(game)}
                            >
                                {/* Game Card */}
                                <div
                                    className={`${game.color} rounded-2xl h-48 lg:h-64 mb-4 flex items-center justify-center transition-transform duration-300 ${hoveredGame === game.id ? "scale-105" : ""
                                        }`}
                                >
                                    {game.images && game.images.length > 0 ? (
                                        <div className="relative w-full h-full rounded-2xl overflow-hidden">
                                            <img
                                                src={game.images[0]}
                                                alt={game.name}
                                                className={`${game.id === 1
                                                    ? 'w-full h-full object-contain p-4 bg-transparent'
                                                    : game.id === 2
                                                        ? 'w-full h-full object-contain p-4 bg-[#03000B]'
                                                        : 'w-full h-full object-cover'
                                                    }`}
                                            />
                                            <div className={`absolute inset-0 ${game.id === 1 || game.id === 2 ? 'bg-black/30' : 'bg-black/40'} flex items-center justify-center`}>
                                                <div className="text-white text-center p-6">
                                                    <div className="w-12 h-12 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                        <div className="w-6 h-6 bg-white rounded"></div>
                                                    </div>
                                                    <h3 className="text-lg font-semibold">{game.name}</h3>
                                                </div>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="text-white dark:text-white text-center p-6">
                                            <div className="w-12 h-12 bg-white/20 dark:bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                <div className="w-6 h-6 bg-white rounded"></div>
                                            </div>
                                            <h3 className="text-lg font-semibold">{game.name}</h3>
                                        </div>
                                    )}
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
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Game Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="max-w-2xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 max-h-[85dvh] overflow-y-auto sm:max-h-none sm:overflow-visible">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedGame?.name}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            {selectedGame?.description}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedGame && (
                        <div className="space-y-6">
                            {/* Game Image/Carousel */}
                            <div className="relative">
                                {selectedGame.images && selectedGame.images.length > 1 ? (
                                    <Carousel
                                        setApi={setCarouselApi}
                                        className="w-full"
                                        opts={{
                                            align: "start",
                                            loop: true,
                                        }}
                                    >
                                        <CarouselContent>
                                            {selectedGame.images.map((image, index) => (
                                                <CarouselItem key={index}>
                                                    <div className="relative">
                                                        <img
                                                            src={image}
                                                            alt={`${selectedGame.name} screenshot ${index + 1}`}
                                                            className="w-full h-48 lg:h-64 object-contain rounded-xl bg-gray-100 dark:bg-gray-800"
                                                        />
                                                    </div>
                                                </CarouselItem>
                                            ))}
                                        </CarouselContent>
                                        <CarouselPrevious className="left-2" />
                                        <CarouselNext className="right-2" />
                                    </Carousel>
                                ) : (
                                    <div className={`${selectedGame.color} rounded-xl h-48 lg:h-64 flex items-center justify-center`}>
                                        <div className="text-white text-center p-6">
                                            <div className="w-16 h-16 bg-white/20 rounded-lg mx-auto mb-4 flex items-center justify-center">
                                                <div className="w-8 h-8 bg-white rounded"></div>
                                            </div>
                                            <h3 className="text-xl font-semibold">{selectedGame.name}</h3>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Game Description */}
                            <Card>
                                <CardContent className="p-6">
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {selectedGame.detailedDescription}
                                    </p>
                                </CardContent>
                            </Card>

                            {/* Play Button */}
                            <div className="flex justify-center">
                                <Button
                                    onClick={() => handlePlayGame(selectedGame.url)}
                                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-semibold rounded-lg transition-colors duration-200"
                                >
                                    Play Game
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

