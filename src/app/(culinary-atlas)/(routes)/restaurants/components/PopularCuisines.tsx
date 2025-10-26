import { Button } from "@/components/ui/button";

export default function PopularCuisines() {
    return (
        <div className="mt-8 flex flex-wrap gap-3 justify-center">
            <Button className="px-5 py-2 bg-white/90 hover:bg-white rounded-full font-mulish text-gray-700 text-sm font-medium shadow-md transition-all">
                Vietnamese
            </Button>
            <Button className="px-5 py-2 bg-white/90 hover:bg-white rounded-full font-mulish text-gray-700 text-sm font-medium shadow-md transition-all">
                Seafood
            </Button>
            <Button className="px-5 py-2 bg-white/90 hover:bg-white rounded-full font-mulish text-gray-700 text-sm font-medium shadow-md transition-all">
                Italian
            </Button>
            <Button className="px-5 py-2 bg-white/90 hover:bg-white rounded-full font-mulish text-gray-700 text-sm font-medium shadow-md transition-all">
                Fine Dining
            </Button>
            <Button className="px-5 py-2 bg-white/90 hover:bg-white rounded-full font-mulish text-gray-700 text-sm font-medium shadow-md transition-all">
                Street Food
            </Button>
        </div>
    );
}