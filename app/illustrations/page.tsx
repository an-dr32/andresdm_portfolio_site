"use client";

import React, { useState, useEffect } from "react";
import Image from 'next/image';
import Sidebar from "@/components/sidebar";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog";
 
import { Grid3X3, Grid2X2, Square, X, ChevronLeft, ChevronRight } from "lucide-react";

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
    const [hoveredIllustration, setHoveredIllustration] = useState<string | null>(null);
    const [gridSize, setGridSize] = useState<'small' | 'medium' | 'large'>('medium');
    const [touchStartX, setTouchStartX] = useState<number | null>(null);
    const [touchDeltaX, setTouchDeltaX] = useState<number>(0);

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
                            { name: "Don Andres De Las Moyas.png", path: "/imgs/illustrations/AI Portraits/Don Andres De Las Moyas.png", category: "AI Portraits" },
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
    };

    // Helpers to navigate across ALL images (all categories flattened)
    const getFlatList = (): Illustration[] => {
        return categories.flatMap((c) => c.illustrations);
    };

    const getCurrentIndex = () => {
        const list = getFlatList();
        if (!selectedIllustration) return -1;
        return list.findIndex((i) => i.path === selectedIllustration.path);
    };

    const goNext = () => {
        const list = getFlatList();
        if (list.length === 0) return;
        const idx = getCurrentIndex();
        const next = idx === -1 ? 0 : (idx + 1) % list.length;
        setSelectedIllustration(list[next]);
    };

    const goPrev = () => {
        const list = getFlatList();
        if (list.length === 0) return;
        const idx = getCurrentIndex();
        const prev = idx === -1 ? list.length - 1 : (idx - 1 + list.length) % list.length;
        setSelectedIllustration(list[prev]);
    };

    // Touch/swipe handlers
    const SWIPE_THRESHOLD = 50; // px
    const handleTouchStart = (e: React.TouchEvent) => {
        setTouchStartX(e.touches[0].clientX);
        setTouchDeltaX(0);
    };
    const handleTouchMove = (e: React.TouchEvent) => {
        if (touchStartX == null) return;
        const currentX = e.touches[0].clientX;
        setTouchDeltaX(currentX - touchStartX);
    };
    const handleTouchEnd = () => {
        if (Math.abs(touchDeltaX) > SWIPE_THRESHOLD) {
            if (touchDeltaX < 0) {
                goNext();
            } else {
                goPrev();
            }
        }
        setTouchStartX(null);
        setTouchDeltaX(0);
    };

    // Keyboard navigation when modal is open
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (!isModalOpen) return;
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                goNext();
            } else if (e.key === 'ArrowLeft') {
                e.preventDefault();
                goPrev();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [isModalOpen, selectedIllustration, categories]);

    // Preload next/prev images once a selection is made (improves perceived speed on mobile)
    useEffect(() => {
        if (!selectedIllustration) return;
        const list = categories.flatMap((c) => c.illustrations);
        if (list.length === 0) return;
        const idx = list.findIndex((i) => i.path === selectedIllustration.path);
        const nextIdx = idx === -1 ? -1 : (idx + 1) % list.length;
        const prevIdx = idx === -1 ? -1 : (idx - 1 + list.length) % list.length;
        const pathsToPreload = [nextIdx, prevIdx]
            .filter((i) => i !== -1)
            .map((i) => list[i].path);
        pathsToPreload.forEach((src) => {
            const img = new window.Image();
            img.src = src;
        });
    }, [selectedIllustration, categories]);

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
                                            <Image
                                                src={illustration.path}
                                                alt={illustration.name}
                                                fill
                                                className="object-cover"
                                                sizes="(min-width: 1280px) 12.5vw, (min-width: 1024px) 20vw, (min-width: 768px) 25vw, 33vw"
                                                placeholder="empty"
                                                priority={false}
                                                onError={() => {/* fallback handled by hidden div below */}}
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
                <DialogContent hideClose className="w-[100vw] max-w-[100vw] sm:w-auto sm:max-w-[95vw] lg:max-w-3xl xl:max-w-4xl bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700 p-0 max-h-[100dvh] sm:max-h-[90vh] overflow-y-auto rounded-none sm:rounded-xl">

                    {/* Sticky header for title/description with safe-area padding */}
                    <DialogHeader
                        className="sticky top-0 z-20 bg-white/80 dark:bg-gray-900/80 backdrop-blur supports-[backdrop-filter]:backdrop-blur p-4 pt-[calc(1rem+env(safe-area-inset-top))] pb-3 border-b border-gray-200 dark:border-gray-800"
                    >
                        <DialogClose asChild>
                            <button
                                aria-label="Close"
                                className="absolute right-3 top-3 sm:right-4 sm:top-4 inline-flex h-9 w-9 items-center justify-center rounded-md bg-black/50 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                                style={{
                                    insetInlineEnd: 'max(0.75rem, env(safe-area-inset-right))',
                                    insetBlockStart: 'max(0.75rem, env(safe-area-inset-top))',
                                }}
                            >
                                <X size={18} />
                            </button>
                        </DialogClose>
                        <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                            {selectedIllustration?.name.replace(/\.[^/.]+$/, "")}
                        </DialogTitle>
                        <DialogDescription className="text-gray-600 dark:text-gray-300">
                            {selectedIllustration?.category}
                        </DialogDescription>
                    </DialogHeader>

                    {selectedIllustration && (
                        <div className="p-4 sm:p-6 pt-4 space-y-4 pb-[calc(1rem+env(safe-area-inset-bottom))]">
                            {/* Illustration Image */}
                            <div className="relative">
                                <div
                                    className="bg-gray-100 dark:bg-gray-800 rounded-xl overflow-hidden flex items-center justify-center p-0 sm:p-2"
                                    onTouchStart={handleTouchStart}
                                    onTouchMove={handleTouchMove}
                                    onTouchEnd={handleTouchEnd}
                                >
                                    <div className="relative w-full" style={{ height: '70dvh' }}>
                                        <Image
                                            src={selectedIllustration.path}
                                            alt={selectedIllustration.name}
                                            fill
                                            className="object-contain select-none"
                                            sizes="100vw"
                                            priority
                                            draggable={false}
                                            style={{ transform: `translateX(${touchStartX !== null ? touchDeltaX * 0.1 : 0}px)` }}
                                        />
                                    </div>
                                    {/* Left/Right navigation buttons */}
                                    <button
                                        type="button"
                                        aria-label="Previous"
                                        onClick={goPrev}
                                        className="absolute left-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                                    >
                                        <ChevronLeft className="h-5 w-5" />
                                    </button>
                                    <button
                                        type="button"
                                        aria-label="Next"
                                        onClick={goNext}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 z-10 inline-flex items-center justify-center h-10 w-10 rounded-full bg-black/50 text-white hover:bg-black/60 focus:outline-none focus:ring-2 focus:ring-white dark:bg-white/20 dark:text-white dark:hover:bg-white/30"
                                    >
                                        <ChevronRight className="h-5 w-5" />
                                    </button>
                                </div>
                            </div>

                            {null}
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
