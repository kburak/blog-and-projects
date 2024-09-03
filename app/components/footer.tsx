import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative w-full bottom-0 min-h-36 bg-blue-700">
            <div className="absolute bottom-2 w-full">
                <Image
                    className="text-white ml-auto mr-auto mb-1"
                    src="/logo-w-xl-transparent.png"
                    alt="Logo"
                    width={25}
                    height={25}
                />
                <p className="text-base text-white text-center">©{(new Date(Date.now())).getFullYear().toString()}</p>
            </div>
        </footer>
    );
}