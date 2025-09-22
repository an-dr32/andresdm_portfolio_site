"use client";

import React, { useState, useEffect } from "react";
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
import { Grid3X3, Grid2X2, Square } from "lucide-react";

interface Illustration {
    name: string;
    path: string;
    category: string;
}

interface IllustrationCategory {
    name: string;
    illustrations: Illustration[];
}

export default function IllustrationsPage() {
    const [categories, setCategories] = useState<IllustrationCategory[]>([]);
    const [selectedIllustration, setSelectedIllustration] = useState<Illustration | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [carouselApi, setCarouselApi] = useState<any>(null);
    const [hoveredIllustration, setHoveredIllustration] = useState<string | null>(null);
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');

    // Load illustrations dynamically
    useEffect(() => {
        const loadIllustrations = async () => {
            try {
                // This would typically be an API call to get the folder structure
                // For now, we'll use a static list based on what we see in the folder
                const illustrationCategories: IllustrationCategory[] = [
                    {
                        name: "AI Illustration",
                        illustrations: [
                            { name: "Golden Tree.JPG", path: "/imgs/illustrations/AI Illustration/Golden Tree.JPG", category: "AI Illustration" },
                            { name: "Money.JPG", path: "/imgs/illustrations/AI Illustration/Money.JPG", category: "AI Illustration" },
                            { name: "Soldier.png", path: "/imgs/illustrations/AI Illustration/Soldier.png", category: "AI Illustration" }
                        ]
                    },
                    {
                        name: "AI Portraits",
                        illustrations: [
                            { name: "Andres Demonstantine.png", path: "/imgs/illustrations/AI Portraits/Andres Demonstantine.png", category: "AI Portraits" },
                            { name: "Andres Grimes.png", path: "/imgs/illustrations/AI Portraits/Andres Grimes.png", category: "AI Portraits" },
                            { name: "Bond, Andres Bond.png", path: "/imgs/illustrations/AI Portraits/Bond, Andres Bond.png", category: "AI Portraits" },
                            { name: "Bond, Andres Bond (alt).png", path: "/imgs/illustrations/AI Portraits/Bond, Andres Bond (alt).png", category: "AI Portraits" },
                            { name: "Colonel A.F De Moya.png", path: "/imgs/illustrations/AI Portraits/Colonel A.F De Moya.png", category: "AI Portraits" },
                            { name: "Counter Strike.png", path: "/imgs/illustrations/AI Portraits/Counter Strike.png", category: "AI Portraits" },
                            { name: "Doctor Demo.png", path: "/imgs/illustrations/AI Portraits/Doctor Demo.png", category: "AI Portraits" },
                            { name: "Don Andres Fernando De Las Moyas y Mugnos.png", path: "/imgs/illustrations/AI Portraits/Don Andres Fernando De Las Moyas y Mugnos.png", category: "AI Portraits" },
                            { name: "General De Moya.png", path: "/imgs/illustrations/AI Portraits/General De Moya.png", category: "AI Portraits" },
                            { name: "General De Moya2.png", path: "/imgs/illustrations/AI Portraits/General De Moya2.png", category: "AI Portraits" },
                            { name: "Mezoamerican Dictator.png", path: "/imgs/illustrations/AI Portraits/Mezoamerican Dictator.png", category: "AI Portraits" },
                            { name: "Mr Robot.png", path: "/imgs/illustrations/AI Portraits/Mr Robot.png", category: "AI Portraits" },
                            { name: "My President.png", path: "/imgs/illustrations/AI Portraits/My President.png", category: "AI Portraits" }
                        ]
                    },
                    {
                        name: "Bauhaus",
                        illustrations: [
                            { name: "Bauhaus_1.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_1.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_2.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_2.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_3.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_3.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_4.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_4.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_5.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_5.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_6.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_6.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_7.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_7.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_8.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_8.jpg", category: "Bauhaus" },
                            { name: "Bauhaus_9.jpg", path: "/imgs/illustrations/Bauhaus/Bauhaus_9.jpg", category: "Bauhaus" }
                        ]
                    },
                    {
                        name: "Creative Mornings",
                        illustrations: [
                            { name: "Alista.png", path: "/imgs/illustrations/Creative Mornings/Alista.png", category: "Creative Mornings" },
                            { name: "aura.jpg", path: "/imgs/illustrations/Creative Mornings/aura.jpg", category: "Creative Mornings" },
                            { name: "dare.png", path: "/imgs/illustrations/Creative Mornings/dare.png", category: "Creative Mornings" },
                            { name: "design.png", path: "/imgs/illustrations/Creative Mornings/design.png", category: "Creative Mornings" },
                            { name: "Em.jpg", path: "/imgs/illustrations/Creative Mornings/Em.jpg", category: "Creative Mornings" },
                            { name: "Home.png", path: "/imgs/illustrations/Creative Mornings/Home.png", category: "Creative Mornings" },
                            { name: "Invisible.png", path: "/imgs/illustrations/Creative Mornings/Invisible.png", category: "Creative Mornings" },
                            { name: "liminal.png", path: "/imgs/illustrations/Creative Mornings/liminal.png", category: "Creative Mornings" },
                            { name: "Love.jpeg", path: "/imgs/illustrations/Creative Mornings/Love.jpeg", category: "Creative Mornings" },
                            { name: "Matriarcado.png", path: "/imgs/illustrations/Creative Mornings/Matriarcado.png", category: "Creative Mornings" },
                            { name: "procrastination.png", path: "/imgs/illustrations/Creative Mornings/procrastination.png", category: "Creative Mornings" },
                            { name: "release.png", path: "/imgs/illustrations/Creative Mornings/release.png", category: "Creative Mornings" },
                            { name: "taza.png", path: "/imgs/illustrations/Creative Mornings/taza.png", category: "Creative Mornings" },
                            { name: "taza2.png", path: "/imgs/illustrations/Creative Mornings/taza2.png", category: "Creative Mornings" }
                        ]
                    },
                    {
                        name: "Photoshop",
                        illustrations: [
                            { name: "Generations.jpg", path: "/imgs/illustrations/Photoshop/Generations.jpg", category: "Photoshop" },
                            { name: "Messi.PNG", path: "/imgs/illustrations/Photoshop/Messi.PNG", category: "Photoshop" }
                        ]
                    }
                ];
                setCategories(illustrationCategories);
            } catch (error) {
                console.error("Error loading illustrations:", error);
            }
        };

        loadIllustrations();
    }, []);

    const handleIllustrationClick = (illustration: Illustration) => {
        setSelectedIllustration(illustration);
        setIsModalOpen(true);
        // Reset carousel to first slide when modal opens
        setTimeout(() => {
            if (carouselApi) {
                carouselApi.scrollTo(0);
            }
        }, 100);
    };

    return (
        <div className="flex min-h-screen bg-white dark:bg-gray-900">
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 lg:ml-64 p-6 lg:p-12 mt-16">
                <div className="max-w-6xl w-full">
                    {/* Hero Section */}
                    <div className="mb-12 lg:mb-16">
                        <div className="relative">
                            <h1 className="text-4xl lg:text-6xl font-bold mb-2 lg:mb-6 leading-tight text-gray-900 dark:text-white">
                                Illustrations
                            </h1>
                            <p className="text-lg lg:text-xl max-w-2xl leading-relaxed text-gray-600 dark:text-gray-300 mb-8">
                                A collection of my creative illustrations and digital art across different styles and themes.
                            </p>

                            {/* Grid Size Controls */}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Grid size:</span>
                                <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
                                    <button
                                        onClick={() => setGridSize('small')}
                                        className={`p-2 rounded-md transition-colors ${gridSize === 'small'
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        title="Small grid"
                                    >
                                        <Grid3X3 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setGridSize('medium')}
                                        className={`p-2 rounded-md transition-colors ${gridSize === 'medium'
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        title="Medium grid"
                                    >
                                        <Grid2X2 size={16} />
                                    </button>
                                    <button
                                        onClick={() => setGridSize('large')}
                                        className={`p-2 rounded-md transition-colors ${gridSize === 'large'
                                            ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm'
                                            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                                            }`}
                                        title="Large grid"
                                    >
                                        <Square size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Categories */}
                    {categories.map((category) => (
                        <div key={category.name} className="mb-16">
                            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-8">
                                {category.name}
                            </h2>

                            {/* Illustrations Grid */}
                            <div className={`grid gap-4 lg:gap-6 ${gridSize === 'small'
                                ? 'grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'
                                : gridSize === 'medium'
                                    ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                                    : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                                }`}>
                                {category.illustrations.map((illustration) => (
                                    <div
                                        key={`${illustration.category}-${illustration.name}`}
                                        className="group cursor-pointer"
                                        onMouseEnter={() => setHoveredIllustration(`${illustration.category}-${illustration.name}`)}
                                        onMouseLeave={() => setHoveredIllustration(null)}
                                        onClick={() => handleIllustrationClick(illustration)}
                                    >
                                        {/* Illustration Card */}
                                        <div className="relative aspect-square bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden transition-transform duration-300 hover:scale-105">
                                            <img
                                                src={illustration.path}
                                                alt={illustration.name}
                                                className="w-full h-full object-cover"
                                                onError={(e) => {
                                                    // Fallback: show placeholder
                                                    (e.currentTarget as HTMLImageElement).style.display = 'none';
                                                    (e.currentTarget as HTMLImageElement).nextElementSibling?.classList.remove('hidden');
                                                }}
                                            />
                                            <div className="hidden absolute inset-0 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                                                <div className="text-gray-500 dark:text-gray-400 text-center p-4">
                                                    <div className="w-8 h-8 bg-gray-300 dark:bg-gray-600 rounded mx-auto mb-2"></div>
                                                    <span className="text-xs">Image</span>
                                                </div>
                                            </div>

                                            {/* Overlay on hover */}
                                            <div className={`absolute inset-0 bg-black/40 flex items-center justify-center transition-opacity duration-300 ${hoveredIllustration === `${illustration.category}-${illustration.name}` ? 'opacity-100' : 'opacity-0'
                                                }`}>
                                                <div className="text-white text-center p-2">
                                                    <div className="w-6 h-6 bg-white/20 rounded mx-auto mb-2 flex items-center justify-center">
                                                        <div className="w-3 h-3 bg-white rounded"></div>
                                                    </div>
                                                    <span className="text-sm font-medium">View</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Illustration Name */}
                                        <div className="mt-3">
                                            <p className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                                                {illustration.name.replace(/\.[^/.]+$/, "")}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Illustration Modal */}
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogContent className="w-auto max-w-[95vw] bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-0 overflow-hidden">
                    <DialogHeader className="p-6 pb-0">
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedIllustration?.name.replace(/\.[^/.]+$/, "")}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            {selectedIllustration?.category}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedIllustration && (
                        <div className="p-6 pt-4 space-y-4">
                            {/* Illustration Image */}
                            <div className="relative">
                                <div className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-auto flex items-center justify-center p-4">
                                    <img
                                        src={selectedIllustration.path}
                                        alt={selectedIllustration.name}
                                        className="object-contain"
                                        style={{ maxWidth: '95vw', maxHeight: '75vh' }}
                                    />
                                </div>
                            </div>

                            {/* Illustration Info */}
                            <Card>
                                <CardContent className="p-4">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                            {selectedIllustration.name.replace(/\.[^/.]+$/, "")}
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Category: {selectedIllustration.category}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
